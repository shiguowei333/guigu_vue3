<template>
    <el-card :body-style="{height:'70px'}">
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select style="width: 200px" v-model="c1Id" @change="handle1" :disabled="scene">
            <el-option v-for="(c1,index) in c1Arr" :label="c1.name" :key="c1.id" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select style="width: 200px" v-model="c2Id" @change="handle2" :disabled="scene">
            <el-option v-for="(c2,index) in c2Arr" :label="c2.name" :key="c2.id" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select style="width: 200px" v-model="c3Id" @change="handle3" :disabled="scene">
            <el-option v-for="(c3,index) in c3Arr" :label="c3.name" :key="c3.id" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px;overflow-y: auto;" :body-style="{height:'81vh'}">
      <div v-show="scene == 0">
        <el-button type="primary" icon="Plus" :disabled="!c3Id" @click="addAttr">添加属性</el-button>
        <el-table border style="margin-top: 10px;height: 72vh;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{row,$index}">
              <el-tag style="margin: 10px 5px;" v-for="(item,index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template #="{row,$index}">
              <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`确定要删除${row.attrName}`"  @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form>
            <el-form-item label="属性名称" :inline="true">
              <el-input placeholder="请输入属性名称" v-model="attrParams.attrName" style="width: 200px"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table border style="margin:10px 10px" :data="attrParams.attrValueList">
            <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
            <el-table-column label="属性值名称">
              <template #="{row,$index}">
                <el-input v-if="row.flag" @blur="toLook(row,$index)" placeholder="请输入属性值名称" v-model="row.valueName" :ref="(vc: any) => inputArr[$index] = vc"></el-input>
                <div v-else @click="toEdit(row,$index)">{{ row.valueName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
              <template #="{row,$index}">
                <el-button type="primary" icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
</template>
  
<script setup lang='ts'>
  import { reqC1, reqC2, reqC3, reqAttr, reqAddOrUpdateAttr, reqRemoveAttr} from '@/api/product/attr'
  import { ref, onMounted, reactive, nextTick } from 'vue'
  import type { CategoryResponseData, CategoryObj, AttrResponseData, Attr, AttrValue} from "@/api/product/attr/type"
import { ElMessage } from 'element-plus';

  let c1Arr = ref<CategoryObj[]>([])
  let c1Id = ref<number|string>('')
  let c2Arr = ref<CategoryObj[]>([])
  let c2Id = ref<number|string>('')
  let c3Arr = ref<CategoryObj[]>([])
  let c3Id = ref<number|string>('')
  let attrArr = ref<Attr[]>([])
  let scene = ref<number>(0)
  let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
  })
  let inputArr =ref<any>([])
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

  const getAttr = async() => {
    let result: AttrResponseData = await reqAttr(c1Id.value,c2Id.value,c3Id.value)
    if(result.code == 200) {
      attrArr.value = result.data
    }
  }

  const handle1 = (value: number) => {
    c2Id.value = ''
    c3Id.value = ''
    attrArr.value = []
    getC2(value)
  }

  const handle2 = (value: number) => {
    c3Id.value = ''
    attrArr.value = []
    getC3(value)
  }

  const handle3 = () => {
    getAttr()
  }

  const addAttr = () => {
    Object.assign(attrParams,{
      attrName: '',
      attrValueList: [],
      categoryId: c3Id.value,
      categoryLevel: 3
    })
    scene.value = 1
  }

  const updateAttr = (row: Attr) => {
    Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
    scene.value = 1
  }
  const cancel = () => {
    scene.value = 0
  }

  const addAttrValue = () => {
    attrParams.attrValueList.push({
      valueName: '',
      flag: true
    })
    nextTick(() => {
      inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
  }

  const save = async() => {
    let result: any = await reqAddOrUpdateAttr(attrParams)
    if(result.code == 200) {
      scene.value = 0
      ElMessage({
        type: 'success',
        message:attrParams.id?'修改成功':'添加成功'
      })
      getAttr()
    }else {
      ElMessage({
        type: 'error',
        message:attrParams.id?'修改失败':'添加失败'
      })
    }
  }

  const toLook = (row:AttrValue, $index:number) => {
    if(row.valueName.trim() == '') {
      attrParams.attrValueList.splice($index,1)
      ElMessage({
        type: 'error',
        message:'属性值不能为空'
      })
      return
    }
    let repeat = attrParams.attrValueList.find((item) => {
      if(item != row) {
        return item.valueName === row.valueName
      }
    })
    if(repeat) {
      ElMessage({
        type: 'error',
        message:'属性值不能重复'
      })
      return
    }
    row.flag = false
  }
  const toEdit = (row:AttrValue, $index: number) => {
    row.flag = true
    nextTick(() => {
      inputArr.value[$index].focus()
    })
  }
  const deleteAttr = async(attrId: number) => {
    let result: any = await reqRemoveAttr(attrId)
    if(result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getAttr()
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