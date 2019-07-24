import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/elRewritre.less'

// 动画
import './assets/less/myAnimation.css'

// Bmob
import Bmob from 'hydrogen-js-sdk'

Vue.config.productionTip = false
Vue.use(ElementUI)

// Bmob
Bmob.initialize('ac49817a1802b4ff','920725','687925cf8424c526aac1fc7f22a7b622')
Vue.prototype.Bmob = Bmob
Bmob.User.login('tanghuihao','mipiacenon')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
