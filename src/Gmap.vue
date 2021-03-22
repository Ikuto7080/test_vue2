<template lang="pug">
div 
  h1(style="text-align") Google Map 
  GmapMap(:center='{lat:36, lng:138}' :zoom='6' map-type-id='roadmap' style='width: 100%; height: 750px; :position: absolute; z-indent:1;')
    gmap-custom-marker(v-for='post in posts' :key='post.id' :marker='{ lat:post.google_place.latitude, lng: post.google_place.longitude}')
      v-img.img(@click='display(post)' :src="post['images'][0]['url']" )
      h1(v-for='post in posts' :key='post.id')
        
    
    v-dialog(v-model='isActive' scrollable max-width='80%' @click:outside='display(null)')
      v-row.card(justify="center")
        v-card.mx-auto.mb-3(style='z-index:3; position:absolute;' width='500px' height='500px' v-if='activePost')
          v-card-title
              | {{ activePost.google_place.info.name }}
          div(@click='goUrl')
            v-img(height='250px' :src='activePost.images[0].url')
          v-list.v-list
            v-list-item-group
              v-list-item
                v-list-item-content
                  v-list-item-title
                    h1 message
              v-divider
              v-list-item
                v-list-item-content
                  v-list-item-title
                    | rating
                  v-list-item-subtitle 
                    v-rating(color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments length="5" :value="activePost.google_place.info.rating")
              v-divider
              v-list-item
                  v-list-item-content
                    v-list-item-title
                        | price
                    v-list-item-subtitle 
                        
              v-divider
              v-list-item
                v-list-item-content
                  v-list-item-title
                    | Opening Hours
                  v-list-item-subtitle
                    ul(v-for='opening in openings' :key='opening')
                      li {{ opening }}
              v-list-item
                v-list-item-content
                  v-list-item-title
                    | Regular holiday
                  v-list-item-subtitle 
                    |None 
              v-list-item
                v-list-item-content 
                  v-list-item-title
                    | Phone
                  v-list-item-subtitle 
                    | + {{ activePost.google_place.info['formatted_phone_number'] }}
              v-divider
              v-list-item
                v-list-item-content
                  v-list-item-title
                    | HP URL
                  v-list-item-subtitle
                    a(:href="activePost.google_place.info['website']")
                        | {{ activePost.google_place.info['website'] }}
              v-list-item
                v-list-item-content 
                  v-list-item-title
                    | Instagram URL
                  v-list-item-subtitle
                    a(:href="activePost.permalink")
                        | {{ activePost.permalink }}
       
</template>

<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
    data(){
        return {
            isActive: false,
            posts:null,
            activePost:null,
            place_id:null,
            restaurant:null,
            openings:null,
            ig_presence:'instagram',
            fb_presene:'facebook'
    
        }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker
    },mounted(){
        axios
        .get('/posts/')
        .then((resp) => {
            this.posts = resp.data
            console.log(this.posts)
        //     for (let i = 0; i < this.posts.length; i++){
        //     axios
        //     .get('/restaurants/?id=' + String(this.posts[i]['google_place']))
        //     .then((resp) => {
        //       this.restaurant = resp.data
        //     console.log(this.restaurant[0]['latitude'])
        // })
        //     }

        })
    },methods:{
        display(post){
            this.activePost = post
            console.log(this.activePost)
            this.openings = this.activePost.google_place.info.opening_hours.weekday_text
            console.log(this.openings)
            this.isActive = !this.isActive
           
        },
        goUrl(){
            document.location.href=this.activePost['permalink']
        }
    }

}
</script>

<style>
.map-container{
    width: 500;
    height: 300px;
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



.overlay{

  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: fixed;
  align-items: center;
  justify-content: center;
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
</style>