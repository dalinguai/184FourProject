import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    //重定向
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/home'),
      children: [
        //重定向
        // {
        //   path: '/',
        //   redirect: 'cashier'
        // },
        // 前台收银
        {
          path: '/OrderDetails',
          name: 'OrderDetails',
          meta: {requireAuth: true},
          component: () => import('@/components/Cashier/OderDetails')
        },
        {
          path: '/cashier',
          name: 'Cashier',
          meta: {requireAuth: true},
          component: () => import('@/components/Cashier/Cashier'),
          children: [{
            path: 'right',
            name: 'right',
            meta: {requireAuth: true},
            component: () => import('@/components/Cashier/Cashier_right')
          },
            {
              path: 'ordModify',
              name: 'ordModify',
              meta: {requireAuth: true},
              component: () => import('@/components/Cashier/ordModify')
            },
            {
              path: 'ordSettlement',
              name: 'ordSettlement',
              meta: {requireAuth: true},
              component: () => import('@/components/Cashier/ordSettlement')
            },
            {
              path: 'ordPurchasing',
              name: 'ordPurchasing',
              meta: {requireAuth: true},
              component: () => import('@/components/Cashier/ordPurchasing')
            },
          ]
        },

        // 会员管理左侧导航栏
        {
          path: '/leftNav',
          name: 'LeftNav',
          meta: {requireAuth: true},
          component: () => import('@/components/LeftNav'),
          children: [
            {
              path: '/VipDetail',
              name: 'VipDetail',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/VipDetail')
            },
            {
              path: '/VipList',
              name: 'VipList',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/VipList'),
            },
            {
              path: '/VipConsumptionDetails',
              name: 'VipConsumptionDetails',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/VipConsumptionDetails'),
            },
            {
              path: '/VipAffair',
              name: 'VipAffair',
              meta: {requireAuth: true},
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
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/CustomersBooking')
            },
            {
              path: '/VipLevel',
              name: 'VipLevel',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/VipLevel')
            },
            {
              path: '/VipConsume',
              name: 'VipConsume',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/VipConsume')
            },
            {
              path: '/SMS',
              name: 'SMS',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/SMS')
            },
            {
              path: '/SMSList',
              name: 'SMSList',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/SMSList')
            },
            {
              path: '/Integral',
              name: 'Integral',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/Integral')
            },
          ]
        },
        // 员工管理
        {
          path: '/staffManaNav',
          name: 'staffManaNav',
          meta: {requireAuth: true},
          component: () => import('@/components/staffManage/staffManaNav'),
          children: [
            {
              path: '/basicImformation',
              name: 'basicImformation',
              meta: {requireAuth: true},
              component: () => import('@/components/staffManage/basicImformation'),

            },
            {
              path: '/role',
              name: 'role',
              meta: {requireAuth: true},
              component: () => import('@/components/staffManage/role'),
            },
            {
              path: '/staff',
              name: 'staff',
              meta: {requireAuth: true},
              component: () => import('@/components/staffManage/staff'),
            }
          ]
        },
        {
          path: '/SMS',
          name: 'SMS',
          meta: {requireAuth: true},
          component: () => import('@/components/VipManage/SMS'),
          children: [
            {
              path: '/sendMessNav',
              name: 'sendMessNav',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/sendMessNav')
            },
            {
              path: '/sendMessTable',
              name: 'sendMessTable',
              meta: {requireAuth: true},
              component: () => import('@/components/VipManage/sendMessTable')
            }
          ]
        },
        //统计路由
        {
          path: '/statisticsNav',
          name: 'statisticsNav',
          meta: {requireAuth: true},
          component: () => import('@/components/statistics/StatisticsNav'),
          children: [
            {
              path: '/Statistics/Product',
              name: 'PdtSaCount',
              meta: {requireAuth: true},
              component: () => import('@/components/statistics/PdtSaCount')
            },
            {
              path: '/indexCount',
              name: 'indexCount',
              meta: {requireAuth: true},
              component: () => import('@/components/statistics/indexCount')
            },
            {
              path: '/Statistics/Profit',
              name: 'Profit',
              meta: {requireAuth: true},
              component: () => import('@/components/statistics/Profit')
            }
          ]
        },
        //进销存
        {
          path: '/inventory',
          name: 'inventory',
          component: () => import('@/components/inventor/inventory')
        }
      ]
    },


  ],
  methods: {}
})
