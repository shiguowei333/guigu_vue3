<template>
    <div class="layout_container">
        <div class="layout_slider">
           <Logo></Logo>
           <el-scrollbar class="scrollbar">
            <el-menu background-color="#001529" text-color="white">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
           </el-scrollbar>
        </div>
        <div class="layout_topbar">456</div>
        <div class="layout_main">
          <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import Main from './main/index.vue'
  // 获取用户相关的小仓库
  import useUserStore from '@/store/modules/user'
  let userStore = useUserStore()
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
              .el-menu {
                border-right: none;
              }
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
