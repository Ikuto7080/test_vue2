<template lang="pug">
    div
        GmapMap(:center='{lat:36, lng:138}' :zoom='6' map-type-id='roadmap' style='width: 100%; height: 500px; :position: absolute; z-indent:1;')
            div(v-for="post in posts")
                gmap-custom-marker(:key='post.id' :marker='{ lat:post.google_place.latitude, lng: post.google_place.longitude}')
                    //- v-image.img(:src="post['images'][0]['url']")
                    v-image.img(src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/s720x720/153107782_855455748630232_7852732023464527727_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=110474&_nc_ohc=8nQ4ikNRWQAAX8ec15y&_nc_ht=scontent-nrt1-1.xx&tp=7&oh=eeeba2128474880c067b4a9f07d34026&oe=609D6E5D")

        h1(style="text-align:center; color:red;")
            | Who can view my posts?
        p 
            | Posts in Quouze follow the same permission as posts in Facebook. Generally, only your Facebook friends can your posts in Quouze.
        v-btn(@click="LineUrl")
            | Invite

        div.main-content
            div.name 
                | Ikuto Hongu
                div(style="text-align:center;")
                    v-img(src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/s720x720/173422718_886287262213747_206621379949858876_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=8024bb&_nc_ohc=nk2Ru52NxzQAX-EBUWW&_nc_ht=scontent-nrt1-1.xx&tp=7&oh=517020af9a607c801ff30ac005c38e89&oe=609E768E" style="width:20%; height:auto;")

        //- div.main-content
        //-     div.name 
        //-         | {{this.account}}
        //-         div(style="text-align:left;")
        //-             v-img(:src="posts[0]['images'][0]['url']" style="width:20%; height:auto;")



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
         .get('/feeds/?user_id=54')
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
.main-content {
    border: 1px solid #000000;
    margin: 30px;
    text-align: center;
}

.img{
    width: 75px;
    height: 70px;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
    display: fixed;
}

</style>