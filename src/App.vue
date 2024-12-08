<template>
  <div>
    <h1>123</h1>
    <svg-icon name="home"></svg-icon>
  </div>
</template>

<script setup lang="ts">
  import request from '@/utils/requests'
  import { onMounted } from 'vue'
  onMounted(() => {
    let res = request({
      url: '/user/login',
      method: 'post',
      data: {
        username: 'admin',
        password: '111111'
      }
    })
  })
</script>

<style scoped lang="scss">
  div {
    h1 {
      color: $color;
    }
  }
</style>
