<template lang="pug">
  div
    v-app-bar(color="pink darken-1" )
      v-app-bar-nav-icon
      v-toolbar-title Quouze
      
      v-spacer 
    
      .navbar-collapse
        ul.navbar-nav 
          li.nav-item(v-if="!account")
            a(href="/login/") Login
          li.nav-item(v-if="account")
            a(href="/" @click="logout") Sign Out
          li.nav-item(v-if="account")
            a(href="/edit/") Edit 


      
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
    }
  },computed: {
    account() {
      return this.$store.state.account
    }
  },
  mounted () {
    console.log(this.account)  
  },
  methods:{
    logout(){
      alert("are you sure?")
      localStorage.removeItem("account")
      this.$store.commit('setAccount', null) 
      this.$router.push('/')
    },
    login(){
      this.$router.push('/login/')
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}
a{
  background-color: #336699 !important;
  color: #000000 !important;
  display: block;
  width: 100px;
  padding: 5px 5px;
  text-decoration: none;
}
a:hover{
  background-color: #113366 !important;
}
</style>