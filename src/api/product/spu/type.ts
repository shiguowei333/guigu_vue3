export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface SpuData {
  id?: number,
  spuName: string,
  description: string,
  category3Id: string|number,
  tmId: number|string,
  spuSaleAttrList: null|SaleAttr[],
  spuImageList: null|SpuImg[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}

export interface Trademark {
  id: number,
  tmName: string,
  logoUrl: string
}

export interface AllTradeMark extends ResponseData {
  data: Trademark[]
}

export interface SpuImg {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}

export interface SaleAttrValue {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  baseSaleAttrId: string|number,
  saleAttrValueName: string,
  saleAttrName?: string,
  isChecked?: string
}

export type SpuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  baseSaleAttrId: number|string,
  saleAttrName: string,
  spuSaleAttrValueList: SpuSaleAttrValueList,
  flag?: boolean,
  saleAttrValue?: string
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number,
  name: string
}

export interface HasSaleAttrRespondseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number|string,
  valueId: number|string
}

export interface saleAttr {
  saleAttrId: number|string,
  saleAttrValueId: number|string
}

export interface SkuData {
  category3Id: string|number,
  spuId: string|number,
  tmId: string|number,
  skuName: string,
  price: string|number,
  weight: string|number,
  skuDesc: string,
  skuAttrValueList?: Attr[],
  skuSaleAttrValueList?: saleAttr[],
  skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}