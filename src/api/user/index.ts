// 统一管理项目用户相关的接口
import request from "@/utils/requests"
// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USER_INFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 登录接口
export const reqLogin = (data: any) => request.post<any,any>(API.LOGIN_URL,data)
// 获取用户信息接口
export const reqUserInfo = () => request.get<any,any>(API.USER_INFO_URL)
// 退出登录接口
export const reqLogout = () => request.post<any,any>(API.LOGOUT_URL)