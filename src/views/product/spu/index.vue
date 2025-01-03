<template>
  <div>
    <el-card :body-style="{height:'70px'}">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 200px" v-model="c1Id" @change="handle1" :disabled="scene">
          <el-option v-for="(c1) in c1Arr" :label="c1.name" :key="c1.id" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 200px" v-model="c2Id" @change="handle2" :disabled="scene">
          <el-option v-for="(c2) in c2Arr" :label="c2.name" :key="c2.id" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 200px" v-model="c3Id" @change="handle3" :disabled="scene">
          <el-option v-for="(c3) in c3Arr" :label="c3.name" :key="c3.id" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
  <div>
    <el-card style="margin-top: 10px;overflow-y: auto;" :body-style="{height:'81vh'}">
        <div v-show="scene == 0">
          <el-button type="primary" icon="Plus" :disabled="!c3Id" @click="addSpu">添加SPU</el-button>
          <el-table :data="records" style="margin: 10px 0;height: 68vh;" :row-style="{height: '6.3vh'}" border>
              <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
              <el-table-column prop="spuName" label="SPU名称"></el-table-column>
              <el-table-column prop="description" label="SPU描述" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="300px">
                <template #="{row}">
                  <el-button type="primary" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                  <el-button type="primary" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
                  <el-button type="primary" icon="View" title="查看SKU列表" @click="findSku(row)"></el-button>
                  <el-popconfirm :title="`确定要删除${row.spuName}吗`" @confirm="deleteSpu(row.id)">
                    <template #reference>
                      <el-button type="primary" icon="Delete" title="删除SPU"></el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </el-table-column>
          </el-table>
          <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :background="true"
          layout="->, total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="getHasSpu"
          @size-change="getHasSpu"
          />
        </div>
        <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
        <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
        <el-dialog title="SKU列表" v-model="show">
            <el-table :data="skuArr" style="width: 90%;margin: 0 auto;" border>
                <el-table-column prop="skuName" label="SKU名字"></el-table-column>
                <el-table-column prop="price" label="SKU价格"></el-table-column>
                <el-table-column prop="weight" label="SKU重量"></el-table-column>
                <el-table-column label="SKU图片">
                  <template #="{row}">
                    <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;" alt="">
                  </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </el-card>
  </div>

</template>
  
<script setup lang='ts'>
  import SpuForm from './spuForm.vue'
  import SkuForm from './skuForm.vue'
  import type { CategoryObj, CategoryResponseData } from '@/api/product/attr/type'
  import { reqC1, reqC2, reqC3} from '@/api/product/attr'
  import { ref, onMounted } from 'vue'
  import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
  import { HasSpuResponseData, Records, SpuData, SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
  let scene = ref<number>(0)
  let c1Arr = ref<CategoryObj[]>([])
  let c1Id = ref<number|string>('')
  let c2Arr = ref<CategoryObj[]>([])
  let c2Id = ref<number|string>('')
  let c3Arr = ref<CategoryObj[]>([])
  let c3Id = ref<number|string>('')
  let pageNo = ref<number>(1)
  let pageSize = ref<number>(10)
  let total = ref<number>(0)
  let records = ref<Records>([])
  let spu = ref<any>()
  let sku = ref<any>()
  let skuArr = ref<SkuData[]>([])
  let show = ref<boolean>(false)

  onMounted(() => {
    getC1()
  })

  const getC1 = async() => {
    let result: CategoryResponseData = await reqC1()
    if(result.code == 200) {
      c1Arr.value = result.data 
    }
  }

  const getC2 = async(c1Id: number) => {
    let result: CategoryResponseData = await reqC2(c1Id)
    if(result.code == 200) {
      c2Arr.value = result.data
    }
  }

  const getC3 = async(c2Id: number) => {
    let result: CategoryResponseData = await reqC3(c2Id)
    if(result.code == 200) {
      c3Arr.value = result.data
    }
  }

  const getHasSpu = async() => {
    if(!c3Id.value) return
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value,pageSize.value,c3Id.value)
    if(result.code == 200) {
      records.value = result.data.records
      total.value = result.data.total
    }
  }

  const handle1 = (value: number) => {
    c2Id.value = ''
    c3Id.value = ''
    records.value = []
    total.value = 0
    getC2(value)
  }

  const handle2 = (value: number) => {
    c3Id.value = ''
    records.value = []
    total.value = 0
    getC3(value)
  }

  const handle3 = () => {
    getHasSpu()
  }

  const addSpu = () => {
    spu.value.initAddSpu(c3Id)
    scene.value = 1
  }

  const updateSpu = (row: SpuData) => {
    spu.value.initHasSpuData(row)
    scene.value = 1
  }

  const changeScene = (num: number) => {
    scene.value = num
    getHasSpu()
  }

  const addSku = (row: SpuData) => {
    scene.value = 2
    sku.value.initSkuData(c1Id.value,c2Id.value,row)
  }

  const findSku = async(row: SpuData) => {
    let result = await reqSkuList(row.id as number)
    if(result.code == 200) {
      skuArr.value = result.data
      show.value = true
    }
  }

  const deleteSpu = async(spuId: number|string) => {
    let result = await reqRemoveSpu(spuId)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getHasSpu()
    }else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }
</script>
  
<style scoped lang="scss">
  
</style>