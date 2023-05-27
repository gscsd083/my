import request from '@/utils/request'

// 登录函数
/**
 * @description: 获取企业列表
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 */
export function getExterpriseListAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
