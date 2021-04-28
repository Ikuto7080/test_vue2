<template>
  <div class="btn">
      <v-btn class="white--text" depressed="depressed" @click="open" color="#495ead" large="large" block="block"><i class="fa fa-facebook pr-2"></i>Sign in with Facebook</v-btn>
  </div>
</template>

<script>

export default {
    name: 'FBButton',
    methods: {
        open() {
            const userId = this.$route.query.user_id
            document.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=${process.env.VUE_APP_FB_REDIRECT_URL}&state=${userId}&scope=user_posts`
        }
   }
}
</script>

<style scoped>
.btn {
  text-align: center;
}

</style>

