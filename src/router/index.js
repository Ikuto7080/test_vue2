import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import IGButton from '../IGButton.vue'
// import FBButton from '../FBButton.vue'
import Insta from '../Insta.vue'
import Fb from '../Fb.vue'
import Profile from '../Profile.vue'

Vue.use(VueRouter)
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fb_user_info/',
    name: 'Fb',
    component: Fb
  },
  {
    path: '/insta/',
    name: 'Insta',
    component: Insta
  },
  {
    path: '/profile/',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
