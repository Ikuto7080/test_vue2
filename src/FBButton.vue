<template>
    <div>
        <v-btn depressed class="indigo accent-3 white--text" @click="open">Login with Facebook</v-btn>
    </div>
</template>

<script>

export default {
    name: 'FBButton',
    methods: {
        open() {
            document.location.href = 'https://www.facebook.com/v9.0/dialog/oauth?client_id=420945845838455&redirect_uri=https://obscure-reef-20222.herokuapp.com/fb_user_info/'
        }
   }
}

</script>

<style>

</style>

