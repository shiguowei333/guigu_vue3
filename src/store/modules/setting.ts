// layout组件相关的小仓库
import { defineStore } from "pinia"

let useLayOutSettingStore = defineStore('SettingStore',{
  state: () => {
    return {
      fold: false,// 用户控制菜单左右折叠还是收起的控制
      refsh: false,// 用于控制刷新效果
    }
  }
})
// 对外暴露小仓库
export default useLayOutSettingStore