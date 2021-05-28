import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: null,
    categories: [],
    gmapFilter: {},
    isOpenFilter: false
  },
  mutations: {
    setAccount(state, account) {
      state.account = account
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setGmapFilter(state, gmapFilter) {
      state.gmapFilter = gmapFilter
    },
    setOpenFilter(state, isopen) {
      state.isOpenFilter = isopen
    }
  },
  actions: {
  },
  modules: {
  }
})

