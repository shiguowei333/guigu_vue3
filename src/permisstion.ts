// 路由鉴权
import router from '@/router'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import setting from './setting'

import useUserStore from './store/modules/user'
import pinia from './store'
nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置不同路由的浏览器title标题不同
  document.title = `${setting.title} - ${to.meta.title}`
  // 切换路由的进度条功能
  nprogress.start()
  // 切换路由前获取用户token和username
  // 未登录状态直接跳转到登录页（携带登陆后要跳转的路由信息），登陆状态访问不允许访问login页，其他页面访问确认用户信息，没有用户信息先去获取
  let token = userStore.token
  let username = userStore.username
  if(token) {
    if(to.path == '/login') {
      next({path:'/'})
    }else {
      if(username) {
        next()
      }else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          userStore.userLogout()
          next({path:'/login',query:{redirect:to.path}})
        }
      }
    }
  }else {
    if(to.path == '/login') {
      next()
    }else {
      next({path:'/login',query:{redirect:to.path}})
    }
  }
})
// 全局后置守卫
router.afterEach((to, from) => {
  // 路由跳转进度条结束
  nprogress.done()
})