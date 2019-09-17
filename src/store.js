import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_login:false,
    user:null
  },
  mutations: {
    login(state){
      state.is_login = true
    },
    addUser(state,user){
      state.user = user;
    },
    logout(state){
      state.is_login = false;
      state.user = null
    }


  },
  actions: {

  }
})
