<template lang="pug">
  .btn
    v-btn.pink.white--text(@click="open")
      i.fa.fa-instagram(aria-hidden='true')
      | Login with IGButton
  </template>

<script>
export default {
    name: 'IGButton',
    methods: {
        open() {
            document.location.href = `https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=${process.env.VUE_APP_IG_REDIRECT_URL}&scope=user_profile%2Cuser_media&response_type=code`
        }
    }
}  
  
</script>


<style>
.btn {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>