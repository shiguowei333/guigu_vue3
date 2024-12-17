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
  >
    <el-form :style="{width:'80%'}"  label-position="left">
      <el-form-item label="品牌名称" label-width="80px">
        <el-input aria-placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" label-width="80px">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
        >
          <img v-if="false" src="https://www.baidu.com" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import { reqHasTrademark } from '@/api/product/trademark'
  import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let trademarkArr = ref<Records>([])
  let dialogVisible = ref<boolean>(false)

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