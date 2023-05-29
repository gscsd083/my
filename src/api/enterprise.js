import request from '@/utils/request'

// 登录函数
// /**
//  * @description: 获取企业列表
//  * @param {*} data { page,pageSize,name}
//  * @return {*} promise
//  */
export function getExterpriseListAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'GET',
    params
  })
}
// /**
//  * 获取行业列表
//  * @returns
//  */
export function getIndustryListAPI() {
  return request({
    url: '/park/industry'
  })
}

export function uploadAPI(data) {
  return request({
    method: 'POST',
    url: '/upload',
    data
  })
}
/**
 * 创建公司
 * @param {*} data
 * @returns
 */
export function createExterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'POST',
    data
  })
}

/**
 * 获取合同详情
 * @param {*} id
 * @returns
 */
export function getEnterpriseDetailAPI(id) {
  return request({
    url: `/park/enterprise/${id}`
  })
}

/**
 * 更新企业
 * @param {*} data
 * @returns
 */
export function updateExterpriseAPI(data) {
  return request({
    url: '/park/enterprise',
    method: 'PUT',
    data
  })
}
