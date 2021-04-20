<template>
  <div>
    <div class="ma-12 pa-12">
      <v-card>
        <v-nagigation-drawer
        permanent
        expand-on-hover>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">
                account
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list
          nav
          dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>menu.icon</v-icon>
                <v-list-item-title>mecu.title</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-nagigation-drawer>
      </v-card>
    </div>
  </div>

      
</template>

<script>
// export default {
//   name: 'Navbar',
//   data(){
//     return {
//       drawer:false,
//       menus:[
//         {title: 'Home', icon:'mdi-home', url:'/'},
//         {title: 'Gmap', icon:'mdi-web', url:'/gmap/'},
//         {title: 'profile', icon:'mdi-account', url:'/profile/'},
//       ]
//     }
//   },computed: {
//     account() {
//       return this.$store.state.account
//     }
//   },
//   methods:{
//     logout(){
//       alert("are you sure?")
//       localStorage.removeItem("account")
//       this.$store.commit('setAccount', null) 
//       this.$router.push('/')
//     },
//     login(){
//       this.$router.push('/login/')
//     }
//   }
// }
</script>

<style>

</style>