<template lang="pug">
  v-app
    v-container
      v-row
        v-col
          h1(style="text-align:center;") Profile
          div(v-if="account")
              v-text-field(readonly label="First Name" v-model="account['user']['first_name']" )
              v-text-field(readonly label="Last Name" v-model="account['user']['last_name']" )

        v-spacer

        v-col
          h3 SNS apps
          v-divider
          div(v-if="fb_presence")
            v-btn(@click="openFb") Facebook
          div(v-if="ig_presence")
            v-btn(@click="openIg") Instagram
        v-divider

        a(href=`=${process.env.VUE_APP_LINE_URL} + `)
          | Share by Line
          


      v-divider(class="mt-3")

      //- Following
      v-row(justify="center" align-content="center")
        v-col
          h2(@click="display" style="padding-top:30px;")
            | Following:
            v-list-item-subtitle
              | {{followings.count}}
              

      //-Followers
      v-row(justify="center" align-content="center")
        v-col
          h2(@click="display" style="padding-top:30px;")
            | Followers:
            v-list-item-subtitle
              | {{followers.count}}
                  

      //- v-dialog for Following
      v-dialog(v-model="isActive" scrollable max-width="80%")
        v-row.row
          v-card.mx-auto.mb-3(style="z-index:3; position:absolute" width="500px" height="500px")
            v-card-title.d-flex.fustify-center.headline.mb-2 
              | Followings 
            v-divider 
            v-list.v-list 
              v-list-item-group(v-for="result in followings.results" v-bind:key="result.id")
                    v-list-item-subtitle
                      ul
                        li 
                          | {{result.user.first_name}}

      //- v-dialog for Followers
      v-dialog(v-model="isActive" scrollable max-width="80%")
        v-row.row
          v-card.mx-auto.mb-3(style="z-index:3; position:absolute" width="500px" height="500px")
            v-card-title.d-flex.fustify-center.headline.mb-2 
              | Followers 
            v-divider 
            v-list.v-list 
              v-list-item-group(v-for="result in followers.results" v-bind:key="result.id")
                    v-list-item-subtitle
                      ul
                        li 
                          | {{result.user.first_name}}

      v-container 
        v-row 
          v-col(md="4" sm="4" v-for="post in posts" v-bind:key="post.id")
            v-img(class="mt-0" :src="post['images'][0]['url']" style="width:150px; height:150px;")
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
        account: null,
        posts: null,
        isActive:null,
        followings:null,
        followers:null,
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
            this.$store.commit('setAccount', this.account)
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
        }
      }
}
</script>
<style>


v-btn{
  text-align: center;
}
.row{
  align-items: center;
  display: flex;
  justify-content: center;
}
.v-list{
  height: 300px;
  overflow-y: auto;
}
</style>


