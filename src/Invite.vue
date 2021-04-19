<template>
    
<div>
    <GmapMap :center="{lat:36, lng:138}" :zoom="6" map-type-id="roadmap" style="width: 100%; height: 500px; :position: absolute; z-indent:1;">
        <div v-for="post in posts" :key="post.id">
            <gmap-custom-marker  :marker="{ lat:post.google_place.latitude, lng: post.google_place.longitude}">
                <v-img class="img" :src="post['images'][0]['url']"></v-img>
            </gmap-custom-marker>
        </div>
    </GmapMap>
    <h1 style="text-align:center; color:red;">Who can view my posts?</h1>
    <p> Posts in Quouze follow the same permission as posts in Facebook. Generally, only your Facebook friends can your posts in Quouze.</p>
    <v-btn @click="LineUrl" style="margin-bottom:20px;">Invite</v-btn>
    <div class="main-content">
        <h2 class="name"> {{account['user']['first_name']}}{{account['user']['last_name']}}</h2>
        <v-row>
            <v-col cls="5">
                <v-img class="picture" :src="posts[0]['images'][0]['url']"></v-img>
                <p>{{posts[0]['message']}}</p>
            </v-col>
        </v-row>
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
    },
     mounted (){
         axios
         .get('/accounts/')
         .then (resp => {
             this.account = resp.data[0]
         })
         axios
        //  .get('/feeds/?user_id=' + String(this.account['user']['id']))
         .get('/feeds/')
         .then(resp => {
             this.posts = resp.data
         })
     },
    methods:{
        LineUrl(){
            document.location.href= 'https://line.me/R/oaMessage/@552lklqg/?hi%2C%20i%20want%20to%20join%20Quouze.%20friend_id%3D'
        }
    }

}
</script>

<style>
body, html {
    text-align: center;
    color: #222222;
}

.main-content {
    border: 1px solid #000000;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    text-align: center;
}

.img{
    width: 75px;
    height: 70px;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
    display: fixed;
}

.picture{
   width: 200px;
   height: 200px; 
}

</style>