import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import content from './content'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      user, content
  },
  state:{
      isMobile: !(window.matchMedia('(min-width:768px)')).matches
  },
  getters: {
    baseInfo: state => { return { isMobile: state.isMobile } },
    isMobile: state => state.isMobile
  },
  actions: {
    
  }
})
