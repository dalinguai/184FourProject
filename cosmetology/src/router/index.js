import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/cashier',
      name: 'Cashier',
      component: ()=>import('@/components/Cashier/Cashier')
    },
    {
      path: '/leftNav',
      name: 'LeftNav',
      component: ()=>import('@/components/LeftNav'),
      children:[
        {
          path: '/VipList',
          name: 'VipList',
          component: () => import('@/components/VipManage/VipList')
        },
        {
          path: '/VipAffair',
          name: 'VipAffair',
          component: () => import('@/components/VipManage/VipAffair'),
        },
        {
          path: '/vipAffairComes',
          name: 'VipAffairComes',
          component: () => import('@/components/VipManage/VipAffairComes')
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
        }
      ]
    },
    {
      path: '/staffManaNav',
      name: 'staffManaNav',
      component: ()=> import('@/components/staffManage/staffManaNav'),
      children:[
        {
          path: '/basicImformation',
          name: 'basicImformation',
          component: ()=> import('@/components/staffManage/basicImformation'),
        }
      ]
    }

  ]
})
