<template>
    <v-row class="card" justify="center">
        <v-card class="mx-auto mb-3" style="z-index:100; " v-if="activePost">
            <v-card-title class="mx-2 mt-2">{{ activePost.google_place.info.name }}</v-card-title>
            <div @click="goUrl">
                <v-img height="300" :src="activePost.images[0].url"></v-img>
            </div>
            <v-list class="v-list px-2">
                <v-list-item-group>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>SNS commets</v-list-item-title>
                                <div if="activePost.message" class="subtitle-2">{{activePost.message}}</div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <div class="rating-content">
                                <div class="rating-item">
                                    <v-list-item-title>rating</v-list-item-title>
                                    <v-list-item-subtitle>
                                        <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments="half-increments" length="5" :value="activePost.google_place.info.rating"></v-rating>
                                    </v-list-item-subtitle>
                                </div>
                                <div class="review" v-for="review in reviews" :key="review.profile_photo_url">
                                    <v-img class="img" :src="review.profile_photo_url"></v-img>
                                    <p>{{review.text}}</p>
                                </div>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>price</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Opening Hours</v-list-item-title>
                            <v-list-item-subtitle>
                                <ul v-for="opening in openings" :key="opening">
                                    <li>{{ opening }}</li>
                                </ul>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Regular holiday</v-list-item-title>
                            <v-list-item-subtitle>None</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Phone</v-list-item-title>
                            <v-list-item-subtitle>+ {{ activePost.google_place.info['formatted_phone_number'] }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>HP URL</v-list-item-title>
                            <v-list-item-subtitle><a :href="activePost.google_place.info['website']">{{ activePost.google_place.info['website'] }}</a></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Instagram URL</v-list-item-title>
                            <v-list-item-subtitle><a :href="activePost.permalink">{{ activePost.permalink }}</a></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>