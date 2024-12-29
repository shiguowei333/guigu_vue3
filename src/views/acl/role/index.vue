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
          <template #="{row}">
            <el-button type="primary" icon="User" @click="setPermisstion(row)">分配权限</el-button>
            <el-button type="primary" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定要删除${row.roleName}吗`" @confirm="removeRole(row.id)">
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
      <el-form ref="formRef" :model="RoleParms" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input placeholder="请输入职位名称" v-model="RoleParms.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
          <el-button type="primary" @click="dialogVisite=false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="drawer">
        <template #header>
          <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
          />
        </template>
        <template #footer>
          <el-button type="primary" @click="drawer=false">取消</el-button>
          <el-button type="primary" @click="handler()">确定</el-button>
        </template>
    </el-drawer>
</template>
  
<script setup lang='ts'>
  import { onMounted, ref, reactive } from 'vue'
  import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermisson, reqRemoveRole } from '@/api/acl/role'
  import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
  import { ElMessage } from 'element-plus'

  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let keyWord = ref<string>('')
  let allRole = ref<Records>([])
  let dialogVisite = ref<boolean>(false)
  let RoleParms: RoleData = reactive({
    roleName: ''
  })
  let formRef = ref()
  let drawer =ref<boolean>(false)
  let menuArr = ref<MenuList>([])
  let selectArr = ref<number[]>([])
  let treeRef = ref()

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
    Object.assign(RoleParms,{
      roleName: '',
      id: 0
    })
    formRef.value?.clearValidate('roleName')
    dialogVisite.value = true
  }

  const updateRole = (row: RoleData) => {
    dialogVisite.value = true
    Object.assign(RoleParms,row)
    formRef.value?.clearValidate('roleName')
  }

  const validatorRoleName = (rule: any, value: any, callBack: any) => {
    rule
    if(value.trim().length >= 3) {
      callBack()
    }else {
      callBack(new Error('职位名称至少3位'))
    }
  }

  const rules = {
    roleName: [{required:true,trigger:'blur',validator:validatorRoleName}]
  }

  const save = async() => {
    await formRef.value.validate()
    let result: any = await reqAddOrUpdateRole(RoleParms)
    if(result.code == 200) {
      dialogVisite.value = false
      ElMessage({
        type: 'success',
        message: RoleParms.id?'更新成功':'添加成功'
      })
      getRole()
    }else {
      ElMessage({
        type: 'error',
        message: RoleParms.id?'更新失败':'添加失败'
      })
    }
  }

  const setPermisstion = async(row: RoleData) => {
    drawer.value = true
    Object.assign(RoleParms,row)
    let result: MenuResponseData = await reqAllMenuList(row.id as number)
    if(result.code == 200) {
      menuArr.value = result.data
      selectArr.value = filterSelectArr(menuArr.value, [])
    }
  }

  const defaultProps = {
    children: 'children',
    label: 'name',
  }

  const filterSelectArr = (ALLData: any, initArr: any) => {
    ALLData.forEach((item: any) => {
      if(item.select && item.level == 4) {
        initArr.push(item.id)
      }
      if(item.children && item.children.length > 0) {
        filterSelectArr(item.children,initArr)
      }
    });
    return initArr
  }

  const handler = async() => {
    let roleId = RoleParms.id
    let allArr = treeRef.value.getCheckedKeys()
    let halfArr = treeRef.value.getHalfCheckedKeys()
    let permissionId = allArr.concat(halfArr)
    let result = await reqSetPermisson(roleId as number,permissionId)
    if(result.code == 200) {
      drawer.value = false
      ElMessage({
        type: 'success',
        message: '分配权限成功'
      })
      getRole()
    }
  }

  const removeRole = async(roleId: number) => {
    let result = await reqRemoveRole(roleId)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getRole()
    }
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