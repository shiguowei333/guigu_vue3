//登录接口需要携带的参数
export interface loginForm {
  username: string
  password: string
}

// 登录接口返回的data数据类型
interface dataType {
  token?: string
  message?: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

// 返回用户信息的数据类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

// 返回用户信息的总数据类型
interface user {
  checkUser: userInfo
}

// 定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number
  data: user
}