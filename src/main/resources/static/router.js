import Vue from './libs/vue.esm.browser.js'
import VueRouter from './libs/vue-router.esm.browser.js'
Vue.use(VueRouter)


import home from './views/home.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
      {
        name:"index",
        path: '/index.html', 
        component: home
      },
      {
        name:"home",
        path: '/', 
        component: home
      },
      {
        name:"Pets",
        path: '/Pets', 
        component: home
      }
     
  ]
});