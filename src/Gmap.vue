<template>
  <div>
      <div class="filter-box" style="text-align">
          <v-row align="center">
              <v-col cols="12">
                  <v-sheet elevation="10">
                    <!-- following filter -->
                    <v-autocomplete
                      v-model="pickedUsers"
                      :items="followingItems"
                      placeholder="Select Following"
                      label="following"
                      :menu-props="{closeOnContentClick:true}"
                      item-text="text"
                      item-value="value"
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
                          @click:close="userRemove(data.item.value)"
                        >
                          <v-avatar left>
                            <v-img :src="data.item.text.profile_picture"></v-img>
                          </v-avatar>
                          {{ data.item.text.first_name }} {{ data.item.text.last_name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item.text"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-avatar>
                            <img :src="data.item.text.profile_picture" />
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>
                              {{ data.item.text.first_name }}
                              {{ data.item.text.last_name }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>

                      <!-- category filter -->
                      <v-chip-group multiple="multiple" show-arrows="show-arrows" active-class="primary--text" v-model="selectedRestaurantIndexes">
                          <v-chip v-for="categoryItem in categoryItems" :key="categoryItem.id" :items="categoryItems">{{ categoryItem }}</v-chip>
                      </v-chip-group>
                      <!-- city filter -->
                      <v-autocomplete
                      v-model="pickedCities"
                      :items="cityStates"
                      item-text="city"
                      item-value="city"
                      label="place"
                      placeholder="Select Place"
                      chips
                      dense
                      outlined
                      multiple
                      hide-details
                      :menu-props="{closeOnContentClick:true}"
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            class="red"
                            close
                            @click="data.select"
                            @click:close="Cityremove(data.item)"
                          >
                            {{ data.item.city }}
                          </v-chip>
                        </template>
                        <template v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-content>
                              <v-list-item-title v-html="data.item.city"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                      <v-chip
                      @click="isOpenClicked"
                      :class="{red:isOpenOnly}"
                      >
                      <!-- :class="red" -->
                        isOpen
                      </v-chip>
                  </v-sheet>
              </v-col>
          </v-row>
      </div>
      <GmapMap class="gmap" :options="{zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false, disableDefaultUi: false,  gestureHandling: 'greedy'}" :center="{lat:36, lng:138}" :zoom="6" map-type-id="roadmap" style="top:0; left:0; right:0; bottom:0; position:absolute;">
        <div v-for="post in shops" :key="post.id" >
          <gmap-custom-marker :marker="{ lat:post.google_place.latitude, lng: post.google_place.longitude}">
            <v-img class="img" @click="display(post)" :src="post['images'][0]['url']"></v-img>
          </gmap-custom-marker>
        </div>
      </GmapMap>
        <v-dialog v-if="activePost" v-model="isActive" scrollable="scrollable" @click:outside="display(null)" width="500px">
          <Shop :post="activePost" :active="isActive" @close="isActive=false"/>
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
            isOpenOnly:false
        }
    },
    computed:{
      followingItems(){
        if(!this.account){
          return []
        }
        let ownItem = {text: this.account.user, value: this.account.user.id}
        let followings = this.followings.map(profile => {
          return {text: profile.user, value: profile.user.id}
        })
        return [ownItem, ...followings]
      },      // from categories api
      categoryItems(){
        if(!this.categories){
          return []
        }
        let categoryType = this.categories.map(restaurant => {
          return restaurant['categories']
        })
        return categoryType
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
          // this shop is open 24hours
          if(!closeTime[thisWeekday]){
            return true
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
          this.$store.state.isOpenFilter

          return isopen
        })
        }else{
          return this.posts
        }
      },

      gmapFilter(){
      return  this.$store.state.gmapFilter
    },
    },
    watch:{
      pickedUsers(val){
        let userId = val.join(',')
        let gmapFilter = {...this.gmapFilter}
        gmapFilter.user_ids= userId
        if(!gmapFilter.user_ids){
          this.posts = {}
          return false
        }
        console.log(gmapFilter.user_ids)
        this.$store.commit('setGmapFilter', gmapFilter)
        axios
        .get('/categories/?user_ids=' + userId)
        .then(resp => {
          this.categories = resp.data
        })
        axios
        .get('/citystates/?user_ids=' + userId)
        .then(resp => {
          this.cityStates = resp.data
        })
        this.getFeed()
      },
      activeCities(val){
        let states = val.join(',')
        let gmapFilter = {...this.gmapFilter}
        gmapFilter.city_state= states
        this.$store.commit('setGmapFilter', gmapFilter)
        this.getFeed()
      },
      pickedCities(val){
        let states = val.join(',')
        let gmapFilter = {...this.gmapFilter}
        gmapFilter.city_state= states
        this.$store.commit('setGmapFilter', gmapFilter)
        axios
        .get('/categories/?city_states=' + states)
        .then(resp => {
          this.categories = resp.data
        })
        this.getFeed()
      },
      selectedRestaurantIndexes(value){
        let gmapFilter = {...this.gmapFilter}
        gmapFilter.categories= value.map(i => this.categoryItems[i]).join(',')
        this.$store.commit('setGmapFilter', gmapFilter)
        axios
        .get('/citystates/?categories=' + gmapFilter.categories)
        .then(resp => {
          this.cityStates = resp.data
        })
        this.getFeed()
      }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker,
        Shop
    },mounted(){
      this.isOpenOnly = this.$store.state.isOpenFilter

      this.$store.state.categories.forEach(category => {
        this.selectedRestaurantIndexes.push(category)
      })
      axios
      .get('/accounts/')
      .then((resp)=> {
        this.account = resp.data[0]
        this.$store.commit('setAccount', this.account)
      })
        axios
        .get('/followings/')
        .then((resp) => {
          this.followings = resp.data.results
          if(this.gmapFilter.user_ids) {
            this.gmapFilter.user_ids.split(',').forEach(userId => {
                this.pickedUsers.push(parseInt(userId))
            })
          }
        })
        axios
        .get('/categories/')
        .then((resp) => {
          this.categories = resp.data
          if(this.gmapFilter.categories) {
            this.gmapFilter.categories.split(',').forEach(category => {
              const index = this.categories.findIndex(item => item.categories === category)
              console.log('categoryIndex: ', index)
              if (index >= 0) {
                this.selectedRestaurantIndexes.push(index)
              }
            })
          }
        })
        axios
        .get('/citystates/')
        .then((resp) => {
          this.cityStates = resp.data
          // this.pickedCities.push(3)
          console.log('Filter city: ', this.gmapFilter.city_state)
          if(this.gmapFilter.city_state) {
            this.gmapFilter.city_state.split(',').forEach(cityState => {
                this.pickedCities.push(cityState)
            })
          }
        })
    },
    methods:{
        getFeed(){
            this.loading = true
            axios
            .get('/feeds/', {params:this.gmapFilter})
            .then((resp) => {
              this.loading = false
              this.posts=resp.data
            })
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
      userRemove (item) {
        const index = this.pickedUsers.indexOf(item);
        if (index >= 0) this.pickedUsers.splice(index, 1);
      },
      Cityremove(item) {
        const index = this.pickedCities.indexOf(item.city)
        if ( index >= 0) this.pickedCities.splice(index, 1)
      },
      isOpenClicked() {
        this.isOpenOnly=!this.isOpenOnly
        this.$store.commit('setOpenFilter', this.isOpenOnly)
        
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
}
</style>

© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete