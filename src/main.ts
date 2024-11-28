import { createApp } from 'vue'
import App from '@/App.vue'
// 引入element-plus插件
import ElementPlus from 'element-plus'
import 'Element-plus/dist/index.css'
// 配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus,{
  locale:zhCn // 配置element-plus国际化
})
console.log(import.meta.env)
// 将应用挂载到挂载点上
app.mount('#app')

