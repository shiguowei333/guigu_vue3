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
                <el-button type="primary" :icon="row.isSale==1?'Bottom':'Top'" @click="updateSale(row)"></el-button>
                <el-button type="primary" icon="Edit" @click="updateSku"></el-button>
                <el-button type="primary" icon="InfoFilled" @click="findSku"></el-button>
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
      <el-drawer
        v-model="drawer"
        title="查看商品详情"
      >
        <template #header>
          <h4>set title by slot</h4>
        </template>
        <template #default>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">名称</el-col>
              <el-col :span="18">华为mata</el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">描述</el-col>
              <el-col :span="18">华为mata</el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">价格</el-col>
              <el-col :span="18">华为mata</el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">平台属性</el-col>
              <el-col :span="18">
                <el-tag style="margin: 5px;" v-for="item in 10" type="success"></el-tag>
              </el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">销售属性</el-col>
              <el-col :span="18">
                <el-tag style="margin: 5px;" v-for="item in 10" type="success"></el-tag>
              </el-col>
          </el-row>
          <el-row style="margin: 10px 0;">
              <el-col :span="6">商品图片</el-col>
              <el-col :span="18">
                <el-carousel :interval="4000" type="card" height="200px">
                  <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
          </el-row>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">cancel</el-button>
            <el-button type="primary" @click="confirmClick">confirm</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
</template>
  
<script setup lang='ts'>
  import { reqSkuList, reqSaleSku, reqCancelSale } from '@/api/product/sku'
  import type { SkuResponseData,SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
  import { ref, onMounted } from 'vue'
  let pageNo = ref(1)
  let pageSize = ref(10)
  let total = ref(0)
  let skuArr = ref<SkuData[]>()
  let drawer = ref<boolean>(false)

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

  const updateSale = async(row: SkuData) => {
    if(row.isSale == 1) {
      await reqCancelSale(row.id as number)
      ElMessage({
        type:'success',
        message: '下架成功'
      })
      getHasSku()
    }else {
      await reqSaleSku(row.id as number)
      ElMessage({
        type:'success',
        message: '上架成功'
      })
      getHasSku()
    }
  }

  const updateSku = () => {
    ElMessage({
        type:'success',
        message: '功能正在开发中~'
      })
  }

  const findSku = () => {
    drawer.value = true
  }
</script>
  
<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>