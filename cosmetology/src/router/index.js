import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/VipList',
      name: 'VipList',
      component: () => import('@/components/VipManage/VipList')
    },
    {
      path: '/VipAffair',
      name: 'VipAffair',
      component: () => import('@/components/VipManage/VipAffair')
    },
    {
      path: '/CustomersBooking',
      name: 'CustomersBooking',
      component: () => import('@/components/VipManage/CustomersBooking')
    },
    {
      path: '/VipLevel',
      name: 'VipLevel',
      component: () => import('@/components/VipManage/VipLevel')
    },
    {
      path: '/VipConsume',
      name: 'VipConsume',
      component: () => import('@/components/VipManage/VipConsume')
    },
    {
      path: '/SMS',
      name: 'SMS',
      component: () => import('@/components/VipManage/SMS')
    },
    {
      path: '/SMSList',
      name: 'SMSList',
      component: () => import('@/components/VipManage/SMSList')
    },
    {
      path: '/Integral',
      name: 'Integral',
      component: () => import('@/components/VipManage/Integral')
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/vipMg',
      name: 'VipMg',
      component: ()=>import('@/components/VipMg')
    },
    {
      path: '/cashier',
      name: 'Cashier',
      component: ()=>import('@/components/Cashier/Cashier')
    },
    {
      path: '/leftNav',
      name: 'LeftNav',
      component: ()=>import('@/components/LeftNav')
    }
  ]
})
