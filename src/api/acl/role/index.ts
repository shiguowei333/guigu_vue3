import request from '@/utils/requests'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'

enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
    SETPERMISSION_URL = '/admin/acl/permission/doAssign?'
}

export const reqAllRoleList = (page: number,limit: number,roleName: string) => request.get<any,RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`)

export const reqAddOrUpdateRole = (data: RoleData) => {
    if(data.id) {
        return request.put(API.UPDATEROLE_URL,data)
    }else {
        return request.post(API.ADDROLE_URL,data)
    }
}

export const reqAllMenuList = (roleId: number) => request.get<any,MenuResponseData>(API.ALLPERMISSION_URL + roleId)

export const reqSetPermisson = (roleId: number,permissionId: number[]) => request.post<any,any>(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)