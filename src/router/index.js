import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     },
  //     //
  //   ]
  // },

    // //test
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'dragVerifyImgChip',
    //       name: 'dragVerifyImgChip',
    //       component: () => import('@/views/a/dragVerifyImgChip'),
    //       meta: { title: 'dragVerifyImgChip', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'ma2',
    //       name: 'ma2',
    //       component: () => import('@/views/a/ma2'),
    //       meta: { title: 'ma2', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'mark',
    //       name: 'mark',
    //       component: () => import('@/views/a/mark'),
    //       meta: { title: 'mark', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'driver2',
    //       name: 'driver2',
    //       component: () => import('@/views/a/driver2'),
    //       meta: { title: 'driver2', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'driver3',
    //       name: 'driver3',
    //       component: () => import('@/views/a/driver3'),
    //       meta: { title: 'driver3', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'cm',
    //       name: 'cm',
    //       component: () => import('@/views/a/cm'),
    //       meta: { title: 'cm', icon: 'form' }
    //     },
    //     //
    //   ],
    // },
    // {
    //   path: '/amap',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'a',
    //       name: 'a',
    //       component: () => import('@/views/a/a'),
    //       meta: { title: 'a', icon: 'form' }
    //     },
    //     //
    //   ],
    // },

        //recommendation
        {
          path: '/dashboard',
          component: Layout,
          children: [
            {
              path: 'recommendation',
              name: '推荐方案',
              component: () => import('@/views/dashboard/recommendation'),
              meta: { title: '推荐方案', icon: 'nested' }
            },
            //
          ],
        },

        //orders
        {
          path: '/dashboard',
          component: Layout,
          children: [
            {
              path: 'orders',
              name: '我的订单',
              component: () => import('@/views/dashboard/orders'),
              meta: { title: '我的订单', icon: 'nested' }
            },
            //
          ],
        },

        //provideParking
        {
          path: '/dashboard',
          component: Layout,
          children: [
            {
              path: 'provideparking',
              name: '出租停车位',
              component: () => import('@/views/dashboard/provideparking'),
              meta: { title: '出租停车位', icon: 'form' }
            },
            //
          ],
        },

      

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'pay',
        name: '充值',
        component: () => import('@/views/dashboard/pay'),
        meta: { title: '充值', icon: 'form' }
      }
    ]
  },

  //导航
  {
    path: '/amap',
    component: Layout,
    children: [
      {
        path: 'driver',
        name: '导航',
        component: () => import('@/views/dashboard/driver'),
        meta: { title: '导航', icon: 'form' }
      },
    ],
  },

  //我的停车位详情
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'parkingDetails',
        name: '停车位租用详情',
        component: () => import('@/views/dashboard/parkingDetails'),
        meta: { title: '停车位租用详情', icon: 'form' }
      },
    ],
  },


  // {
  //   path: '/a',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'map',
  //       name: 'map',
  //       component: () => import('@/views/a/map'),
  //       meta: { title: 'map', icon: 'nested' }
  //     }
  //   ]
  // },


  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
