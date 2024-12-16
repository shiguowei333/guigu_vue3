// 封装本地存储、读取、删除TOKEN的方法
export const SET_TOEKN = (token: string) => {
  localStorage.setItem("TOKEN", token)
}

export const GET_TOKEN = (): string => {
  return localStorage.getItem('TOKEN') || ''
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}