<template>
    <div></div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
        info:null
    }
}, mounted (){
    let code = this.$route.query.code
    let userId = this.$route.query.state
    let inviterId = null
    let stateArray = userId.split(',')
    console.log(stateArray)
    if (stateArray.length == 2) {
        userId = stateArray[0]
        inviterId = stateArray[1]
        console.log(inviterId)
    }
    let redirect_uri = process.env.VUE_APP_FB_REDIRECT_URL
    console.log(code)
    if(code){
        let data = {fb_code: code, redirect_uri: redirect_uri}
        // if(inviterId) {
        //       data.follow_line_id =  inviterId
        // }

        axios
        .post('/accounts/', data)
        .then(resp => {
            this.info = resp.data
            axios.defaults.headers.common['Authorization'] = 'Token ' + resp.data.token
            this.$store.commit('setAccount', resp.data)
            localStorage.setItem("account", JSON.stringify(resp.data))
            this.$router.push('/gmap/')
        })
        }
    },

}

</script>
<style>

</style>

