<template>
    <div class="tabbar">
      <div class="tabbar_left">
        <el-icon style="margin-right: 10px;" @click="changeIcon">
          <component :is="layOutSettingStore.fold?'Fold':'Expand'"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title">
            <el-icon style="margin:0 3px;vertical-align: bottom;">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tabbar_right">
        <el-button type="primary" size="small" icon="Refresh" @click="updateRefsh" circle></el-button>
        <el-button type="primary" size="small" icon="FullScreen" circle></el-button>
        <el-button type="primary" size="small" icon="Setting" circle></el-button>
        <img src="../../../public/logo.png" style="width: 24px;height: 24px;margin: 0px 20px;">
        <el-dropdown>
          <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</template>
  
<script setup lang='ts' name="Tabbar">
  import useLayOutSsttingStore from '@/store/modules/setting'
  import{ useRoute } from 'vue-router'
  let layOutSettingStore = useLayOutSsttingStore()
  let $route = useRoute()
  const changeIcon = () => {
    layOutSettingStore.fold = !layOutSettingStore.fold
  }
  const updateRefsh = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh
  }
</script>
  
<style lang="scss" scoped>
  .tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .tabbar_left {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    .tabbar_right {
      display: flex;
      align-items: center;
    }
  }
</style>