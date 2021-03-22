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

      v-divider(class="mt-3")

      v-layout(row)
        v-flex(xs6 md6 class="pl-4")
          div(v-if="posts")
            div(v-for="post in posts" v-bind:key="post.id")
                v-img(class="mt-6" :src="post['images'][0]['url']" style="width:40%; height:10%; ")

                
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
        account: null,
        posts: null,
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
            let fbposts = this.account['fb_id']
            axios
            .get('/posts/')
            .then((resp) => {
              this.posts = resp.data
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
                                                                                      
        }
      }
}
</script>
<style>

v-btn{
  text-align: center;
}
</style>


