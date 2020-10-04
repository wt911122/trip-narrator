import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      currLocation: null,
  },
  mutations: {
      SET_CUR_LOC(state, loc){
          state.currLocation = loc
      }
  },
  actions: {
  },
  modules: {
  }
})
