// 对外暴露配置常量路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    // 登陆之后菜单
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: '首页',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'Promotion'
    }
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]