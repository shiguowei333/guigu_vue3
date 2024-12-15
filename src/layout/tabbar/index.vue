<template>
    <div class="tabbar">
      <div class="tabbar_left">
        <el-icon style="margin-right: 10px;" @click="changeIcon">
          <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">promotion management</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tabbar_right">
        <el-button type="primary" size="small" icon="Refresh" circle></el-button>
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
  let LayOutSettingStore = useLayOutSsttingStore()
  const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
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