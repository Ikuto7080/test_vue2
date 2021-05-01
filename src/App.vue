<template>
  <v-app>
    <div class="ma-1 pa-3">
      <v-card>
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
                <a  href="/edit/">Edit Profile</a>
              </v-list-title>
            </v-list-item>
            <v-list-item v-if="account">
              <v-list-title>
                <a href="/" @click="logout">LogOut</a>
              </v-list-title>
            </v-list-item>
            <v-list-item v-if="account">
              <v-list-titlle>
                <v-bottom-sheet
                v-model="sheel"
                inset>
                  <template v-slot:activator="{on, attrs}">
                    <a v-bind="attrs" v-on="on">
                      Share
                    </a>
                  </template>
                  <v-sheet
                  class="text-center"
                  height="200px"
                  >
                  <v-btn
                  class="mt-6"
                  text
                  color="error"
                  @click="sheet=!sheet"
                  >
                  close
                  </v-btn>
                  <div class="my-3">
                    Please share this app to your friends!<br>
                    You can enjoy to see your friends posts
                    <v-row class="sosyal">
                      <v-col>
                        <!-- <v-btn small depressed="depressed" class="facebook white--text">Share with Facebook</v-btn> -->
                        <v-btn class="white--text facebook mt-4" depressed="depressed" color="#495ead" small @click="shareFb"><i class="fab fa-facebook-square mr-2 fa-2x" style="size:100x;"></i>Share button</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn class="white--text line mt-4" depressed="depressed" color="#00C814" small @click="shareLine"><i class="fab fa-line mr-2 fa-2x"></i>Share button</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  </v-sheet>
                </v-bottom-sheet>
              </v-list-titlle>
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
        <!-- dial Share -->
        <v-speed-dial
          v-model="dialShare"
          absolute
          dense
          right
          bottom
          direction="left"
          open-on-hover
        >
          <template v-slot:activator>
            <v-btn fab bottom small color="pink">
              <v-icon v-if="dialShare">mdi-close</v-icon>
              <v-icon v-else>mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <div class="sharebtn">
            <ul class="sharebtn_list">
              <li class="sharebtn_item line pr-3"><a href="http://line.me/R/msg/text/?{Title}-{URLEncodedPermalink}" title="LINEに送る" target="_blank" rel="nofollow noopener noreferrer" class="btn_li bd"><i class="fab fa-line"></i></a></li>
              <li class="sharebtn_item facebook"><a href="http://www.facebook.com/sharer.php?u={URLEncodedPermalink}" title="Facebookでシェア" target="_blank" rel="nofollow noopener noreferrer" class="btn_fb bd"><i class="fab fa-facebook"></i></a></li>
            </ul>
          </div>
        </v-speed-dial>
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
      dialShare:false,
      shareUrl: "https://app.quouze.com/invite/"
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
    },
    shareFb(){
      document.location.href="https://www.facebook.com/sharer/sharer.php?u=https://app.quouze.com/invite/" + String(this.account.line_user_id)
    },
    shareLine(){
      document.location.href="https://social-plugins.line.me/lineit/share?url=https://app.quouze.com/invite/" + String(this.account.line_user_id)
    }
  }
}
</script>

<style scoped>
.line{
  /* background-color: ; */
}
.line:hover{

}
.line:active{
  top: 2px;
	box-shadow: 0 2px 0 #007700;
}

.facebook:active {
  top: 2px;
	box-shadow: 0 2px 0 #1B3D82;
}

a {
  color: #000;
  text-decoration: none;
}

.logo{
  cursor: pointer;
}

.sharebtn_list {
  display: flex;
}




</style>




