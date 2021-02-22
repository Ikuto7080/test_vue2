import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://ikuto1913.herokuapp.com/'
let account = localStorage.getItem("account")

if (account) {
  account = JSON.parse(account)
  axios.defaults.headers.common['Authorization'] = account.token
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
