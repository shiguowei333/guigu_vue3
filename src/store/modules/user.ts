// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入ts类型
import type { loginFormData, loginResponseData, userInfoReponseData } from "@/api/user/type"
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { GET_TOKEN, SET_TOEKN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if(routes.includes(item.name)) {
      if(item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children,routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),// 用户登录之后记录在本地的TOKEN
      menuRoutes: constantRoute,// 常量路由信息，用于动态加载左侧菜单
      username: '',// 用户的个人信息-用户名
      avatar: '',// 用户的个人信息-头像
      buttons: [''],
    }
  },
  actions: {
    // 用户登录方法，获取用户登陆后的token并存储到本地，登录失败提示信息
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      if(result.code == 200) {
        this.token = result.data as string
        SET_TOEKN(result.data as string)
        return 'ok'
      }else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息的方法，携带token请求访问获取用户信息，获取失败记录
    async userInfo() {
      let result: userInfoReponseData = await reqUserInfo()
      if(result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = []
        this.buttons = result.data.buttons
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute),result.data.routes)
        this.menuRoutes = [...constantRoute,...userAsyncRoute,anyRoute];
        [...userAsyncRoute,anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      }else {
        return Promise.reject(result.message)
      }
    },
    // 用户退出方法，清空pinia用户信息，清除本地TOKEN信息
    async userLogout() {
      // 退出登录请求
      let result: any = await reqLogout()
      if(result.code == 200) {
        this.token = '',
        this.username = '',
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      }else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {

  }
})

export default useUserStore