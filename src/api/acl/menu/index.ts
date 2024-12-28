import request from "@/utils/requests"
import type { PermissionResponseData, MenuParams } from './type'

enum API {
  ALLPERMISSION_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save',
  UPDATE_URL = '/admin/acl/permission/update'
}

export const reqAllPermission = () => request.get<any,PermissionResponseData>(API.ALLPERMISSION_URL)

export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if(data.id) {
    return request.put<any,any>(API.UPDATE_URL, data)
  }else {
    return request.post<any,any>(API.ADDMENU_URL, data)
  }
}