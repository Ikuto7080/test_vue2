<template>
  <div></div>
</template>

<script>
  import axios from 'axios'
  export default {
      data () {
      return {
        info: null
      }
    },
    mounted () {
      let code = this.$route.query.code
      let userId = this.$route.query.state
      let redirect_uri = process.env.VUE_APP_IG_REDIRECT_URL
      if(code){
        let data = {ig_code: code, redirect_uri: redirect_uri, fb_id: userId}
        axios
        .post('/accounts/',data)
        .then(resp => {
          this.info = resp.data
            console.log(resp.data)
            this.$store.commit('setAccount', resp.data)
            axios.defaults.headers.common['Authorization'] = 'Token ' + resp.data.token
            localStorage.setItem("account", JSON.stringify(resp.data))
            this.$router.push('/gmap/')
          })
      }
    }
  }  
  
</script>

<style>

</style>

