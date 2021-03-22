<template lang="pug">
    div
        h1
            | Invite
        p 
            | Hi! I'm Ikuto. and I would like to see your posts, so plead join Quouze, and allow me to follow to view one :)
        v-btn(@click="LineUrl")
            | Invite
            
       


</template>

<script>
export default {
    data(){

    },
    methods:{
        LineUrl(){
            document.location.href= 'https://line.me/R/oaMessage/@552lklqg/?hi%2C%20i%20want%20to%20join%20Quouze.%20friend_id%3D' + this.$route.params.line_user_id
        }
    }

}
</script>

<style>

</style>