<template>
   <router-view v-slot="{ Component }">
     <transition name="fade">
       <component :is="Component" v-if="flag"/>
     </transition>
   </router-view>
</template>
  
<script setup lang='ts' name="Main">
  import { watch, ref, nextTick } from 'vue'
  import useLayOutSsttingStore from '@/store/modules/setting'
  let layOutSettingStore = useLayOutSsttingStore()

  let flag = ref(true)

  watch(() => layOutSettingStore.refsh, () => {
    console.log(1)
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  })
</script>
  
<style>
  
</style>