// 对外暴露配置常量路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login'
  },
  {
    // 登陆之后菜单
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout'
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect:'/404',
    name: 'Any'
  }
]