<template>
  <el-button type="primary" :icon="Plus"></el-button>
  <el-pagination layout="prev, pager, next" :total="50">
  </el-pagination>
</template>

<script setup lang="ts">
  import {Plus} from '@element-plus/icons-vue'
</script>

<style scoped>

</style>
