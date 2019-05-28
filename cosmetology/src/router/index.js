import Vue from 'vue'
import Router from 'vue-router'
import leftNav from '@/components/leftNav'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/leftNav',
      name: 'leftNav',
      component: leftNav
    }
  ]
})
