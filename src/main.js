import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

axios.defaults.baseURL = "https://ikuto1913.herokuapp.com"
// http://127.0.0.1:8000
let account = localStorage.getItem("account")


if (account) {
  account = JSON.parse(account)
  axios.defaults.headers.common['Authorization'] = account.token
}


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
