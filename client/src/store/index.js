import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      user,
  },
  state:{
      isMobile: !(window.matchMedia('(min-width:768px)')).matches
  },
  getters: {
    baseInfo: state => {
      return {
        isMobile: state.isMobile
      }
    }
  }
})
