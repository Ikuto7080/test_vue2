<template>
    <div id="gmap">
    <h1 style="text-align:">Google Map</h1>
    <GmapMap
    :center="{lat:36, lng:138}"
    :zoom="6"
    map-type-id="roadmap"
    style="width: 100%; height: 750px;"
    >
        <gmap-custom-marker 
        :marker="{ lat: this.lat, lng: this.lng}">
                <v-img
                :src="ig_urls" 
                @click="display"
                class="img"
                >
                </v-img>
                <v-dialog v-model="isActive" scrollable max-width="80%">
                    <v-row class="card">
                        <v-card
                        :loading="loading"
                        class="mx-auto mb-3"
                        style="z-index:3; position:absolute;"
                        max-width="374"
                        @click="goUrl"
                        >
                            <v-list-item-title style="text-align:center;" @click="display">✖️ close</v-list-item-title>
                            <v-divider></v-divider>
                            <v-card-title>
                                Instagram Post
                            </v-card-title>
                            <v-img
                            height="250"
                            :src="ig_urls">
                            </v-img>
                            <v-card-text>
                                <v-row
                                    align="center"
                                    class="mx-0">
                                <div>
                                    {{ this.location }}
                                </div>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-row>
                </v-dialog>
                
        </gmap-custom-marker>
    </GmapMap>
    <div>

    </div>
    </div>
</template>

<script>
import axios from 'axios'
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
    el: 'gmap',
    data(){
        return {
            lat:[],
            lng:[],
            ig_urls: [],
            isActive: false,
            location: [],
            url: []

        }
    },
    components: {
        'gmap-custom-marker':GmapCustomMarker
    },mounted(){
        axios
        .get('/igposts/')
        .then(resp => {
            console.log(resp.data[0])
            this.ig_urls = resp.data[0]['media_url'],
            this.lat = resp.data[0]['latitude'],
            this.lng = resp.data[0]['longitude'],
            this.location = resp.data[0]['location_name']
            this.url = resp.data[0]['permalink']
            console.log(this.url)
        })
    },methods:{
        display(){
            this.isActive = !this.isActive
        },
        goUrl(){
            document.location.href = this.url
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

  display: flex;
  align-items: center;
  justify-content: center;
}

.close{
    text-align: center;
    outline:none
}

</style>