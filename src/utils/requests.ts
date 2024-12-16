// 对axios进行二次封装，使用请求与响应拦截器
import axios from "axios"
import { ElMessage } from "element-plus"
import useUserStore from '@/store/modules/user'
//第一步，利用axios对象的create方法，去创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,// 基本地址
    timeout: 5000// 响应超时时间
})
// 请求拦截器
request.interceptors.request.use((config) => {
    // 请求前获取用户仓库确认是否存在用户TOKEN，存在则header头携带TOKEN请求
    let userStore = useUserStore()
    if(userStore.token) {
      config.headers.token = userStore.token
    }
    return config
})
// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    // 定义一个变量
    let message = ''
    // switch判断响应异常
    let status = error.response.status
    switch(status) {
        case 401:
            message = 'TOEKN过期'
            break
        case 403:
            message = '无权访问'
            break
        case 404:
            message = '请求地址错误'
            break
        case 500:
            message = '服务器出现问题'
            break
        default:
            message = '网络出现问题'
            break
    }
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})

export default request