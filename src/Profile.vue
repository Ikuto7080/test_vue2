<template>
    <div class="card">
        <h1 class="card-header text-center">Profile</h1>
        <div class="card-body">
            <form class="form" @submit.prevent="updateProfile">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label>First Name:</label>
                        <input type="text" name="first_name" class="form-control" v-model="account[0]['user']['first_name']">
                    </div>
                    <div class="form-group col-md-6">
                        <label>Last Name: </label>
                        <input type="text" name="last_name" class="form-control" v-model="account[0]['user']['last_name']">
                    </div>
                    <input type="submit" value="UpDate">
                </div>
            </form>
        </div>
        <!-- <div v-if="account">id: {{ account[0]['id'] }}</div> 
        <div v-if="account && !edit" class="border p-2 bg-light" v-on:click="doEdit">name: {{ account[0]['user']['first_name'] }}  {{ account[0]['user']['last_name'] }}</div>  -->
        <!-- <input v-else type="text" class="form-control" v-model="account[0]['user']['first_name']"   v-on:blur="edit=false" v-focus> -->
        <div v-if="fb_urls">
            <div v-for="fb_url in fb_urls" v-bind:key="fb_url.id">
                <v-img :src="fb_url['post_url']"></v-img> 
            </div>
        </div>
        <div v-if="ig_urls">
            {{ ig_urls[0].media_url }} 
        </div> 
    </div>
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
        .get('/accounts/')
        .then(resp => {
            this.account = resp.data
            let igposts = this.account[0]['ig_id']
            console.log(this.account)
            let fbposts = this.account[0]['fb_id']
            // console.log(fbposts)
            if(igposts){
                axios
                .get('/igposts/')
                .then((resp) => {
                    console.log(resp.data)
                this.ig_urls = resp.data
                console.log(this.ig_urls[0])
            })
            }
            if(fbposts){
                axios
                .get('/fbposts/')
                .then((resp) => {
                    this.fb_urls = resp.data
                    console.log(this.fb_urls[0])
            })
            }
            })
     },
     methods: {
         updateProfile(){
             axios
             .put('/accounts/',
             {
                 first_name: this.first_name,
                 last_name: this.last_name
             })
             .then(resp => {
                 console.log(resp.date)
             })
         }
     }
}
</script>
<style>

</style>

