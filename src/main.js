import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCh-n6Zenl66RuVS6c9N4xEKKG9-boLa7I',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
})





Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL


//"https://ikuto1913.herokuapp.com"
let account = localStorage.getItem("account")

if (account) {
  account = JSON.parse(account)
  axios.defaults.headers.common['Authorization'] = 'Token ' + account.token
}

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
