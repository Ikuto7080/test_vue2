<template>
  <div>
      <h1>Test</h1>
      <v-btn @click="change">
          btn
      </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            info:null
        }
    },
    methods: {
        change(){
            let code = "AQBefg65qyvuvYYISLtpIKpmWUD7nJXcDf3I7kmlzFEGFKsXN-PKSANUFEfawsWB4nO-b2bwRfiWSTytc9vprTqiurejCXKWnAo-HN7-Qe2bAIgpgX0mq26Wk1dn4VaHWxfeiV3-o4ZjG-xr2aL82V-P7zAIMAQYUsVWfnNLl9nYq530_e2GguZ--xdoiXKVT-XQdBN3lfR9AtyDY9gG0OFvNxrUsS3s3bwo3uwJnvqzLg"
            let redirect_uri = "https://localhost:8080/insta/"
            let data = {ig_code: code, redirect_uri: redirect_uri}
            axios
            .patch('/accounts/3/', data)
            .then(resp => {
            console.log(resp.data)
            })  
}
    }
}
</script>

<style>

</style>