<template>
    <div class="layout_container">
        <div class="layout_slider">
           <Logo></Logo>
           <el-scrollbar class="scrollbar">
            <el-menu background-color="#001529" text-color="white">
                <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">数据大屏</el-menu-item>
                <el-sub-menu index="3">
                  <template #title><span>权限管理</span></template>
                  <el-menu-item index="3-1">用户管理</el-menu-item>
                  <el-menu-item index="3-2">角色管理</el-menu-item>
                  <el-menu-item index="3-3">菜单管理</el-menu-item>
                </el-sub-menu>
            </el-menu>
           </el-scrollbar>
        </div>
        <div class="layout_topbar">456</div>
        <div class="layout_main">789</div>
    </div>
</template>

<script setup lang='ts'>
  import Logo from './logo/index.vue'
</script>

<style scoped lang='scss'>
    .layout_container {
        width: 100%;
        height: 100vh;
        .layout_slider {
            width: $base-menu-width;
            background: $base-menu-background;
            height: 100vh;
            .scrollbar {
              width: 100%;
              height: calc(100vh - $base-menu-logo-height);
            }
        }
        .layout_topbar {
            position: absolute;
            top: 0;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
        }
        .layout_main {
            position: absolute;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            top: $base-tabbar-height;
            left: $base-menu-width;
            padding: 20px;
            overflow: auto;
        }
    }
</style>
