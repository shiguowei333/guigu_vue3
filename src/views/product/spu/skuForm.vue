<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
          <el-input placeholder="SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input placeholder="价格(元)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
          <el-input placeholder="重量(g)"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
          <el-input placeholder="重量(g)"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input placeholder="SKU描述" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
          <el-form :inline="true">
              <el-form-item v-for="(item,index) in attrArr" :key="item.key" :label="item.attrName">
                <el-select placeholder="" style="width: 100px;">
                    <el-option v-for="(attrValue,index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form :inline="true">
              <el-form-item v-for="(item,index) in saleArr" :label="item.saleAttrName">
                <el-select placeholder="" style="width: 100px;">
                    <el-option v-for="(saleAttrValue,index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-table border :data="imgArr">
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="图片">
                <template #="{row,$index}">
                  <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;" />
                </template>
              </el-table-column>
              <el-table-column label="名称"></el-table-column>
              <el-table-column label="操作">
                <template #="{row,$index}">
                  <el-button type="primary">设置默认</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" >保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang='ts'>
  import { reqAttr } from '@/api/product/attr'
  import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
  import { ref } from 'vue'

  let attrArr = ref<any>([])
  let saleArr = ref<any>([])
  let imgArr = ref<any>([])

  let $emit = defineEmits(['changeScene'])
  const cancel = () => {
    $emit('changeScene',0)
  }
  const initSkuData = async(c1Id:number,c2Id:number,spu:any) => {
    let result: any = await reqAttr(c1Id,c2Id,spu.category3Id)
    let result1: any = await reqSpuHasSaleAttr(spu.id)
    let result2: any = await reqSpuImageList(spu.id)
    attrArr.value = result.data
    saleArr.value = result1.data
    imgArr.value = result2.data
  }
  defineExpose({initSkuData})
</script>
  
<style scoped lang="scss">
  
</style>