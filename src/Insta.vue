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
      let redirect_uri = process.env.VUE_APP_IG_REDIRECT_URL
      let account = this.$store.state.account
      let account_id = account.id
      // localStorage.getItem("account")
      console.log(account)
      if(code){
        let data = {ig_code: code, redirect_uri: redirect_uri, account_id: account_id}
        axios
        .post('/accounts/' + String(account_id) + '/connect_ig/',data)
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

