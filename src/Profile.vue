<template lang="pug">
v-row
  v-col(v-if="loading")
    div.text-center()
      v-progress-circular(indeterminate color="primary")
  div(v-else)
    v-row(no-gutters)
      v-col
        v-spacer
        v-col()
          span.pb-2
            v-btn(@click="shareFb")
            .fb-share-button(data-href='https://developers.facebook.com/docs/plugins/' data-layout='button' data-size='large')
              a.fb-xfbml-parse-ignore(target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse') Share
          span
            .line-it-button.pt-2(data-lang='en' data-type='share-a' data-ver='3' data-url='https://social-plugins.line.me/en/how_to_install' data-color='default' data-size='large' data-count='false' style='display: none;')

    //- .fb-share-button.mb-6(data-href='https://developers.facebook.com/docs/plugins/' data-layout='button' data-size='large')
    //-   a.fb-xfbml-parse-ignore(target='_blank' v-bind:href="'https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%3A%2F%2Fapp.quouze.com%2Finvite%2F' + account.line_user_id" x-small) 
    v-row.ma-4()
      v-col(cols="6" sm="6" v-if="account")
        v-avatar
          img(:src="'https://ui-avatars.com/api/?name=' + account.user.last_name + ' ' + account.user.first_name")
      v-col(cols="6" sm="6")
        div(v-if="account")
          v-row(no-gutters)
            v-col.subtitle-2.grey--text.lighten-4(cols="12") Name
            v-col(cols="12") {{account['user']['last_name']}} {{account['user']['first_name']}}
        div.pa-5
              .fb-share-button.mb-6(data-href='https://developers.facebook.com/docs/plugins/' data-layout='button' data-size='large')
                a.fb-xfbml-parse-ignore(target='_blank' v-bind:href="'https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%3A%2F%2Fapp.quouze.com%2Finvite%2F' + account.line_user_id" x-small) Share by Facebook
              v-btn(v-bind:href="'https://social-plugins.line.me/lineit/share?url=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%3A%2F%2Fapp.quouze.com%2Finvite%2F' + account.line_user_id" x-small) Share by Line
      v-col(cols="12" sm="12")
        div.pa-0
          h3 SNS apps
          div(v-if="fb_presence")
            v-btn(x-small @click="openFb") Facebook
          div(v-if="ig_presence")
            v-btn(x-small @click="openIg") Instagram

    v-divider

    v-row.py-3
      //-  Posts
      v-col
        div.font-weight-thin
          | Posts
        div(v-if="posts")
          |{{posts.length}}
        div(v-else)
          | -

      //- Following
      v-col
       div.font-weight-thin(@click="display")
         | Following:
       div(v-if="followings.count")
         | {{followings.length}}
       div(v-else)
          | -

      //-Followers
      v-col
        div.font-weight-thin(@click="display" v-if="!loading")
          | Followers:
        div(v-if="followers.count")
          | {{followers.length}}
        div(v-else)
          | -



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

    v-row
      v-col.pa-0(cols="4" sm="4" md="2" lg="2" v-for="post in posts" v-bind:key="post.id")
        img(class="image" :src="post['images'][0]['url']" height="123px" width="123px")
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

/* .v-list{
  height: 300px;
  overflow-y: auto;
} */
</style>


