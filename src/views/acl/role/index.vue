<template>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input placeholder="请输入职位关键字" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table border style="margin: 10px 0;" :data="allRole">
        <el-table-column type="index" aligin="center" label="#"></el-table-column>
        <el-table-column prop="id" align="center" label="id"></el-table-column>
        <el-table-column prop="roleName" align="center" show-overflow-tooltip label="角色名称"></el-table-column>
        <el-table-column prop="createTime" align="center" show-overflow-tooltip label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" align="center" show-overflow-tooltip label="更新时间"></el-table-column>
        <el-table-column align="center" label="操作" width="400px">
          <template #="{row,$index}">
            <el-button type="primary" icon="User" @click="">分配权限</el-button>
            <el-button type="primary" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定要删除${row.name}吗`" @confirm="">
              <template #reference>
                <el-button type="primary" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
         v-model:current-page="pageNo"
         v-model:page-size="pageSize"
         :page-sizes="[10,20,50,100]"
         :background="true" layout="->, total, sizes, prev, pager, next, jumper"
         :total="total"
         @change="getRole"></el-pagination>
    </el-card>
    <el-dialog v-model="dialogVisite" :title="RoleParms.id?'修改职位':'添加职位'">
      <el-form>
        <el-form-item label="职位名称">
          <el-input placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <el-button type="primary" @click="dialogVisite=false">取消</el-button>
          <el-button type="primary" @click="">确定</el-button>
        </template>
    </el-dialog>
</template>
  
<script setup lang='ts'>
  import { onMounted, ref, reactive } from 'vue'
  import { reqAllRoleList } from '@/api/acl/role'
  import type { RoleResponseData, Records, RoleData } from '@/api/acl/role/type'

  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let keyWord = ref<string>('')
  let allRole = ref<Records>([])
  let dialogVisite = ref<boolean>(false)
  let RoleParms = reactive({})

  onMounted(() => {
    getRole()
  })

  const getRole = async() => {
    let result: RoleResponseData = await reqAllRoleList(pageNo.value,pageSize.value,keyWord.value)
    if(result.code == 200) {
      total.value = result.data.total
      allRole.value = result.data.records
    }
  }

  const search = () => {
    getRole()
  }

  const reset = () => {
    keyWord.value = ''
    getRole()
  }

  const addRole = () => {
    dialogVisite.value = true
  }

  const updateRole = (row: RoleData) => {
    dialogVisite.value = true
  }
</script>
  
<style scoped lang="scss">
  .form {
    display: flex;
    justify-content:space-between;
    align-items: center;
    height: 50px;
  }
</style>