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
          <!-- 组件的递归使用，递归生成菜单项 -->
          <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
      </template>
    </template>
</template>
  
<script setup lang='ts' name="Menu">
  import { useRouter } from 'vue-router'
  let $router = useRouter()
  // 接收父组件传递过来的菜单数据
  defineProps(['menuList'])
  // 点击菜单的回调，跳转至对应路由
  const goRoute = (vc: any) => {
    $router.push(vc.index)
  }
</script>
  
<style scoped lang="scss">
  
</style>