<template>
    <el-card :body-style="{height:'90vh'}">
        <el-table :data="skuArr" style="width: 100%; margin: 30px 0;height: 78vh;" border>
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column prop="skuName" show-overflow-tooltip label="名称" align="center"></el-table-column>
            <el-table-column prop="skuDesc" show-overflow-tooltip label="描述" align="center"></el-table-column>
            <el-table-column label="默认图片" align="center">
              <template #="{row,$index}">
                <img :src="row.skuDefaultImg" alt="" style="width: 70px;height: 70px;">
              </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量" align="center"></el-table-column>
            <el-table-column prop="price" label="价格" align="center"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
              <template #="{row,$index}">
                <el-button type="primary" icon="Top"></el-button>
                <el-button type="primary" icon="Edit"></el-button>
                <el-button type="primary" icon="InfoFilled"></el-button>
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
         @change="getHasSku"
        >
      </el-pagination>
    </el-card>
</template>
  
<script setup lang='ts'>
  import { reqSkuList } from '@/api/product/sku'
  import type { SkuResponseData,SkuData } from '@/api/product/sku/type'
  import { ref, onMounted } from 'vue'
  let pageNo = ref(1)
  let pageSize = ref(10)
  let total = ref(0)
  let skuArr = ref<SkuData[]>()

  onMounted(() => {
    getHasSku()
  })

  const getHasSku = async() => {
    let result: SkuResponseData = await reqSkuList(pageNo.value,pageSize.value)
    if(result.code == 200) {
      total.value = result.data.total
      skuArr.value = result.data.records
    }
  }
</script>
  
<style scoped lang="scss">
  
</style>