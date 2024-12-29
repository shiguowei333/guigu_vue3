<template>
  <div>
    <el-card :body-style="{height:'90vh'}">
      <el-button type="primary" icon="Plus" @click="showDialog" v-has="`btn.Trademark.add`">添加品牌</el-button>
      <el-table style="margin: 30px 0;height: 72vh;" border :data="trademarkArr" table-layout="auto" :row-style="{height: '6.5vh'}">
        <el-table-column align="center" label="序号" type="index" min-width="1"></el-table-column>
        <el-table-column align="center" label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column align="center" label="品牌LOGO">
          <template #="{row}">
            <img :src="row.logoUrl" style="width: 30px;height: 30px;">
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column align="center" label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column align="center" label="操作">
          <template #="{row}">
            <el-button type="primary" icon="Edit" @click="updateDialog(row)"></el-button>
            <el-button type="primary" icon="Delete" @click="deleteMessage(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
       v-model:current-page="pageNo"
       v-model:page-size="pageSize"
       :page-sizes="[10,20,50,100]"
       :background="true" layout="->, total, sizes, prev, pager, next, jumper"
       :total="total"
       @change="getHasTrademark"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600"
      @close="emptyForm"
    >
      <el-form :style="{width:'80%'}"  label-position="left" :rules="rules" :model="trademarkParams" ref="formRef">
        <el-form-item label="品牌名称" label-width="90px" prop="tmName">
          <el-input aria-placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="90px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.png,.gif,.jpeg"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
  
<script setup lang='ts'>
  import { ref, reactive, onMounted } from 'vue'
  import { reqHasTrademark, reqAddTrademark, reqUpdateTrademark, reqDeleteTrademark} from '@/api/product/trademark'
  import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
  import { TradeMark } from '@/api/product/trademark/type'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { UploadProps, FormInstance } from 'element-plus'
  let formRef = ref<FormInstance>()
  let id = 0 // dialog操作判断 0/新增 其他/修改
  let dialogTitle = ref('')
  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let trademarkArr = ref<Records>([])
  let dialogVisible = ref<boolean>(false)
  let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
  })

  onMounted(() => {
    getHasTrademark()
  })

  const getHasTrademark = async() => {
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value,pageSize.value)
    if(result.code == 200) {
      total.value = result.data.total
      trademarkArr.value = result.data.records
    }
  }

  const showDialog = () => {
    id = 0
    dialogTitle.value = '添加品牌'
    dialogVisible.value = true
  }
  const updateDialog = (row: TradeMark) => {
    id = row.id as number
    dialogTitle.value = '修改品牌'
    trademarkParams.tmName = row.tmName
    trademarkParams.logoUrl = row.logoUrl
    dialogVisible.value = true
  }
  const closeDialog = () => {
    dialogVisible.value = false
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile.type)
    if(rawFile.type=='image/png'||rawFile.type=='image/jpg'||rawFile.type=='image/gif'||rawFile.type=='image/jpeg') {
      if(rawFile.size/1024/1024<4) {
        return true
      }else {
        ElMessage({
        type: 'error',
        message: '上传文件大小不能超过4M'
      })
      return false
      }
    }else {
      ElMessage({
        type: 'error',
        message: '上传文件格式务必PNG|JPG|JPEG'
      })
      return false
    }
  }
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data
    formRef.value?.clearValidate('logoUrl')
  }
  const confirm = async() => {
    await formRef.value?.validate()
    let result:any = {}
    if(id) {
      result = reqUpdateTrademark({id,...trademarkParams})
    }else {
      result = await reqAddTrademark(trademarkParams)
    }
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: id?'添加品牌成功':'添加品牌成功'
      })
      if(!id) pageNo.value = 1
      getHasTrademark()
      dialogVisible.value = false
    }else {
      ElMessage({
        type: 'error',
        message: id?'修改品牌失败':'添加品牌失败'
      })
    }
  }

  const emptyForm = () => {
    formRef.value?.resetFields()
  }

  const validatorTmName = (rule: any, value: any, callback: any) => {
    rule
    if(value.trim().length >= 2) {
      callback()
    }else {
      callback(new Error('品牌名称至少为2位'))
    }
  }

  const validatorLogoUrl = (rule: any, value: any, callback: any) => {
    rule
    if(value) {
      callback()
    }else {
      callback(new Error('LOGO图片务必上传'))
    }
  }

  const rules = {
    tmName: [{required: true, trigger: 'blur', validator: validatorTmName}],
    logoUrl: [{required: true, validator: validatorLogoUrl}]
  }

  const deleteMessage = (row: TradeMark) => {
    ElMessageBox.confirm(
    `您确定要删除${row.tmName}么？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      let result = await reqDeleteTrademark(row.id as number)
      if(result.code == 200) {
        ElMessage({
          type: 'success',
          message: '删除品牌成功',
        })
      }else {
        ElMessage({
          type: 'error',
          message: '删除品牌失败'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
  }
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
  .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>