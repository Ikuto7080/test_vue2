<template>
    <v-row>
    </v-row>
</template>

<script>
export default {
  computed:{
    isMobile(){
      return this.$vuetify.breakpoint.xs
    }
  },
  created(){
    if(this.$store.state.account){
      this.$router.push('/gmap/')
    }
    // else{
    //   this.$router.push('/login/')
    // }
  }
}
</script>

<style>

</style>


