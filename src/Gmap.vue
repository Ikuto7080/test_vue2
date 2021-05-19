
<template>
  <div>
      <div class="filter-box" style="text-align">
          <v-row align="center">
              <v-col cols="12">
                  <v-sheet elevation="10">
                    <v-autocomplete
                    v-model="pickedUsers"
                    :items="followings"
                    item-text="user.first_name"
                    item-value="user.id"
                    dense 
                    outlined 
                    multiple 
                    hide-details
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          class="red"
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          <v-avatar left>
                            <v-img :src="data.item.profile_picture"></v-img>
                          </v-avatar>
                          {{ data.item.user.first_name }} {{ data.item.user.last_name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-avatar>
                            <img :src="data.item.profile_picture">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{data.item.user.first_name}} {{ data.item.user.last_name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                      <v-chip-group multiple="multiple" show-arrows="show-arrows" active-class="primary--text" v-model="selectedRestaurantIndexes">
                          <v-chip v-for="categoryItem in categoryItems" :key="categoryItem.id" :items="categoryItems">{{ categoryItem }}</v-chip>
                      </v-chip-group>

                      <v-autocomplete  :items="cityStates" item-value="city" item-text="city" v-model="pickedCities" chips label="Filter by location"  dense outlined multiple hide-details>
                        <template v-slot:selection="city">
                          <v-chip>
                            <!-- :class="{red: isActiveCity(city.item)}" -->
                            {{city.item.city }}
                          </v-chip>
                        </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{data.item.city }}, {{ data.item.state }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>

                      </v-autocomplete>
                      <v-chip
                      @click="isOpenOnly=!isOpenOnly"
                      >
                      <!-- :class="red" -->
                        isOpen
                      </v-chip>
                  </v-sheet>
              </v-col>
          </v-row>
      </div>
      <GmapMap class="gmap" :options="{zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false, disableDefaultUi: false}" :center="{lat:36, lng:138}" :zoom="6" map-type-id="roadmap" style="top:0; left:0; right:0; bottom:0; position:absolute;">
        <div v-for="post in shops" :key="post.id" >
          <gmap-custom-marker :marker="{ lat:post.google_place.latitude, lng: post.google_place.longitude}">
            <v-img class="img" @click="display(post)" :src="post['images'][0]['url']"></v-img>
          </gmap-custom-marker>
        </div>
      </GmapMap>
        <v-dialog v-if="activePost" v-model="isActive" scrollable="scrollable" @click:outside="display(null)" width="500px">
          <Shop :post="activePost" :active="isActive"/>
        </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import Shop from "./components/Shop";

export default {
    data(){
        return {
            account:null,
            isActive: false,
            pickedUsers: [],
            followings: [],
            posts:[],
            activePost:null,
            place_id:null,
            ig_presence:'instagram',
            fb_presene:'facebook',
            selectedChips:[],
            selectedActive:[],
            selectedRestaurantIndexes:[],
            loading:false,
            categories:[],
            cityStates:[],
            pickedCities:[],
            activeCities:[],
            openShops: [],
            openOnly:true,
            isOpenOnly:false
        }
    },
    computed:{
      // from categories api
      categoryItems(){
        if(!this.categories){
          return []
        }
        let categoryType = this.categories.map(restaurant => {
          return restaurant['categories']
        })
        return categoryType
      },
      selectedRestaurants(){
        let restaurants = []
        this.selectedRestaurantIndexes.forEach(index => {
          restaurants.push(this.categoryItems[index])
        })
        return restaurants
      },
      cityStateItems(){
        if(!this.cityStates){
          return []
        }
        let cityType = this.cityStates.map(cityName => {
          return cityName['city']
        })
        return cityType
      },
      shops(){
        if(this.posts.length == 0) {
          return []
        }
        if(this.isOpenOnly){
        return this.posts.filter(post => {
          if (!post.google_place.info.opening_hours){
            return false
          }
          let openTime = post.google_place.info.opening_hours.periods.map(
            start => start.open
          )
          let closeTime = post.google_place.info.opening_hours.periods.map(
            close => close.close
          )

          var now = new Date()
          var hours = now.getHours()
          var minutes = now.getMinutes()
          var moment = require('moment')
          moment.suppressDeprecationWarnings = true
          var thisWeekday = now.getDay()
          if(thisWeekday >= 1){
            thisWeekday = now.getDay() -1
          } else {
            thisWeekday = 6
          }
          let openHours = openTime[thisWeekday].time.split('').slice(0,2).join('')
          let openMinutes = openTime[thisWeekday].time.split('').slice(2).join('')
          let closeHours = closeTime[thisWeekday].time.split('').slice(0,2).join('')
          let closeMinutes = closeTime[thisWeekday].time.split('').slice(2).join('')
          let currentTime = hours + ':' + minutes
          let businessOpenTime = openHours + ':' + openMinutes
          let businessCloseTime = closeHours + ':' + closeMinutes
          let today = moment().format('YYYY-MM-DD ')
          let tommorrow = moment().add(1,'days').format('YYYY-MM-DD ')
          let isopen = Boolean
          if (openTime[thisWeekday].day === closeTime[thisWeekday].day){
           isopen = moment(today + currentTime).isBetween(
            today + businessOpenTime,
            today + businessCloseTime,
            'minute')
          } else{
           isopen = moment(today + currentTime).isBetween(
            today + businessOpenTime,
            tommorrow + businessCloseTime,
            'minute')
          }
          console.log(post.google_place.info.name, isopen)
          return isopen
        })
        }else{
          return this.posts
        }
      },
    },
    watch:{
      pickedUsers(val){
        console.log(val)
        let userId = val.join(',')
        this.$router.push({
          query: { user_ids: userId}
        })
        this.getFeed(userId)
      },
      activeCities(val){
        let states = val.join(',')
        this.$router.push({
          query:{ city_state: states}
        })
        this.getCityState(states)
      },
      pickedCities(val){
        let states = val.join(',')
        this.$router.push({
          query:{ city_state: states}
        })
        this.getCityState(states)
      },
      selectedRestaurants(val){
        let restaurants = val.join(',')
        this.$router.push({
          query:{ categories: restaurants}
        })
        this.getCategory(restaurants)
      },
      selectedRestaurantIndexes(value){
        this.$store.commit('setCategories', value)
      }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker,
        Shop
    },mounted(){
      this.$store.state.categories.forEach(category => {
        this.selectedRestaurantIndexes.push(category)
      })
      // this.selectedRestaurantIndexes = this.$store.state.categories
      axios
      .get('/accounts/')
      .then((resp)=> {
        this.account = resp.data[0]
        this.$store.commit('setAccount', this.account)
        let user_ids=this.$route.query.user_ids
        this.getFeed(user_ids)
      })
        axios
        .get('/followings/')
        .then((resp) => {
          this.followings = resp.data.results
        })
        axios
        .get('/categories/')
        .then((resp) => {
          this.categories = resp.data
        })
        axios
        .get('/citystates/')
        .then((resp) => {
          this.cityStates = resp.data
        })
    },methods:{
        userSelected(userId){
          let userIds = userId.join(',')
          this.$router.push({
            path: this.$route.path,
            query: { user_ids: userIds}
          })
          this.getFeed(userId)
        },
        getFeed(userId=null){
          if(userId){
            this.loading = true
            axios
            .get('/feeds/?user_ids=' + userId)
            .then((resp) => {
              this.posts = resp.data
              this.loading = false
            })
          }else{
            axios
            .get('/feeds/')
            .then((resp) => {
              this.posts=resp.data
            })
          }
        },
        getCategory(categoriesName=null){
          if(categoriesName){
            axios
            .get('/feeds/?categories=' + categoriesName)
            .then((resp) => {
              this.posts = resp.data
            })
          }
          else{
            axios
            .get('/feeds/')
            .then((resp) => {
              this.posts = resp.data
            })
          }
        },
        getCityState(cityStatesName=null){
          if(cityStatesName){
            axios
            .get('/feeds/?city_state=' + cityStatesName)
            .then((resp) => {
              this.posts = resp.data
            })
          }
          else{
            axios
            .get('/feeds/')
            .then((resp) => {
              this.posts = resp.data
            })
          }
        },
          display(post){
          this.activePost = post
          this.isActive = !this.isActive
        },
        goUrl(){
            document.location.href=this.activePost['permalink']
        },
        isActiveCity(item){
          return this.activeCities.filter(city => city === item).length >= 1
        },
        toggleActiveCity(item){
          let isActive = this.isActiveCity(item)
          if(isActive){
            const index = this.activeCities.indexOf(item)
            if (index >= 0)this.activeCities.splice(index, 1)
          }else{
            this.activeCities.push(item)
          }
        },
      remove (item) {
        const index = this.pickedUsers.indexOf(item.user.id)
        if (index >= 0) this.pickedUsers.splice(index, 1)
      }
    }

}
</script>

<style scoped>
.gmap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
.img{
    width: 75px;
    height: 70px;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
    display: fixed;
}

.card{
    align-items: center;
    display: flex;
    justify-content: center;
}

v-card-title{
  font-size: 100px;
}



.close{
    text-align: center;
    outline:none
}
a{
    text-decoration:none;
    background-color: white;
}
a:hover{
    color:red
}
.v-list{
  height: 300px;
  overflow-y: auto;
}

/* reviews */
.review {
  display: flex;
}

.review .img{
  height: 40px;
  width: 40px;
}

.review p {
  font-family: arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding-left: 10px;
}

.filter-box {
  z-index: 1;
  padding: 8px;
  top: 0;
  margin-top: 30px;
  left: 0;
  right: 0;
  position: absolute;
  /* max-width: 300px; */
}

</style>

