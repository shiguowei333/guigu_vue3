<template>
    <div class="layout_container">
        <div class="layout_slider">
           <Logo></Logo>
           <el-scrollbar class="scrollbar">
            <el-menu :collapse="LayOutSettingStore.fold?true:false" background-color="#001529" text-color="white" :default-active="$route.path">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
           </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
          <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
          <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts' name="Layout">
  import Logo from './logo/index.vue'
  import Menu from './menu/index.vue'
  import Main from './main/index.vue'
  import Tabbar from './tabbar/index.vue'
  // 获取用户相关的小仓库
  import useUserStore from '@/store/modules/user'
  // 获取路由对象
  import { useRoute } from 'vue-router'
  // 获取layout小仓库
  import useLayOutSettingStore from '@/store/modules/setting'
  let LayOutSettingStore = useLayOutSettingStore()
  let $route = useRoute()
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
            transition: all 0.3s;
            .scrollbar {
              width: 100%;
              height: calc(100vh - $base-menu-logo-height);
              .el-menu {
                border-right: none;
              }
            }
        }
        .layout_tabbar {
            position: absolute;
            top: 0;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
            transition: all 0.3s;
            background-color: white;
            &.fold {
              width: calc(100% - $base-menu-min-width);
              left: $base-menu-min-width
            }
        }
        .layout_main {
            position: absolute;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            top: $base-tabbar-height;
            left: $base-menu-width;
            padding: 20px;
            overflow: auto;
            transition: all 0.3s;
            background-color: white;
            &.fold {
              width: calc(100% - $base-menu-min-width);
              left: $base-menu-min-width
            }
        }
    }
</style>
