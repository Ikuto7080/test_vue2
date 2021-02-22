<template>
    <div>
        <button @click="open">Login with Facebook</button>
        <div v-if="info">id: {{info.id}}</div>
        <div v-if="info">id: {{info.fb_id}}</div>
        <div v-if="info">{{info.user.first_name}}</div>
        <div v-if="info">{{info.user.last_name}}</div>
        <!-- <h1>{{ this.$route.query.code }} </h1> -->
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

