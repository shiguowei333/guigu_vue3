<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select v-model="spuParams.tmId">
              <el-option v-for="(item,index) in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
          v-model:file-list="imgList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="handleUpload"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
      
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select v-model="model" placeholder="" style="width: 150px;">
              <el-option label="小米"></el-option>
              <el-option label="小米"></el-option>
              <el-option label="小米"></el-option>
          </el-select>
          <el-button type="primary" icon="Plus" style="margin: 0 10px;">添加属性值</el-button>
          <el-table border style="margin: 10px 0;">
              <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
              <el-table-column label="销售属性名字" width="120px"></el-table-column>
              <el-table-column label="销售属性值"></el-table-column>
              <el-table-column label="操作" width="100px"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang='ts'>
  import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu/index'
  import {  HasSaleAttr, SaleAttr, SpuImg, SpuData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrRespondseData } from '@/api/product/spu/type'
  import { TradeMark } from '@/api/product/trademark/type';
import { ElMessage } from 'element-plus';
  import { ref } from 'vue'
  

  let allTradeMark = ref<TradeMark[]>([])
  let $emit = defineEmits(['changeScene'])
  let imgList = ref<SpuImg[]>([])
  let saleAttr = ref<SaleAttr[]>([])
  let allSaleAttr= ref<HasSaleAttr[]>()
  let spuParams = ref<SpuData>({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
  })
  let dialogVisible = ref<boolean>(false)
  let dialogImageUrl = ref<string>('')
  const cancel = () => {
    $emit('changeScene',0)
  }
  const initHasSpuData = async(spu: SpuData) => {
    spuParams.value = spu
    let result: AllTradeMark = await reqAllTradeMark()
    let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
    let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
    let result3: HasSaleAttrRespondseData = await reqAllSaleAttr()
    allTradeMark.value = result.data
    imgList.value = result1.data.map(item => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
  }

  const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
  }

  const handleUpload = (file: any) => {
    if(file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
      if(file.size/1024/1024 < 3) {
        return true
      }else {
        ElMessage({
        type: 'error',
        message: '上传文件大小不能超过3M'
        })
        return false
      }
    }else {
      ElMessage({
        type: 'error',
        message: '上传文件必须是PNG|JPEG|GIF'
      })
      return false
    }
  }
  defineExpose({initHasSpuData})
</script>
  
<style scoped lang="scss">
  
</style>