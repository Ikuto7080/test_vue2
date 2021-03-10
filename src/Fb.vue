<template>
    <div></div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
        info:null,
        isLoading: false,
        fullPage: true
    }
}, mounted (){
    let code = this.$route.query.code
    let userId = this.$route.query.state
    let redirect_uri = process.env.VUE_APP_FB_REDIRECT_URL
    if(code){
        let data = {fb_code: code, redirect_uri: redirect_uri, line_user_id:userId}
        axios
        .post('/accounts/', data)
        .then(resp => {
            this.info = resp.data
            axios.defaults.headers.common['Authorization'] = 'Token ' + resp.data.token
            this.$store.commit('setAccount', resp.data)
            localStorage.setItem("account", JSON.stringify(resp.data))
            this.$router.push('/profile/')
        })
        }
    }

}

</script>
<style>

</style>

