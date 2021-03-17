<template>
    <div>
    <h1 style="text-align:">Google Map</h1>
    <GmapMap
    :center="{lat:36, lng:138}"
    :zoom="6"
    map-type-id="roadmap"
    style="width: 100%; height: 750px;"
    >
        <gmap-custom-marker 
        v-for="ig_post in ig_posts" :key="ig_post.id"
        :marker="{ lat: ig_post.latitude, lng: ig_post.longitude}">
            <v-img 
            @click="ig_display(ig_post)"
            :src="ig_post.media_url"
            class="img"
            >
            </v-img>
        </gmap-custom-marker>

        <gmap-custom-marker
        v-for="fb_post in fb_posts" :key="fb_post.id"
        :marker="{ lat: fb_post.latitude, lng: fb_post.longitude}">
            <v-img
            :src="fb_post.post_url" 
            @click="fb_display(fb_post)"
            class="img"
            >
            </v-img>
        </gmap-custom-marker>
    </GmapMap>
        <v-dialog v-model="isActive" max-width="80%" @click:outside="ig_display(null)">
            <v-row class="card">
                <v-card
                class="mx-auto mb-3"
                style="z-index:3; position:absolute;"
                max-width="80%"
                @click="goIgUrl"
                v-if="ig_activePost"
                >
                    <v-list-item-title style="text-align:center;" @click="ig_display(null)">✖️ close</v-list-item-title>
                    <v-divider></v-divider>
                    <v-card-title>
                        {{ ig_activePost['location_name'] }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Phone
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    + {{ ig_activePost.google_info['formatted_phone_number'] }} 
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Address
                                </v-list-item-title>
                                <v-list-item-subtitle><br>
                                    {{ ig_activePost.google_info['formatted_address'] }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Opening Hours
                                </v-list-item-title>
                                <v-list-item-subtitle><br>
                                    <ul v-for="opening in openings" :key="opening.id">
                                        <li>{{ opening }}</li> 
                                    </ul>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-title>
                        <h1 style="text-align:center;">Instagram Posts</h1> 
                    </v-card-title>
                    <v-img
                    height="250"
                    :src="ig_activePost.media_url">
                    </v-img>
                </v-card>
            </v-row>
        </v-dialog>
        <v-dialog v-model="isActive" scrollable max-width="80%" @click:outside="fb_display(null)">
            <v-row class="card">
                <v-card
                class="mx-auto mb-3"
                style="z-index:3; position:absolute;"
                max-width="80%"
                @click="goFbUrl"
                v-if="fb_activePost"
                >
                    <v-list-item-title style="text-align:center;" @click="fb_display(null)">✖️ close</v-list-item-title>
                    <v-divider></v-divider>
                    <v-card-title>
                        {{ fb_activePost.google_info['name'] }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Phone
                                </v-list-item-title>
                                <v-list-item-subtitle><br>
                                    + {{ fb_activePost.google_info['formatted_phone_number'] }} 
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Address
                                </v-list-item-title>
                                <v-list-item-subtitle><br>
                                    {{fb_activePost.google_info['formatted_address'] }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Opening Hours
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <ul v-for="opening in fb_activePost.google_info['opening_hours']['weekday_text']" :key="opening.id">
                                        <li>{{opening}}</li>
                                    </ul>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-title>
                        <h1 style="text-align:center;">Facebook Posts</h1> 
                    </v-card-title>
                    <v-img
                    height="250"
                    :src="fb_activePost.post_url">
                    </v-img>
                </v-card>
            </v-row>
        </v-dialog>
    <div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
    data(){
        return {
            account:null,
            isActive: false,
            ig_posts:null,
            ig_activePost:null,
            fb_posts:null,
            fb_activePost:null,
            openings:null
        }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker
    },mounted(){
        axios
        .get('/accounts/')
        .then(resp => {
            this.account = resp.data[0]
            this.$store.commit('setAccount', this.account)
            let igposts = this.account['ig_id']
            let fbposts = this.account['fb_id']
            if(igposts){
                axios
                .get('/igposts/')
                .then(resp => {
                    this.ig_posts = resp.data
                    console.log(this.ig_posts)
                })
            }
            if(fbposts){
                axios
                .get('/fbposts/')
                .then(resp => {
                    console.log(resp.data[0])
                    this.fb_posts = resp.data
                })
            }
        })
    },methods:{
        ig_display(post){
            this.ig_activePost = post
            console.log(this.ig_activePost)
            this.isActive = !this.isActive
        },
        fb_display(post){
            this.fb_activePost = post
            console.log(this.fb_activePost)
            this.isActive = !this.isActive
        },
        goIgUrl(){
            document.location.href = this.ig_activePost['permalink']
        },
        goFbUrl(){
            document.location.href = this.fb_activePost['permalink_url']
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

</style>