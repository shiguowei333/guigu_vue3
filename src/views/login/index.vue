<template>
    <div class="login_container">
      <el-row>
          <el-col :span="12" :xs="0"></el-col>
          <el-col :span="12" :xs="24">
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                <h1>hello</h1>
                <h2>欢迎来到硅谷甄选</h2>
                <el-form-item prop="username">
                  <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :loading="loading" type="primary" size="default" class="login_btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
          </el-col>
      </el-row>
    </div>
</template>
<script setup lang='ts'>
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive, ref } from 'vue'
    import useUserStore from '@/store/modules/user'
    import { useRoute, useRouter } from 'vue-router'
    import { ElNotification } from 'element-plus'
    import { getTime } from '@/utils/time'
    let loading = ref(false)// 登录按钮是否处在加载状态
    let $router = useRouter()// 获取路由器
    let $route = useRoute()// 获取路由
    let useStore = useUserStore()// 获取用户pinia
    let loginForms = ref()// 收集登录表单
    // 收集账号与密码数据，给个默认值
    let loginForm = reactive({username: 'admin',password: '111111'})
    // 自定义校验姓名函数
    const validatorUserName = (rules: any,value: any,callback: any) => {
      rules
      if(value.length >= 5) {
        callback()
      }else {
        callback(new Error('账号长度至少5位'))
      }
    }
    // 自定义校验密码函数
    const validatorPassword = (rules: any,value: any,callback: any) => {
      rules
      if(value.length >= 6) {
        callback()
      }else {
        callback(new Error('密码长度至少6位'))
      }
    }
    // 表单校验规则
    const rules = {
      username: [
        {
          trigger: 'change',
          validator: validatorUserName
        }
      ],
      password: [
        {
          trigger: 'change',
          validator: validatorPassword
        }
      ]
    }
    
    // 登录按钮回调
    const login = async() => {
      try {
        // 请求登录前校验表单
        await loginForms.value.validate()
        // 表单校验通过按钮置为加载中
        loading.value = true
        try {
          // 登录成功跳转加载菜单，显示登录成功提示，登录失败提示登录失败信息
          await useStore.userLogin(loginForm)
          let redirect: any = $route.query.redirect
          $router.push({path: redirect || '/'})
          ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}好`,
            offset: 40
          })
          loading.value = true
        } catch (error) {
          loading.value = false
          ElNotification({
            type: 'error',
            message: (error as Error).message,
            offset: 40
          })
        }
      } catch (error) {
        
      }
    }
</script>
  
<style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login_form {
      position: relative;
      width: 40%;
      top: 30vh;
      left: 30vh;
      background: url('@/assets/images/login_form.png') no-repeat;
      padding: 40px;
      h1 {
        color: white;
        font-size: 40px;
      };
      h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0;
      };
      .login_btn {
        width: 100%;
      }
    }
  }
</style>