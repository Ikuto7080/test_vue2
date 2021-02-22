<template>
    <div>
      <button @click="open">Login with IGButton</button>
      <!-- <div v-if="info">{{info.id}}</div>
      <div v-if="info">{{info.ig_id}}</div>
      <div v-if="info">{{info.user.first_name}}</div> -->
    </div>
  </template>

<script>
export default {
    name: 'IGButton',
    methods: {
        open() {
            document.location.href = 'https://api.instagram.com/oauth/authorize?client_id=909807339845904&redirect_uri=https://localhost:8080/insta/&scope=user_profile%2Cuser_media&response_type=code'
        }
    }
}  
  
</script>

