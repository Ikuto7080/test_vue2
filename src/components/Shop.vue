<template>
  <v-row class="card" justify="center">
      <v-card class="mx-auto mb-3" style="z-index:100; " v-if="post">
          <v-card-title class="mx-2 mt-2">{{ post.google_place.info.name }}</v-card-title>
          <v-card-content>
            <v-list flat="false">
                <v-img height="500" :src="post.images[0].url"></v-img>
                <v-list-item :ripple="false" :link="false">
                    <v-list-item-content>
                        <v-list-item-title>SNS commets</v-list-item-title>
                            <div if="post.message" class="subtitle-2">{{post.message}}</div>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <div class="rating-content">
                            <div class="rating-item">
                                <v-list-item-title>rating</v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments="half-increments" length="5" :value="post.google_place.info.rating"></v-rating>
                                </v-list-item-subtitle>
                            </div>
                            <div class="review" v-for="review in reviews" :key="review.profile_photo_url">
                                <v-img class="img" :src="review.profile_photo_url"></v-img>
                                <read-more more-str="read more" :text="review.text" less-str="read less" :max-chars="100" class="mb-3"></read-more>
                            </div>
                        </div>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>price</v-list-item-title>
                        <v-list-item-subtitle></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-if="openings.length > 0" :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>Opening Hours</v-list-item-title>
                        <v-list-item-subtitle>
                            <ul v-for="opening in openings" :key="opening">
                                <li>{{ opening }}</li>
                            </ul>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>Regular holiday</v-list-item-title>
                        <v-list-item-subtitle>None</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>Phone</v-list-item-title>
                        <v-list-item-subtitle>+ {{ post.google_place.info['formatted_phone_number'] }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>HP URL</v-list-item-title>
                        <v-list-item-subtitle><a :href="post.google_place.info['website']">{{ post.google_place.info['website'] }}</a></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item :ripple="false">
                    <v-list-item-content>
                        <v-list-item-title>Instagram URL</v-list-item-title>
                        <v-list-item-subtitle><a :href="post.permalink">{{ post.permalink }}</a></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
          </v-card-content>
      </v-card>
  </v-row>
</template>

<script>
export default {
    props:['post'],
    data(){
      return {}
    },
    computed:{
      reviews(){
            try {
              return this.post.google_place.info.reviews
            }
            catch {
              return []
            }
      },
      openings(){
            try {
              return this.post.google_place.info.opening_hours.weekday_text
            }
            catch {
              return []
            }
      }
    
    },
    methods:{
        goUrl(){
            document.location.href=this.post['permalink']
        }
    }

}
</script>

<style scoped>
.gmap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
.img{
    width: 75px;
    height: 75px;
    border: 4px solid #FFFFFF;
    border-radius: 50%;
}

.card{
    align-items: center;
    display: flex;
    justify-content: center;
}

v-card-title{
  font-size: 100px;
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
  height: 600px;
  overflow-y: auto;
}

/* reviews */
.review {
  display: flex;
}

.review .img{
  height: 40px;
  width: 40px;
}

.review p {
  font-family: arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  padding-left: 10px;
}

.filter-box {
  z-index: 1;
  padding: 8px;
  top: 0;
  margin-top: 30px;
  left: 0;
  right: 0;
  position: absolute;
  /* max-width: 300px; */
}

</style>
