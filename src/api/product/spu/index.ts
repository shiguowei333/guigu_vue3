import request from "@/utils/requests"
import type { HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrRespondseData, SpuData } from "./type"


enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList'，
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo'
}

export const reqHasSpu = (page: number,limit: number,category3Id: string|number) => request.get<any,HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

export const reqAllTradeMark = () => request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL)

export const reqSpuImageList = (spuId: number) => request.get<any,SpuHasImg>(API.IMAGE_URL + spuId)

export const reqSpuHasSaleAttr = (spuId: number) => request.get<any,SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

export const reqAllSaleAttr = () => request.get<any,HasSaleAttrRespondseData>(API.ALLSALEATTR_URL)

export const reqAddOrUpdateSPU = (data: SpuData) => {
  if(data.id) {
    request.post<any,any>(API.UPDATESPU_URL)
  }else {
    request.post<any,any>(API.ADDSPU_URL)
  }
}

