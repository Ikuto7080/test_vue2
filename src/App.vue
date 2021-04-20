<template>
  <v-app>
    <div class="ma-1 pa-3">
      <v-card>
        <!-- navigation-drawer start -->
        <v-navigation-drawer
        app
        permanent
        expand-on-hover
        class="pink">

        <!-- yourself -->
        <div v-if="account">
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{account.user.first_name}} {{account.user.last_name}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
        </div>

          <!-- menu  -->
          <v-list nav dense>
            <v-list-item v-if="!account" href="/login/">
              <v-list-icon>
                <v-icon>fas fa-sign-in-alt</v-icon>
              </v-list-icon>
              <v-list-item-title>Sign In</v-list-item-title>
            </v-list-item>

            <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url" link>
              <v-list-item-icon>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
            
            <v-list-item v-if="account" href="/edit/">
              <v-list-icon>
                <v-icon>fas fa-user-edit</v-icon>
              </v-list-icon>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="!account" href="/" @click="logout">
              <v-list-icon>
                <v-icon>fas fa-sign-out-alt</v-icon>
              </v-list-icon>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <!-- end of navigation-drawer -->
        
    <!-- start of v-app-bar -->
    <v-app-bar
    app
    dense
    color="pink"
    >
      <v-toolbar-title>Quouze</v-toolbar-title>
    </v-app-bar>
    <!-- end of v-app-bar -->

      </v-card>
    </div>
     


    <!-- start of v-main -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <!-- end of v-main -->
  </v-app>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      drawer:false,
      menus:[
        {title: 'Home', icon:'fas fa-home', url:'/'},
        {title: 'Gmap', icon:'fas fa-globe', url:'/gmap/'},
        {title: 'profile', icon:'fas fa-user', url:'/profile/'},
      ]
    }
  },computed: {
    account() {
      return this.$store.state.account
    }
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
  background-color: #000000;
  color: #000000;
  display: block;
  padding: 5px 5px;
  text-decoration: none;
}
a:hover{
  background-color: #113366;
} 
nav-item{
  padding-right: 5px;
}
</style>



