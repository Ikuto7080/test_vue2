import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from "gmap-vue/dist/components/cluster";
import ReadMore from 'vue-read-more';

Vue.use(ReadMore)
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

Vue.component("cluster", GmapCluster);




Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL


let account = localStorage.getItem("account")
store.commit('setAccount', account)

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
