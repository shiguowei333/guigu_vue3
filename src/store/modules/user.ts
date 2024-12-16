// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import { GET_TOKEN, SET_TOEKN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由
import { constantRoute } from '@/router/routes'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN(),// 用户登录之后记录在本地的TOKEN
      menuRoutes: constantRoute,// 常量路由信息，用于动态加载左侧菜单
      username: '',// 用户的个人信息-用户名
      avatar: ''// 用户的个人信息-头像
    }
  },
  actions: {
    // 用户登录方法，获取用户登陆后的token并存储到本地，登录失败提示信息
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if(result.code == 200) {
        this.token = result.data.token as string
        SET_TOEKN(result.data.token as string)
        return 'ok'
      }else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息的方法，携带token请求访问获取用户信息，获取失败记录
    async userInfo() {
      let result = await reqUserInfo()
      if(result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      }else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 用户退出方法，清空pinia用户信息，清除本地TOKEN信息
    userLogout() {
      this.token = '',
      this.username = '',
      this.avatar = ''
      REMOVE_TOKEN()
    }
  },
  getters: {

  }
})

export default useUserStore