<template>
<div>
    <GmapMap :center="{lat:36, lng:138}" :zoom="6" map-type-id="roadmap" style="width: 100%; height: 500px; :position: absolute; z-indent:1;">
        <div v-for="post in posts" :key="post.id">
            <gmap-custom-marker  :marker="{ lat:post.google_place.latitude, lng: post.google_place.longitude}">
                <v-img class="img" :src="post['images'][0]['url']"></v-img>
            </gmap-custom-marker>
        </div>
    </GmapMap>
    <h1 style="text-align:center; color:pink;">Who can view my posts?</h1>
    <p> Posts in Quouze follow the same permission as posts in Facebook. Generally, only your Facebook friends can your posts in Quouze.</p>
    <v-btn @click="LoginUrl" style="margin-bottom:20px;">Share my posts with {{fullName}}</v-btn>
    <div class="main-content">
        <div class="name"> {{fullName}}
            <div>
                <v-row>
                  <v-col cols="5">
                    <v-img class="picture" :src="posts[0]['images'][0]['url']"></v-img>
                  </v-col>
                </v-row>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'
import axios from 'axios'
export default {
    data(){
        return {
            posts:[],
            account:[]
        }
    },components: {
        'gmap-custom-marker':GmapCustomMarker
    },computed:{
        fullName(){
            if(!this.account){
                return ''
            }
            if(!this.account['user']['first_name']){
                return ''
            }
            return this.account['user']['first_name'] + this.account['user']['last_name']
        }
    },
     mounted (){
         let account_id = this.$route.params.id
         axios
         .get('/accounts/' + account_id + '/')
         .then (resp => {
             this.account = resp.data
             console.log(this.account)
         })
         axios
         .get('/feeds/')
         .then(resp => {
             this.posts = resp.data
         })
     },
    methods:{
        LoginUrl(){
            const friendId = this.$route.params.id
            document.location.href= '/login/?inviter_id=' + friendId
        }
    }

}
</script>

<style scoped>

.main-content {
    border: 1px solid #000000;
    margin: 0 auto;
    height: 300px;
    width: 500px;
}

.img{
    width: 60px;
    height: 60px;
    border: 4px solid #FFFFFF;
    /* border-radius: 50%; */
}

.picture{
   width: 200px;
   height: 200px; 
}

</style>