
<template>
  <div>
      <div class="filter-box" style="text-align">
          <v-row align="center">
              <v-col cols="12">
                  <v-sheet elevation="10">
                      <v-autocomplete :items="followingsItems" item-text="text" v-model="pickedUsers" chips label="Filter by friends" dense outlined multiple hide-details>
                        <template v-slot:selection="user">
                              <v-chip :class="{red: isActiveUser(user.item)}" @click="toggleActiveUser(user.item)" @click:close="removeSelectedUser(user.item)" close>
                                <v-avatar left>
                                  <!-- <v-img :src="account.profile_picture"></v-img> -->
                                </v-avatar>
                                {{ user.item.text }}
                              </v-chip>
                          </template>
                      </v-autocomplete>
                      <v-chip-group multiple="multiple" show-arrows="show-arrows" active-class="primary--text" v-model="selectedRestaurantIndexes">
                          <v-chip v-for="categoryItem in categoryItems" :key="categoryItem.id" :items="categoryItems">{{ categoryItem }}</v-chip>
                      </v-chip-group>

                      <v-autocomplete  :items="cityStateItems" item-text="text" v-model="pickedCities" chips label="Filter by location"  dense outlined multiple hide-details>
                        <template v-slot:selection="city">
                          <v-chip :class="{red: isActiveCity(city.item)}" @click="toggleActiveCity(city.item)">
                            {{city.item}}
                          </v-chip>
                        </template>
                      </v-autocomplete>
                      <v-chip
                      @click="isOpen"
                      >
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
            posts:[],
            activePost:null,
            place_id:null,
            openings:null,
            reviews:null,
            ig_presence:'instagram',
            fb_presene:'facebook',
            followings:[],
            selectedUserId:null,
            selectedUserIndexes:[],
            selectedChips:[],
            selectedActive:[],
            selectedRestaurantIndexes:[],
            loading:false,
            categories:[],
            cityStates:[],
            pickedCities:[],
            userItems: [],
            pickedUsers: [],
            activeUsers: [],
            activeCities:[],
            openOnly:true,
        }
    },
    computed:{
      followingsItems(){
        if(!this.account){
          return []
        }
        let ownItem = {text : this.account.user.first_name, value: this.account.user.id}
        let followings = this.followings.map(profile=>{
          return {text: profile.user.first_name, value: profile.user.id}
        })
        return [ownItem, ...followings]
      },
      selectedUsers(){
        let userIds = []
        this.selectedUserIndexes.forEach(index => {
          userIds.push(this.followingsItems[index])
        })
        return userIds
      },
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
          return cityName['city_state']
        })
        return cityType
      },
      shops(){
        if(this.posts.length == 0) {
          return []
        }
        return this.posts
      },
    },
    watch:{
      activeUsers(val){
          let userIds = val.map(
            user=>user.value
          )
          userIds = userIds.join(',')
          this.$router.push({
            path: this.$route.path,
            query: { user_ids: userIds}
          })
          this.getFeed(userIds)
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
        console.log(this.isActiveCity(val))
        // this.getCityState(states)
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
        removeSelectedUser(item) {
          const index = this.pickedUsers.indexOf(item.value)
          if (index >= 0)this.pickedUsers.splice(index, 1)
        },
        isActiveUser(item){
          // もし結果が１つ以上あればisActiveに想定する
          //  条件に合う要素だけを取り出す(filter)
          return this.activeUsers.filter(user => user.value === item.value).length >= 1
        },
        toggleActiveUser(item){
          let isActive = this.isActiveUser(item)
          console.log(isActive)
          if(isActive){
            // 指定した文字が存在するかを検索(indexOf)
            const index = this.activeUsers.indexOf(item)
            if (index >= 0)this.activeUsers.splice(index, 1)
          }else{
            this.activeUsers.push(item)
          }
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
        isOpen(){
        return this.posts.filter(post => {
          if (!post.google_place.info.opening_hours){
            return []
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
          let today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' '
          // let year = moment(new Date).format('YYYY-MM-DD HH:mm')
          // console.log(today + currentTime)
          // console.log(today + businessOpenTime)
          // console.log(today + businessCloseTime)
          let isopen = moment(today + currentTime).isBetween(today + businessOpenTime, today + businessCloseTime, 'minute')
          if(isopen){
            console.log(post)
            this.shops = post
            return this.shops
          }else{
            console.log('else')
            return []
          }
        })
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

