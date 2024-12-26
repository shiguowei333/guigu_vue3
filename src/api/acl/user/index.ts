import request from "@/utils/requests"
import type { UserResponseData, User } from "./type"

enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update'
}


export const reqUserInfo = (page: number, limit: number) => request.get<any,UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

export const reqAddOrUpdateUser = (data: User) => {
  if(data.id) {
    return request.put(API.UPDATEUSER_URL, data)
  } else {
    return request.post(API.ADDUSER_URL, data)
  }
}