<template>
  <v-app>
    <div class="ma-1 pa-3">
      <v-card>
        <!-- navigation-drawer start -->
        <!-- <v-navigation-drawer
        expand-on-hover
        app
        permanent
        class="pink"> -->

        <!-- yourself -->
        <!-- <div v-if="account">
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
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
        </div>
          <v-divider></v-divider>
       -->

          <!-- menu  -->
          <!-- <v-list nav dense>

            <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url" link>
                <v-icon>{{ menu.icon }}</v-icon>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="account" href="/edit/">
                <v-icon>fas fa-user-edit</v-icon>
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="account" href="/" @click="logout">
                <v-icon>fas fa-sign-out-alt</v-icon>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer> -->
        <!-- end of navigation-drawer -->

    <!-- start of v-app-bar -->
    <v-app-bar
    app
    dense
    color="pink"
    class="rounded-0"
    >
        <v-toolbar-title>
          <v-img src="./assets/quouze_logo.png" height="35px" width="120px" @click="$router.push('/')" class="logo"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="ml-4 pink" color="white" light small v-for="menu in menus" :key="menu.title" :to="menu.url" icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-btn>
        <v-menu
        left
        bottom
        dense
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
            icon
            class="ml-4 pink"
            color="white"
            light
            v-bind="attrs"
            v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="!account">
              <v-list-title>
                <a href="/login/">Sign In</a> 
              </v-list-title>
            </v-list-item>
            <v-list-item v-if="account">
              <v-list-title>
                <a  href="/edit/">Edit</a>
              </v-list-title>
            </v-list-item>
            <v-list-item v-if="account">
              <v-list-title>
                <a href="/" @click="logout">LogOut</a>
              </v-list-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
    <!-- end of v-app-bar -->
      </v-card>
    </div>

    <!-- start of v-main -->
    <v-main class="pt-0 pb-0">
      <v-container fill-height >
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
      drawer:false
    }
  },computed: {
    account() {
      return this.$store.state.account
    },
      menus(){
        if(!this.account){
          return []
        }
        return [
        {title: 'Gmap', icon:'fas fa-globe', url:'/gmap/'},
        {title: 'profile', icon:'fas fa-user', url:'/profile/'},
        ]
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

<style scoped>
a {
  color: #000;
  text-decoration: none;
}

.logo{
  cursor: pointer;
}
</style>




