<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select v-model="spuParams.tmId">
              <el-option v-for="(item) in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
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
          <el-select v-model="saleAttrIdAndValueName"  style="width: 150px;" :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'暂无数据'">
              <el-option :value="`${item.id}:${item.name}`" :label="item.name" v-for="(item) in unSelectSaleAttr" :key="item.id"></el-option>
          </el-select>
          <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName?false:true" type="primary" icon="Plus" style="margin: 0 10px;">添加属性</el-button>
          <el-table border style="margin: 10px 0;" :data="saleAttr">
              <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
              <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
              <el-table-column label="销售属性值">
                <template #="{row}">
                  <el-tag closable style="margin:0 5px;" @close="row.spuSaleAttrValueList.splice(index,1)" v-for="(item,index) in row.spuSaleAttrValueList" :key="item.id" >{{ item.saleAttrValueName }}</el-tag>
                  <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag==true" placeholder="请输入属性值" size="small" style="width: 100px;"></el-input>
                  <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"></el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100px">
                <template #="{$index}">
                  <el-button type="primary" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="saleAttr.length>0?false:true" type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang='ts'>
  import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSPU } from '@/api/product/spu/index'
  import {  SaleAttrValue, HasSaleAttr, SaleAttr, SpuImg, SpuData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrRespondseData } from '@/api/product/spu/type'
  import { TradeMark } from '@/api/product/trademark/type';
  import { ElMessage } from 'element-plus';
  import { ref, computed } from 'vue'
  

  let allTradeMark = ref<TradeMark[]>([])
  let $emit = defineEmits(['changeScene'])
  let imgList = ref<SpuImg[]>([])
  let saleAttr = ref<SaleAttr[]>([])
  let allSaleAttr= ref<HasSaleAttr[]>([])
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
  let saleAttrIdAndValueName = ref<string>('')


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

  let unSelectSaleAttr = computed(() => {
    let unSelectAttr = allSaleAttr.value.filter(item => {
      return saleAttr.value.every(item1 => {
        return item.name != item1.saleAttrName
      })
    })
    return unSelectAttr
  })

  const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    let newSaleAttr: SaleAttr = {
      baseSaleAttrId,
      saleAttrName,
      spuSaleAttrValueList: []
    }
    saleAttr.value.push(newSaleAttr)
    saleAttrIdAndValueName.value = ''
  }

  const toEdit = (row: SaleAttr) => {
    row.flag = true
    row.saleAttrValue = ''
  }

  const toLook = (row: SaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row
    let newSaleAttrValue: SaleAttrValue = {
      baseSaleAttrId,
      saleAttrValueName: saleAttrValue as string
    }
    if((saleAttrValue as string).trim() == '') {
      ElMessage({
        type: 'error',
        message: '属性值不能为空'
      })
      return
    }
    let repeat = row.spuSaleAttrValueList.find(item => {
      return item.saleAttrValueName == saleAttrValue
    })
    if(repeat) {
      ElMessage({
        type: 'error',
        message: '属性值重复'
      })
      return
    }
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.flag = false
  }

  const save = async() => {
    spuParams.value.spuImageList = imgList.value.map((item: any) => {
      return {
        imgName: item.name,
        imgUrl: (item.response && item.response.data) || item.url
      }
    })
    spuParams.value.spuSaleAttrList = saleAttr.value
    let result: any = await reqAddOrUpdateSPU(spuParams.value)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: spuParams.value.id ? '更新成功':'添加成功'
      })
      $emit('changeScene',0)
    }else {
      ElMessage({
        type: 'error',
        message: spuParams.value.id ? '更新失败':'添加失败'
      })
      $emit('changeScene',0)
    }
  }

  const initAddSpu = async(c3Id: number|string) => {

    Object.assign(spuParams.value,{
      category3Id: '',
      spuName: '',
      description: '',
      tmId: '',
      spuImageList: [],
      spuSaleAttrList: []
    })
    imgList.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    spuParams.value.category3Id = c3Id
    let result: AllTradeMark = await reqAllTradeMark()
    let result1: HasSaleAttrRespondseData = await reqAllSaleAttr()
    allTradeMark.value = result.data
    allSaleAttr.value = result1.data
  }
  defineExpose({initHasSpuData,initAddSpu})
</script>
  
<style scoped lang="scss">
  
</style>