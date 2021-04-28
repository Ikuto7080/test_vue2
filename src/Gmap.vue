<template>
  <div>
      <div class="filter-box" style="text-align">
          <v-row align="center">
              <v-col cols="12">
                  <v-sheet elevation="10">
                      <v-autocomplete :items="followingsItems" item-text="text" v-model="pickedUsers" chips="chips" label="Filter by friends" dense="dense" outlined="outlined" multiple="multiple" hide-details="hide-details"><template v-slot:selection="user">
                              <v-chip :class="{red: isActiveUser(user.item)}" @click="toggleActiveUser(user.item)" @click:close="remove(user.item)" close="close">{{user.item.text }}</v-chip>
                          </template></v-autocomplete>
                      <v-chip-group multiple="multiple" show-arrows="show-arrows" active-class="primary--text" v-model="selectedRestaurantIndexes">
                          <v-chip v-for="categoryItem in categoryItems" :key="categoryItem.id" :items="categoryItems">{{ categoryItem }}</v-chip>
                      </v-chip-group>
                  </v-sheet>
              </v-col>
          </v-row>
      </div>
      <GmapMap class="gmap" :options="{zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false, rotateControl: false, fullscreenControl: false, disableDefaultUi: false}" :center="{lat:36, lng:138}" :zoom="6" map-type-id="roadmap" style="top:0; left:0; right:0; bottom:0; position:absolute;">
          <div v-for="post in posts" :key="post.id" >
              <gmap-custom-marker :marker="{ lat:post.google_place.latitude, lng: post.google_place.longitude}">
                  <v-img class="img" @click="display(post)" :src="post['images'][0]['url']"></v-img>
              </gmap-custom-marker>
          </div>
      </GmapMap>
      <v-dialog v-if="activePost" v-model="isActive" scrollable="scrollable" @click:outside="display(null)" width="500px">
          <v-row class="card" justify="center">
              <v-card class="mx-auto mb-3" style="z-index:100; " v-if="activePost">
                  <v-card-title>{{ activePost.google_place.info.name }}</v-card-title>
                  <!-- <div @click="goUrl">
                      <v-img height="300" :src="activePost.images[0].url"></v-img>
                  </div> -->
                  <v-list class="v-list">
                      <v-list-item-group>
                          <v-list-item>
                            <v-img height="400" :src="activePost.images[0].url"></v-img>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>SNS commets</v-list-item-title>
                                  <v-list-item-subtitle>
                                      <div if="activePost.message">{{activePost.message}}</div>
                                  </v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                              <v-list-item-content>
                                  <div class="rating-content">
                                      <div class="rating-item">
                                          <v-list-item-title>rating</v-list-item-title>
                                          <v-list-item-subtitle>
                                              <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments="half-increments" length="5" :value="activePost.google_place.info.rating"></v-rating>
                                          </v-list-item-subtitle>
                                      </div>
                                      <div class="review" v-for="review in reviews" :key="review.profile_photo_url">
                                          <v-img class="img" :src="review.profile_photo_url"></v-img>
                                          <p>{{review.text}}</p>
                                      </div>
                                  </div>
                              </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>price</v-list-item-title>
                                  <v-list-item-subtitle></v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>Opening Hours</v-list-item-title>
                                  <v-list-item-subtitle>
                                      <ul v-for="opening in openings" :key="opening">
                                          <li>{{ opening }}</li>
                                      </ul>
                                  </v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>Regular holiday</v-list-item-title>
                                  <v-list-item-subtitle>None</v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>Phone</v-list-item-title>
                                  <v-list-item-subtitle>+ {{ activePost.google_place.info['formatted_phone_number'] }}</v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>HP URL</v-list-item-title>
                                  <v-list-item-subtitle><a :href="activePost.google_place.info['website']">{{ activePost.google_place.info['website'] }}</a></v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                              <v-list-item-content>
                                  <v-list-item-title>Instagram URL</v-list-item-title>
                                  <v-list-item-subtitle><a :href="activePost.permalink">{{ activePost.permalink }}</a></v-list-item-subtitle>
                              </v-list-item-content>
                          </v-list-item>
                      </v-list-item-group>
                  </v-list>
              </v-card>
          </v-row>
      </v-dialog>
  </div>
</template>


<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'

// import { use } from 'vue/types/umd'
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
            userItems: [],
            pickedUsers: [],
            activeUsers: []
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
        console.log(this.followings)
        console.log([ownItem, ...followings])
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
        console.log(this.selectedRestaurantIndexes)
        this.selectedRestaurantIndexes.forEach(index => {
          restaurants.push(this.categoryItems[index])
        })
        return restaurants
      }
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
      selectedRestaurants(val){
        console.log(val)
        let restaurants = val.join(',')
        console.log(restaurants)
        this.$router.push({
          query:{ categories: restaurants}
        })
        this.getCategory(restaurants)
      }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker,
    },mounted(){
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
          console.log(resp.data)
          this.categories = resp.data
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
              console.log('test')
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
            display(post){
            this.activePost = post
            if(this.activePost.google_place.info.opening_hours){
              this.openings = this.activePost.google_place.info.opening_hours.weekday_text
            }
            if(this.activePost.google_place.info.reviews){
              this.reviews = this.activePost.google_place.info.reviews
            }
            this.isActive = !this.isActive
        },
        goUrl(){
            document.location.href=this.activePost['permalink']
        },
        remove(item) {
          console.log(item)
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
          if(isActive){
            // 指定した文字が存在するかを検索(indexOf)
            const index = this.activeUsers.indexOf(item)
            if (index >= 0)this.activeUsers.splice(index, 1)
          }else{
            this.activeUsers.push(item)
          }
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
.v-list {
  height: 600px;
  overflow-y: auto;
  }
</style>