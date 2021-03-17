<template lang="pug">
  v-app
    v-container
      v-row
        v-col
          h1(style="text-align:center;") Profile
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

      v-divider(class="mt-3")

      v-layout(row)
        v-flex(xs6 md6 class="pl-4")
          div(v-if="fb_urls")
            div(v-for="fb_url in fb_urls" v-bind:key="fb_url.id")
                v-img(class="mt-6" :src="fb_url['post_url']" style="width:40%; height:10%; ")
          div(v-if="ig_urls")
            v-col(v-for="ig_url in ig_urls" v-bind:key="ig_url.id")
                v-img(:src="ig_url['media_url']")


                
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
        account: null,
        fb_urls: null,
        ig_urls: null,
        ig_presence: false,
        fb_presence: false,
        edit: false
        }
    },
     mounted (){
        axios
        .get('/accounts/')
        .then(resp => {
          this.account = resp.data[0]
            this.$store.commit('setAccount', this.account)
            console.log(this.$store.state.account.id)
            let igposts = this.account['ig_id']
            // console.log(this.account)
            let fbposts = this.account['fb_id']
            // console.log(fbposts)
            if(igposts){
                axios
                .get('/igposts/')
                .then((resp) => {
                this.ig_urls = resp.data
            })
            }
            if(fbposts){
                axios
                .get('/fbposts/')
                .then((resp) => {
                    this.fb_urls = resp.data
                    
                    // console.log(this.fb_urls[0])
            })
            }
            if(!igposts){
              this.ig_presence = true
            }
            if(!fbposts){
              this.fb_presence = true
            }
            })
     },
     methods: {
         updateProfile(){
             axios
             .patch('/users/' + this.account.user.id + '/',{
                 first_name: this.account['user']['first_name'],
                 last_name: this.account['user']['last_name']
             }

             )
             .then(resp => {
                 console.log(resp.data)
                 this.account.user = resp.data
                 this.$store.commit('setAccount', this.account)
             })
         },
         openFb(){
           const lineUserId = this.$store.state.account.line_user_id  
             document.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=${process.env.VUE_APP_FB_REDIRECT_URL}&state=${lineUserId}`
        },
        openIg(){
            const lineUserId = this.$store.state.account.line_user_id
            document.location.href = `https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=${process.env.VUE_APP_IG_REDIRECT_URL}&scope=user_profile%2Cuser_media&response_type=code&state=${lineUserId}`
        }
      }
}
</script>
<style>

v-btn{
  text-align: center;
}
</style>

