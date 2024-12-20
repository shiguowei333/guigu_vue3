<template>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select style="width: 200px">
            <el-option label="北极"></el-option>
            <el-option label="南极"></el-option>
            <el-option label="月球"></el-option>
            <el-option label="火星"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select style="width: 200px">
            <el-option label="北极"></el-option>
            <el-option label="南极"></el-option>
            <el-option label="月球"></el-option>
            <el-option label="火星"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select style="width: 200px">
            <el-option label="北极"></el-option>
            <el-option label="南极"></el-option>
            <el-option label="月球"></el-option>
            <el-option label="火星"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <el-table border style="margin: 10px 0;">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="属性名称" align="center" width="120px"></el-table-column>
        <el-table-column label="属性值名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120px"></el-table-column>
      </el-table>
    </el-card>
</template>
  
<script setup lang='ts'>
  
</script>
  
<style scoped lang="scss">
  
</style>