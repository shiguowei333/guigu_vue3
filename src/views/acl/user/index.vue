<template>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary">添加用户</el-button>
      <el-button type="primary">批量删除</el-button>
      <el-table :data="userArr" style="margin: 20px 0;" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="80px"></el-table-column>
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名字" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="roleName" label="用户角色" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作" width="260px">
          <template #="{row,$index}">
            <el-button type="primary" icon="User"></el-button>
            <el-button type="primary" icon="Edit"></el-button>
            <el-button type="primary" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
         v-model:current-page="pageNo"
         v-model:page-size="pageSize"
         :page-sizes="[10,20,50,100]"
         :background="true" layout="->, total, sizes, prev, pager, next, jumper"
         :total="total"
         @change="getUser"
        ></el-pagination>
    </el-card>
</template>
  
<script setup lang='ts'>
  import { reqUserInfo } from '@/api/acl/user';
  import { ref, onMounted } from 'vue'
  import { Records } from '@/api/acl/user/type'

  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let userArr = ref<Records>([])

  onMounted(() => {
    getUser()
  })

  const getUser = async() => {
    let result = await reqUserInfo(pageNo.value,pageSize.value)
    if(result.code == 200) {
      total.value = result.data.total
      userArr.value = result.data.records
    }
  }
</script>
  
<style scoped lang="scss">
  .form {
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
</style>