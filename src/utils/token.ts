// 封装本地存储数据与读取数据方法
export const SET_TOEKN = (token: string) => {
  localStorage.setItem("TOKEN", token)
}

export const GET_TOKEN = (): string => {
  return localStorage.getItem('TOkEN') || ''
}