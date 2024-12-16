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
        <el-button type="primary" size="small" icon="FullScreen" @click="fullScreen" circle></el-button>
        <el-button type="primary" size="small" icon="Setting" circle></el-button>
        <img :src="userStore.avatar" style="width: 24px;height: 24px;margin: 0px 20px;border-radius: 50%;">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</template>
  
<script setup lang='ts' name="Tabbar">
  import useLayOutSsttingStore from '@/store/modules/setting'
  import{ useRoute,useRouter } from 'vue-router'
  import useUserStore from '@/store/modules/user'
  // 引入用户小仓库、路由、路由器
  let userStore = useUserStore()
  let layOutSettingStore = useLayOutSsttingStore()
  let $route = useRoute()
  let $router = useRouter()
  // 修改菜单折叠、展开状态的回调函数
  const changeIcon = () => {
    layOutSettingStore.fold = !layOutSettingStore.fold
  }
  // 刷新main区域组件重新加载的回调函数
  const updateRefsh = () => {
    layOutSettingStore.refsh = !layOutSettingStore.refsh
  }
  // 展开全屏与关闭全屏的回调函数
  const fullScreen = () => {
    let full = document.fullscreenElement
    if(!full) {
      document.documentElement.requestFullscreen()
    }else {
      document.exitFullscreen()
    }
  }
  // 点击退出登录的回调函数，清空pinia用户信息，路由跳转至登录页
  const logout = async () => {
    await userStore.userLogout()
    $router.push({path:'/login',query:{redirect: $route.path}})
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