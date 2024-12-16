// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from "vue-router"
// 引入路由配置
import { constantRoute } from './routes'

let router = createRouter({
  //路由模式
  history: createWebHashHistory(),
  // 路由配置
  routes: constantRoute,
  // 路由跳转之后页面固定到左上角
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router