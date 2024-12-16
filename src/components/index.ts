// 通过插件将组件注册为全局组件
import { App } from 'vue';
// 引入封装的svg组件
import SvgIcon from './SvgIcon/index.vue'
// 引入el的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 定义组件对象
const allGlobalComponent: any = { SvgIcon }
//对外暴露插件对象
export default {
  install(app: App) {
    // 将全局组件对象循环遍历依次注册为全局组件
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}