<template>
    <div class="login_container">
      <el-row>
          <el-col :span="12" :xs="0">123</el-col>
          <el-col :span="12" :xs="24">
            <el-form class="login_form">
                <h1>hello</h1>
                <h2>欢迎来到硅谷甄选</h2>
                <el-form-item label="">
                  <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password="true"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="default" class="login_btn">登录</el-button>
                </el-form-item>
            </el-form>
          </el-col>
      </el-row>
    </div>
</template>
<script setup lang='ts'>
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive } from 'vue'
    // 收集账号与密码数据
    let loginForm = reactive({username: 'admin',password: '123456'})
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