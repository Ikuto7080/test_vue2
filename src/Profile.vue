<template lang="pug">
  v-app
    v-container
      v-row
        v-col(cols="12" sm="6" offset-sm="3")
          h1(style="text-align:center;") Profile
              v-text-field(label="First Name" v-model="account['user']['first_name']" )
              v-text-field(label="Last Name" v-model="account['user']['last_name']" )
              v-btn(@click="updateProfile" depressed) Update
                v-icon mdi-pencil

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
        fb_urls: undefined,
        ig_urls: undefined,
        edit: false
        }
    },
     mounted (){
        axios
        .get('/accounts/')
        .then(resp => {
            this.$store.commit('setAccount', resp.data[0])
            this.account = resp.data[0]
            let igposts = this.account['ig_id']
            // console.log(this.account)
            let fbposts = this.account['fb_id']
            // console.log(fbposts)
            if(igposts){
                axios
                .get('/igposts/')
                .then((resp) => {
                    console.log(resp.data)
                this.ig_urls = resp.data
                console.log(resp.data)
                // console.log(this.ig_urls[0])
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
         }
     }
}
</script>
<style>

v-btn{
  text-align: center;
}
</style>

