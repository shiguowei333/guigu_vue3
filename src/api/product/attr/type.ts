// 分类相关的数据TS类型
export interface ResponesData {
  code: number
  message: string
  ok: boolean
}

// 分类TS类型
export interface CategoryObj {
  id: number|string
  name: string
  categoty1Id?: number
  categoty2Id?: number
}

// 相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponesData {
  data: CategoryObj[]
}

// 属性和属性值的TS类型

// 属性值对象的TS类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
  id?: number
  attrName:  string
  categoryId: number|string
  categoryLevel: number
  attrValueList: AttrValueList
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[]

//属性接口返回的数据类型
export interface AttrResponseData extends ResponesData{
  data: Attr[]
}