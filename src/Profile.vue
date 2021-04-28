<template lang="pug">
  <v-row>
      <v-col v-if="loading">
          <div class="text-center">
              <v-progress-circular indeterminate="indeterminate" color="primary"></v-progress-circular>
          </div>
      </v-col>
      <div v-else="v-else">
          <v-row class="ma-4">
              <v-col cols="6" sm="6" v-if="account">
                  <v-avatar size="100"><img :src="account.profile_picture"></v-avatar>
              </v-col>
              <v-col cols="6" sm="6">
                  <div v-if="account">
                      <v-row no-gutters="no-gutters">
                          <v-col class="subtitle-2 grey--text lighten-4" cols="12">Name</v-col>
                          <v-col cols="12">{{account['user']['last_name']}} {{account['user']['first_name']}}</v-col>
                      </v-row>
                  </div>

              </v-col>
              <v-col cols="12" sm="12">
                  <div class="pa-0">
                      <v-row>
                        <v-col>
                            //-connect to facebook / v-if="fb_presence"
                            <div class="cmn-sns" @click="openFb">
                                <i class="fab fa-facebook-f pt-1"></i>
                                <p class="subtitle-2">connect Fcebook</p>
                            </div>
                        </v-col>
                        <v-col>
                            //-connect to instagram / v-if="ig_presence"
                            <div class="cmn-sns" @click="openIg">
                                <i class="fab fa-instagram pt-1"></i>
                                <p class="subtitle-2">connect Instagram</p>
                            </div>
                        </v-col>
                      </v-row>
                      <div v-if="fb_presence">
                          <v-btn x-small="x-small" @click="openFb">Facebook</v-btn>
                      </div>
                      <div v-if="ig_presence">
                          <v-btn x-small="x-small" @click="openIg">Instagram</v-btn>
                      </div>
                  </div>
              </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="py-3">
              <v-col>
                  <div class="font-weight-thin">Posts</div>
                  <div v-if="posts">{{posts.length}}</div>
                  <div v-else="v-else">-</div>
              </v-col>
              <v-col>
                  <div class="font-weight-thin" @click="display">Following:</div>
                  <div v-if="followings.count">{{followings.length}}</div>
                  <div v-else="v-else">-</div>
              </v-col>
              <v-col>
                  <div class="font-weight-thin" @click="display" v-if="!loading">Followers:</div>
                  <div v-if="followers.count">{{followers.length}}</div>
                  <div v-else="v-else">-</div>
              </v-col>
          </v-row>
          <v-dialog v-model="isActive" scrollable="scrollable" max-width="80%">
              <v-row class="row">
                  <v-card class="mx-auto mb-3" style="z-index:3; position:absolute" width="500px" height="500px">
                      <v-card-title class="d-flex fustify-center headline mb-2"> Followings </v-card-title>
                      <v-divider> </v-divider>
                      <v-list class="v-list">
                          <v-list-item-group v-for="result in followings.results" v-bind:key="result.id">
                              <v-list-item-subtitle>
                                  <ul>
                                      <li> {{result.user.first_name}}</li>
                                  </ul>
                              </v-list-item-subtitle>
                          </v-list-item-group>
                      </v-list>
                  </v-card>
              </v-row>
          </v-dialog>
          <v-dialog v-model="isActive" scrollable="scrollable" max-width="80%">
              <v-row class="row">
                  <v-card class="mx-auto mb-3" style="z-index:3; position:absolute" width="500px" height="500px">
                      <v-card-title class="d-flex fustify-center headline mb-2"> Followers </v-card-title>
                      <v-divider> </v-divider>
                      <v-list class="v-list">
                          <v-list-item-group v-for="result in followers.results" v-bind:key="result.id">
                              <v-list-item-subtitle>
                                  <ul>
                                      <li> {{result.user.first_name}}</li>
                                  </ul>
                              </v-list-item-subtitle>
                          </v-list-item-group>
                      </v-list>
                  </v-card>
              </v-row>
          </v-dialog>
          <v-row>
              <v-col class="pa-0" cols="4" sm="4" md="2" lg="2" v-for="post in posts" v-bind:key="post.id"><img class="image" :src="post['images'][0]['url']" height="123px" width="123px" /></v-col>
          </v-row>
      </div>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
          loading:true,
          account: null,
          posts: null,
          isActive:null,
          followings:{},
          followers:{},
          ig_presence: false,
          fb_presence: false,
          followerngs:null,
          edit: false,
          value:null,
        }
    },
     mounted (){
        axios
        .get('/accounts/')
        .then(resp => {
          this.account = resp.data[0]
          console.log(this.account)
            this.$store.commit('setAccount', this.account)
            this.loading = false
            console.log(this.$store.state.account)
            let igposts = this.account['ig_id']
            let fbposts = this.account['fb_id']
            axios
            .get('/posts/')
            .then((resp) => {
              this.posts = resp.data
            })
            axios
            .get('/followers/')
            .then((resp) => {
              this.followers = resp.data
            })
            axios
            .get('/followings/count/')
            .then((resp) => {
              this.followings=resp.data
              console.log(resp.data)
            })
            if(!igposts){
              this.ig_presence = true
            }
            if(!fbposts){
              this.fb_presence = true
            }
            })
     },
     methods: {
         openFb(){
           const lineUserId = this.$store.state.account.line_user_id  
             document.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=${process.env.VUE_APP_FB_REDIRECT_URL}&state=${lineUserId}`
        },
        openIg(){
            const lineUserId = this.$store.state.account.line_user_id
            document.location.href = `https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=${process.env.VUE_APP_IG_REDIRECT_URL}&scope=user_profile%2Cuser_media&response_type=code&state=${lineUserId}`

        },
        display(){
          this.isActive =!this.isActive
        },
        shareFb(){
          document.location.href="https://www.facebook.com/sharer/sharer.php?u=https://app.quouze.com/invite/" + String(this.account.line_user_id) + '?user_ids=' 
        }
      }
}
</script>
<style scoped>
li {
    list-style: none;
}

.cmn-sns {
    display: flex;
    cursor: pointer;
}

.cmn-sns i{
    padding-right: 10px;
}
</style>



