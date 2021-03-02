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
      v-menu(left bottom)
        template(v-slot:activator="{on, attrs}")
          v-btn(icon v-bind="attrs" v-on="on")
            v-icon mdi-dots-vertical

        v-list 
          v-list-item(v-for="n in 5" :key="n" @click="() => {}")
            v-list-item-title Option {{ n }}
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      account: null
    }
  },created () {
    let account = localStorage.getItem("account")
    this.account = JSON.parse(localStorage.getItem("account"))
    console.log(account)  
  },
  methods:{
    logout(){
      alert("are you sure?")
      localStorage.removeItem("account")
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