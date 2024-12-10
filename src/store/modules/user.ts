// 用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import { GET_TOKEN, SET_TOEKN } from '@/utils/token'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_TOKEN()
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if(result.code == 200) {
        this.token = result.data.token as string
        SET_TOEKN(result.data.token as string)
        return 'ok'
      }else {
        return Promise.reject(new Error(result.data.message))
      }
    }
  },
  getters: {

  }
})

export default useUserStore