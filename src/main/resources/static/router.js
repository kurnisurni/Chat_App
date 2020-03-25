import Vue from './libs/vue.esm.browser.js'
import VueRouter from './libs/vue-router.esm.browser.js'
import { store } from './store.js'
Vue.use(VueRouter)


import home from './views/home.js'
import login from './views/login.js'
import register from './views/register.js'
import userDetails from './components/userDetails.js'

export const router = new VueRouter({
  mode: 'history',
  routes: [
      {
        name:"login2",
        path: '/index.html',
        component: login
      },
      {
        name:"home",
        path: '/home',
        component: home,
        beforeEnter(to, from, next) {
          if (
            fetch('/home', {
              headers: {
                'Content-Type':'application/json'
              },
              body: store.state.accessToken
            })
          ){
            next()
          } else {
            next({
              name:'login'
            })
          }
        } 
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