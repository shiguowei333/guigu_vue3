<template>
  <el-card :body-style="{height:'90vh'}">
    <el-button type="primary" icon="Plus" @click="showDialog">添加品牌</el-button>
    <el-table style="margin: 30px 0;height: 72vh;" border :data="trademarkArr" table-layout="auto" :row-style="{height: '6.5vh'}">
      <el-table-column align="center" label="序号" type="index"></el-table-column>
      <el-table-column align="center" label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column align="center" label="品牌LOGO">
        <template #="{row}">
          <img :src="row.logoUrl" style="width: 30px;height: 30px;">
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column align="center" label="操作">
        <template #="">
          <el-button type="primary" icon="Edit" @click="showDialog"></el-button>
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
     @change="getHasTrademark"
    >
    </el-pagination>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="新增品牌"
    width="600"
    :close="emptyDialog"
  >
    <el-form :style="{width:'80%'}"  label-position="left" ref="traForm">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input aria-placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="80px">
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
</template>
  
<script setup lang='ts'>
  import { ref, reactive, onMounted } from 'vue'
  import { reqHasTrademark, reqAddTrademark } from '@/api/product/trademark'
  import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
  import { TradeMark } from '@/api/product/trademark/type'
  import { ElMessage } from 'element-plus'
  import type { UploadProps } from 'element-plus'
  let traForm = ref()
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
    dialogVisible.value = true
  }
  const closeDialog = () => {
    dialogVisible.value = false
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if(rawFile.type=='image/png'||rawFile.type=='image/jpg'||rawFile.type=='image/gif') {
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
        message: '上传文件格式务必PNG|JPG|GIF'
      })
      return false
    }
  }
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data
  }
  const confirm = async() => {
    let result: any = await reqAddTrademark(trademarkParams)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '添加品牌成功'
      })
      getHasTrademark()
      dialogVisible.value = false
    }else {
      ElMessage({
        type: 'error',
        message: '添加品牌失败'
      })
    }
  }
  const emptyDialog = () => {
    traForm.value.resetFields()
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