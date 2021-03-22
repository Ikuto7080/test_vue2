<template>
  <div>
    <v-app>
      <v-navigation-drawer 
      app 
      v-model="drawer" 
      class="pink">
        <v-list-item>
          <v-list-item-title class="title">
            Quouze
          </v-list-item-title>
          <v-btn icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <div class="navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!account"><a href="/login/">Login</a></li>
            <li class="nav-item" v-if="account"><a href="/" @click="logout">Sign Out</a></li>
            <li class="nav-item" v-if="account"><a href="/edit/">Edit</a></li>
          </ul>
        </div>
        <v-divider />

        <v-list nav>
          <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <!-- アプリケーションバー -->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-app-bar>

      <v-content>
        <router-view />
      </v-content>

      <v-footer app>
        <!-- フッター -->
      </v-footer>
    </v-app>
  </div>




      
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {
      drawer:false,
      menus:[
        {title: 'Home', icon:'mdi-home', url:'/'},
        {title: 'Gmap', icon:'mdi-web', url:'/gmap/'},
        {title: 'profile', icon:'mdi-account', url:'/profile/'},
      ]
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