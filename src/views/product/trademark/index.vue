<template>
  <el-card :body-style="{height:'90vh'}">
    <el-button type="primary" icon="Plus">添加品牌</el-button>
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
          <el-button type="primary" icon="Edit"></el-button>
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
  
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import { reqHasTrademark } from '@/api/product/trademark'
  import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let trademarkArr = ref<Records>([])

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
</script>
  
<style scoped lang="scss">
  
</style>