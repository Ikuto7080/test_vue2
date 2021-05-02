
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
          <Shop :post="activePost"/>
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
            // if(this.activePost.google_place.info.opening_hours){
            //   this.openings = this.activePost.google_place.info.opening_hours.weekday_text
            // }
            // if(this.activePost.google_place.info.reviews){
            //   this.reviews = this.activePost.google_place.info.reviews
            // }
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

