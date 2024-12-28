<template>
  <el-table :data="PermissionArr" style="width: 100%;margin:10px" row-key="id" border>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="code" label="权限"></el-table-column>
    <el-table-column prop="updateTime" label="修改时间"></el-table-column>
    <el-table-column label="操作">
      <template #="{ row, $index }">
        <el-button type="primary" icon="Plus" @click="addPermission(row)" :disabled="row.level == 4 ? true : false">{{
          row.level == 3 ? '添加功能' :'添加菜单' }}</el-button>
        <el-button type="primary" icon="Edit" @click="updatePermission(row)"
          :disabled="row.level == 1 ? true : false">编辑</el-button>
        <el-popconfirm :title="`确定要删除${row.Name}吗`" @confirm="">
          <template #reference>
            <el-button type="primary" icon="Delete" :disabled="row.level == 1 ? true : false">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisite" :title="menuData.id ? '更新菜单' : '添加菜单'">
    <el-form ref="formRef" :model="menuData">
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="dialogVisite = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { reqAllPermission, reqAddOrUpdateMenu } from '@/api/acl/menu'
import type { Permission, PermissionList, PermissionResponseData, MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

let PermissionArr = ref<PermissionList>([])
let dialogVisite = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  let result = await reqAllPermission()
  if (result.code == 200) {
    PermissionArr.value = result.data
  }
}

const addPermission = (row: Permission) => {
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0
  })
  menuData.level = row.level + 1
  menuData.pid = row.id as number
  dialogVisite.value = true
}

const updatePermission = (row: Permission) => {
  Object.assign(menuData,row)
  dialogVisite.value = true
}

const save = async () => {
  let result: PermissionResponseData = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    dialogVisite.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功'
    })
    getHasPermission()
  }
}
</script>

<style scoped lang="scss"></style>