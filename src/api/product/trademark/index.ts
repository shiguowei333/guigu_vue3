// 品牌管理模块接口
import request from "@/utils/requests"
import { TradeMarkResponseData, TradeMark } from './type'
// 品牌管理接口地址
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETE_URL = "/admin/product/baseTrademark/remove/"
}

// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
// 添加一个品牌的接口方法
export const reqAddTrademark = (data: TradeMark) => request.post<any,any>(API.ADDTRADEMARK_URL,data)
// 修改一个品牌的接口方法
export const reqUpdateTrademark = (data: TradeMark) => request.post<any,any>(API.UPDATETRADEMARK_URL,data)
// 删除一个品牌的接口方法
export const reqDeleteTrademark = (id: number) => request.delete<any,any>(API.DELETE_URL + id)