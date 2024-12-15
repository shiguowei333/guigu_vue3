<template>
    <template v-for="item in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
          <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length == 1">
        <Menu :menuList="item.children"></Menu>
      </template>
      <template v-if="item.children && item.children.length > 1">
        <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
      </template>
    </template>
</template>
  
<script setup lang='ts' name="Menu">
  import { useRouter } from 'vue-router'
  let $router = useRouter()
  defineProps(['menuList'])
  // 点击菜单的回调
  const goRoute = (vc: any) => {
    $router.push(vc.index)
  }
</script>
  
<style scoped lang="scss">
  
</style>