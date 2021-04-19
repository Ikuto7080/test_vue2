<template lang="pug">
  .btn
    v-btn.white--text(@click="open" color="#b125ea" large block)
      i.fa.fa-instagram.pr-2(aria-hidden='true')
      | Sign In  with instagram
  </template>

<script>
export default {
    name: 'IGButton',
    methods: {
        open() {
          const userId = this.$route.query.user_id
            document.location.href = `https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=${process.env.VUE_APP_IG_REDIRECT_URL}&scope=user_profile%2Cuser_media&response_type=code&state=${userId}`
        }
    }
}  
  
</script>


<style>
.btn {
  text-align: center;
}
</style>