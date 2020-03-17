import Vue from './libs/vue.esm.browser.js'
import VueRouter from './libs/vue-router.esm.browser.js'
Vue.use(VueRouter)


import home from './views/home.js'
import login from './views/login.js'
import register from './views/register.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
      {
        name:"login",
        path: '/index.html', 
        component: login
      },
      {
        name:"home",
        path: '/home', 
        component: home
      },
      {
        name:"login",
        path: '/', 
        component: login
      },
      {
     name:"register",
     path: '/register',
     component: register
     }
  ]
});