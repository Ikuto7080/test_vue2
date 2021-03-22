import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Insta from '../Insta.vue'
import Fb from '../Fb.vue'
import Profile from '../Profile.vue'
import Login from '../Login.vue'
import test from '../test.vue'
import About from '../views/About.vue'
import Gmap from '../Gmap.vue'
import Edit from '../Edit.vue'
import Invite from '../Invite.vue'

Vue.use(VueRouter)
 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/about/',
    name: 'About',
    component: About
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
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/test/',
    name: 'test',
    component: test
  },
  {
    path: '/gmap/',
    name: Gmap,
    component: Gmap
  }, {
    path: '/edit/',
    name: Edit,
    component: Edit
  },
  {
    path: '/invite/:line_user_id',
    name: Invite,
    component: Invite
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
