<template>
    <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
            <h1 style="text-align:center;">Profile
                <v-text-field label="First Name" v-model="account['user']['first_name']"></v-text-field>
                <v-text-field label="Last Name" v-model="account['user']['last_name']"></v-text-field>
                <v-btn @click="updateProfile" depressed="depressed">Update<v-icon>mdi-pencil</v-icon>
                </v-btn>
            </h1>
        </v-col>
    </v-row>
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
        .get('/accounts/' + this.$store.state.account.id + '/')
        .then(resp => {
            this.$store.commit('setAccount', resp.data)
            this.account = resp.data
            let igposts = this.account['ig_id']
            let fbposts = this.account['fb_id']
            if(igposts){
                axios
                .get('/igposts/')
                .then((resp) => {
                this.ig_urls = resp.data
            })
            }
            if(fbposts){
                axios
                .get('/fbposts/')
                .then((resp) => {
                    this.fb_urls = resp.data
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
                 this.account.user = resp.data
                 this.$store.commit('setAccount', this.account)
             })
         }
     }
}
</script>
<style scoped>

v-btn{
  text-align: center;
}
</style>

