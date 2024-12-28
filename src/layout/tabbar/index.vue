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
        <el-popover ref="popover" placement="bottom" title="主题设置" width="300" trigger="hover">
          <el-form>
              <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" show-alpha :teleported="false"></el-color-picker>
              </el-form-item>
              <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" active-icon="MoonNight" inactive-icon="Sunny"></el-switch>
              </el-form-item>
          </el-form>
          <template #reference>
            <el-button type="primary" size="small" icon="Setting" circle></el-button>
          </template>
        </el-popover>
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
  import { ref } from 'vue'
  // 引入用户小仓库、路由、路由器
  let userStore = useUserStore()
  let layOutSettingStore = useLayOutSsttingStore()
  let $route = useRoute()
  let $router = useRouter()
  let dark = ref(false)
  const color = ref('rgba(255,69,0,0.68)')
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

  const changeDark = () => {
    let html = document.documentElement
    dark.value?html.className = 'dark':html.className = ''
  }

  const setColor = () => {
    const html = document.documentElement
    html.style.setProperty('--el-color-primary',color.value)
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