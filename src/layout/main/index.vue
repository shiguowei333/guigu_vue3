<template>
   <router-view v-slot="{ Component }">
     <transition name="fade">
       <component :is="Component" v-if="flag"/>
     </transition>
   </router-view>
</template>
  
<script setup lang='ts' name="Main">
  import { watch, ref, nextTick } from 'vue'
  // 引入layout小仓库
  import useLayOutSsttingStore from '@/store/modules/setting'
  let layOutSettingStore = useLayOutSsttingStore()
  // 定义main区域刷新的标志位
  let flag = ref(true)
  // 监听刷新按钮控制的标志位，更改时进行刷新操作（即组件的销毁与生成）
  watch(() => layOutSettingStore.refsh, () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  })
</script>
  
<style>
  
</style>