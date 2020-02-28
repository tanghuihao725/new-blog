import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// ElementUI 改为cdn加速
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import './assets/less/elRewritre.less'

// markDown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 动画
import './assets/less/myAnimation.css'
import './assets/less/animate.mini.css'


Vue.config.productionTip = false
// Vue.use(ElementUI)

Vue.use(mavonEditor)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
