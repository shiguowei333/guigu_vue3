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
    import { useRouter } from 'vue-router'
    import { ElNotification } from 'element-plus'
    import { getTime } from '@/utils/time'
    let loading = ref(false)
    let $router = useRouter()
    let useStore = useUserStore()
    let loginForms = ref()
    // 收集账号与密码数据
    let loginForm = reactive({username: 'admin',password: '123456'})
    // 自定义校验姓名函数
    const validatorUserName = (rules: any,value: any,callback: any) => {
      if(value.length >= 5) {
        callback()
      }else {
        callback(new Error('账号长度至少5位'))
      }
    }
    // 自定义校验密码函数
    const validatorPassword = (rules: any,value: any,callback: any) => {
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
        await loginForms.value.validate()
        loading.value = true
        try {
          await useStore.userLogin(loginForm)
          $router.push('/')
          ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,${getTime()}好`
          })
          loading.value = true
        } catch (error) {
          loading.value = false
          ElNotification({
            type: 'error',
            message: (error as Error).message
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