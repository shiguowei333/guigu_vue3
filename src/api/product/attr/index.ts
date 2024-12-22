// 属性管理相关的api
import request from "@/utils/requests"
import type { CategoryResponseData, AttrResponseData, Attr } from "./type"

enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqC1 = () => request.get<any,any>(API.C1_URL)
export const reqC2 = (category1Id: number) => request.get<any,CategoryResponseData>(API.C2_URL + category1Id)
export const reqC3 = (category2Id: number) => request.get<any,CategoryResponseData>(API.C2_URL + category2Id)
export const reqAttr = (c1Id: number|string, c2Id: number|string, c3Id: number|string) => request.get<any,AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any,Attr>(API.ADDORUPDATE_URL,data)
export const reqRemoveAttr = (attrId: number) => request.delete<any,any>(API.DELETEATTR_URL + attrId)