<template lang="pug">
  .btn
    v-btn.indigo.accent-3.white--text(depressed='depressed' @click='open')
      i.fa.fa-facebook
      | Login with Facebook
</template>

<script>

export default {
    name: 'FBButton',
    methods: {
        open() {
            const userId = this.$route.query.user_id
            document.location.href = `https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=${process.env.VUE_APP_FB_REDIRECT_URL}&state=${userId}`
        }
   }
}
</script>

<style>
.btn {
  text-align: center;
}

</style>

