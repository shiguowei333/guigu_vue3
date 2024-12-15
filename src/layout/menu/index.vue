<template>
    <div>
      <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children">
          <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <template v-if="item.children">
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
    </div>
</template>
  
<script setup lang='ts'>
  defineProps(['menuList'])
  // 点击菜单的回调
  const goRoute = (vc: any) => {
    console.log(vc)
  }
</script>

<script lang="ts">
  export default {
    name: 'Menu'
  }
</script>
  
<style scoped lang="scss">
  
</style>