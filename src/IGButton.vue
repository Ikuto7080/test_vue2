<template lang="pug">
    <div>
      v-btn.pink.white--text(@click="open") Login with IGButton
    </div>
  </template>

<script>
export default {
    name: 'IGButton',
    methods: {
        open() {
            document.location.href = `https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=https://obscure-reef-20222.herokuapp.com/insta/&scope=user_profile%2Cuser_media&response_type=code`
        }
    }
}  
  
</script>

