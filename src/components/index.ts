import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue'

const allGlobalComponent = { SvgIcon }
//对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key])
    })
  }
}