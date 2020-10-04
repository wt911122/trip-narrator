import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data: null,
      currLocation: null,
  },
  mutations: {
      SET_CUR_LOC(state, loc){
          state.currLocation = loc;
      },
      SET_DATA(state, data) {
          state.data = data;
      }
  },
  actions: {
      async getData({ commit }){
            const response = await fetch('/action/getTravel');
            const res = await response.json(); 
            const p = res.data.locations;
            p.sort((a, b) => (a.checkin || Infinity)- (b.checkin || Infinity))
            commit('SET_DATA', res.data);
      }
  },
  modules: {
  }
})
