import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import * as qiniu from 'qiniu-js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
      user,
  },
  state:{
      isMobile: !(window.matchMedia('(min-width:768px)')).matches
  },
  getters: {
    baseInfo: state => { return { isMobile: state.isMobile } }
  },
  actions: {
    uploadFile:({commit},payload) => {
      const {file, key=Date.now() } = payload
      const config={
        useCdnDomain: true,
      }
      const putExtra = {
        fname:""
      }
      const token = localStorage.uploadToken
      const observable = qiniu.upload(file, key, token, putExtra, config)
      return new Promise((resolve, reject) => {
        const subscription = observable.subscribe(por=>{},err=>reject(err),res=>resolve(res))
      })
    }
  }
})
