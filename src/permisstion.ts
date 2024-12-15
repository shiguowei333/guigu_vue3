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

  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
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
  nprogress.done()
})