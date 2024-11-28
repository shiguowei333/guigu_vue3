<template>
  <el-button type="primary" :icon="Plus"></el-button>
  <el-pagination layout="prev, pager, next" :total="50">
  </el-pagination>
  <test></test>
</template>

<script setup lang="ts">
  import {Plus} from '@element-plus/icons-vue'
  import Test from '@/components/Test.vue'
</script>

<style scoped>

</style>
