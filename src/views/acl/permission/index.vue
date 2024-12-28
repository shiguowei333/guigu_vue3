<template>
    <el-table :data="PermissionArr" style="width: 100%;margin:10px" row-key="id" border>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="权限"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template #="{row,$index}">
            <el-button type="primary" icon="Plus" @click="" :disabled="row.level==4?true:false">{{ row.level==3?'添加功能':'添加菜单' }}</el-button>
            <el-button type="primary" icon="Edit" @click="" :disabled="row.level==1?true:false">编辑</el-button>
            <el-popconfirm :title="`确定要删除${row.Name}吗`" @confirm="">
              <template #reference>
                <el-button type="primary" icon="Delete" :disabled="row.level==1?true:false">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import { reqAllPermission } from '@/api/acl/menu'
  import type { PermissionList, PermissionResponseData } from '@/api/acl/menu/type'

  let PermissionArr = ref<PermissionList>([])

  onMounted(() => {
    getHasPermission()
  })

  const getHasPermission = async() => {
    let result = await reqAllPermission()
    if(result.code == 200) {
      PermissionArr.value = result.data
    }
  }
</script>
  
<style scoped lang="scss">
  
</style>