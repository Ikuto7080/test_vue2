import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: null,
    categories:[]
  },
  mutations: {
    setAccount(state, account) {
      state.account = account
    },
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
  },
  modules: {
  }
})

