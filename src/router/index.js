import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Rebels from '../views/Rebels.vue'

import store from '../store/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.state.isAuthenticated === true) {
        next('/rebels')
      } else {
        next()
      }
    }
  },
  {
    path: '/rebels',
    name: 'Rebels',
    component: Rebels,
    beforeEnter: (to, from, next) => {
      if(store.state.isAuthenticated === true) {
        next()
      } else {
        next('/login')
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
