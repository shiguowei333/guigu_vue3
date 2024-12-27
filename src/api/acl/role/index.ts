import request from '@/utils/requests'
import type { RoleResponseData, RoleData } from './type'

enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update'
}

export const reqAllRoleList = (page: number,limit: number,roleName: string) => request.get<any,RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`)

export const reqAddOrUpdateRole = (data: RoleData) => {
    if(data.id) {
        return request.put(API.UPDATEROLE_URL,data)
    }else {
        return request.post(API.ADDROLE_URL,data)
    }
}