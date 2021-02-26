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
            document.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=${process.env.VUE_APP_FB_REDIRECT_URL}&scope=user_profile%2Cuser_media&response_type=code`
        }
    }
}  
  
</script>

