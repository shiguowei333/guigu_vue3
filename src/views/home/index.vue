<template>
    <el-card>
        <div class="box">
          <img :src="userStore.avatar" class="avatar">
          <div class="bottom">
            <h3 class="title">{{ getTime() + '好呀' + userStore.username }}</h3>
            <p>硅谷甄选运营平台</p>
          </div>
        </div>
    </el-card>
    <div class="bottom_img">
      <svg-icon name="welcome" width="800px" height="800px"></svg-icon>
    </div>
</template>
  
<script setup lang='ts'>
  import useUserStore from '@/store/modules/user'
  import { getTime } from '@/utils/time'

  let userStore = useUserStore()

</script>
  
<style scoped lang="scss">
  .box {
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .bottom {
      margin-left: 20px;
      .title {
        font-size: 30px;
        font-weight: 900;
        margin-bottom: 30px;
      }
      p {
        font-style: italic;
        color: skyblue
      }
    }
  }
  .bottom_img {
    display: flex;
    justify-content: center;
  }
</style>