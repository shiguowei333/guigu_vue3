import request from "@/utils/requests"
import type { HasSpuResponseData } from "./type"


enum API {
  HASSPU_URL = '/admin/product/'
}

export const reqHasSpu = (page: number,limit: number,category3Id: string|number) => request.get<any,HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)