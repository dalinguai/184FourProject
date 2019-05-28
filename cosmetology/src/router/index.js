import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/VipList',
      name: 'VipList',
      component: () => import('@/components/VipList')
    },
    {
      path: '/VipAffair',
      name: 'VipAffair',
      component: () => import('@/components/VipAffair')
    },
    {
      path: '/CustomersBooking',
      name: 'CustomersBooking',
      component: () => import('@/components/CustomersBooking')
    },
    {
      path: '/VipLevel',
      name: 'VipLevel',
      component: () => import('@/components/VipLevel')
    },
    {
      path: '/VipConsume',
      name: 'VipConsume',
      component: () => import('@/components/VipConsume')
    },
    {
      path: '/SMS',
      name: 'SMS',
      component: () => import('@/components/SMS')
    },
    {
      path: '/SMSList',
      name: 'SMSList',
      component: () => import('@/components/SMSList')
    },
    {
      path: '/Integral',
      name: 'Integral',
      component: () => import('@/components/Integral')
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vipMg',
      name: 'VipMg',
      component: ()=>import('@/components/VipMg')
    }
  ]
})
