import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue'
// 引入el的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent: any = { SvgIcon }
//对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}