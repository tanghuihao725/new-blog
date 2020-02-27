import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
        path: '/management',
        name:'management',
        component: () => import('../views/Management/index.vue')
    },
    {
      path: '/blog-edit',
      name:'blog-edit',
      component: () => import('../views/BlogEditor/index.vue')
    },
    {
      path: '/login',
      name:'Login',
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/blog',
      name:'Blog',
      component: () => import('../views/BlogView/index.vue')
    },
    {
      path: '/blogs',
      name:'Blogs',
      component: () => import('../views/Blogs/index.vue')
    },
    {
      path: '/categories',
      name:'Categories',
      component: () => import('../views/Categories/index.vue')
    }
  ]
})
