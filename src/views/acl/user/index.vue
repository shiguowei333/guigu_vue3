<template>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary" :disabled="selectIdArr.length?false:true" @click="deleteSelectUser">批量删除</el-button>
      <el-table @selection-change="selectChange" :data="userArr" style="margin: 20px 0;" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="80px"></el-table-column>
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="username" label="用户名字" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="name" label="用户名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="roleName" label="用户角色" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="操作" width="350px">
          <template #="{row,$index}">
            <el-button type="primary" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" icon="Edit" @click="updateUser(row.id)">编辑</el-button>
            <el-popconfirm :title="`确定要删除${row.name}吗`" @confirm="deleteUser(row.id)">
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
         @change="getUser"></el-pagination>
      <el-drawer
      v-model="drawer"
      :title="userParams.id?'更新用户':'添加用户'"
      >
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
              <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" @click="drawer=false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <el-drawer
      v-model="drawer1"
      title="分配用户角色"
      >
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名">
              <el-input disabled v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="角色列表" prop="name">
              <el-checkbox label="" v-model="checkedAll" @change="handleCheckAllChange" :indeterminate="isIndeterminate">
                全选
              </el-checkbox>
              <el-checkbox-group @change="handleCheckedCitiesChange" v-model="userRole">
                  <el-checkbox :label="item" v-for="(item,index) in allRole" :key="index">{{ item.roleName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" @click="drawer1=false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>

</template>
  
<script setup lang='ts'>
  import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user';
  import { ref, onMounted } from 'vue'
  import type { Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type'
  import { ElMessage } from 'element-plus';

  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let userArr = ref<Records>([])
  let drawer = ref<boolean>(false)
  let drawer1 = ref<boolean>(false)
  let userParams = ref<User>({
    username: '',
    name: '',
    password: '',
  })
  let formRef = ref()
  let keyWord = ref<string>('')

  onMounted(() => {
    getUser()
  })

  const getUser = async() => {
    let result = await reqUserInfo(pageNo.value,pageSize.value,keyWord.value)
    if(result.code == 200) {
      total.value = result.data.total
      userArr.value = result.data.records
    }
  }

  const search = () => {
    getUser()
  }

  const reset = () => {
    keyWord.value = ''
    getUser()
  }

  const addUser = () => {
    formRef.value?.clearValidate()
    userParams.value = {
      id: 0,
      username: '',
      name: '',
      password: ''
    }
    drawer.value = true
  }

  const updateUser = (row: User) => {
    formRef.value?.clearValidate()
    Object.assign(userParams.value,row)
    drawer.value = true
  }

  const save = async() => {
    await formRef.value.validate()
    let result: any = await reqAddOrUpdateUser(userParams.value)
    if(result.code == 200) {
      drawer.value = false
      ElMessage({
        type: 'success',
        message: userParams.value.id?'更新成功':'添加成功'
      })
      getUser()
    }else {
      drawer.value = false
      ElMessage({
        type: 'error',
        message: userParams.value.id?'更新失败':'添加失败'
      })
    }
  }

  const validatorUsername = (rule:any,value:any,callBack:any) => {
    if(value.trim().length >= 5) {
      callBack()
    }else {
      callBack(new Error('用户名至少5位'))
    }
  }

  const validatorName = (rule:any,value:any,callBack:any) => {
    if(value.trim().length >= 5) {
      callBack()
    }else {
      callBack(new Error('用户昵称至少5位'))
    }
  }

  const validatorPassword = (rule:any,value:any,callBack:any) => {
    if(value.trim().length >= 6) {
      callBack()
    }else {
      callBack(new Error('用户密码至少6位'))
    }
  }

  const rules = {
    username: [{required: true,trigger: 'blur',validator:validatorUsername}],
    name: [{required: true,trigger: 'blur',validator:validatorName}],
    password: [{required: true,trigger: 'blur',validator:validatorPassword}]
  }

  const setRole = async(row: User) => {
    drawer1.value = true
    Object.assign(userParams.value,row)
    let result: AllRoleResponseData = await reqAllRole(row.id as number)
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
  }


  let checkedAll = ref(false)
  let allRole =  ref<AllRole>([])
  const isIndeterminate = ref<boolean>(true)
  let userRole = ref<AllRole>([])
  let selectIdArr = ref<number[]>([])
  const handleCheckAllChange = (val: boolean) => {
    userRole.value = val?allRole.value:[]
    isIndeterminate.value = false
  }

  const handleCheckedCitiesChange = (value: string) => {
    const checkedCount = value.length
    checkedAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
  }

  const confirmClick = async() => {
    let data: SetRoleData = {
      userId: userParams.value.id as number,
      roleIdList: userRole.value.map(item => {
        return item.id as number
      })
    }
    let result = await reqSetUserRole(data)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '分配角色成功'
      })
      drawer1.value = false
      getUser()
    }
  }

  const deleteUser = async(userId: number) => {
    let result: any = await reqRemoveUser(userId)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getUser()
    }
  }

  const selectChange = (value: any[]) => {
    selectIdArr.value = value.map(item => item.id)
  }

  const deleteSelectUser = () => {
    let result: any = reqSelectUser(selectIdArr.value)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getUser()
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