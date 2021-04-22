<template lang="pug">
  .btn
    v-btn.insta.white--text(@click="open" color="#b125ea" large block)
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
.insta{
    background: linear-gradient(45deg, rgba(254,212,117,1) 0%,rgba(229,61,93,1) 50%,rgba(194,49,134,1) 70%,rgba(156,56,187,1) 100%);
    box-shadow: 0 5px 25px rgba(0,0,0,.15);
    color: #fff;
    display: inline-block;
    font-weight: 400;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    transition: all .2s linear;
    width: 150px;
}
</style>