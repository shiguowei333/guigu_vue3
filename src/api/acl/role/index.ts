import request from '@/utils/requests'
import type { RoleResponseData } from './type'

enum API {
    ALLROLE_URL = '/admin/acl/role/'
}

export const reqAllRoleList = (page: number,limit: number,roleName: string) => request.get<any,RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`)