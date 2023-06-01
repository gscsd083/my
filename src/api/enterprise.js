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

/**
 * 获取合同列表
 * @param {*} id
 * @returns
 */
export function getRentListAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`
  })
}

/**
 * 删除企业
 * @param {*} id
 * @returns
 */
export function delExterpriseAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取楼宇列表
 * @param {*} id
 * @returns
 */
export function getRentBuildListAPI() {
  return request({
    url: '/park/rent/building'
  })
}

/**
 * 创建合同
 * @param {*}
 * @returns
 */
export function createRentAPI(data) {
  return request({
    url: '/park/enterprise/rent',
    method: 'POST',
    data
  })
}

/**
 * 退租
 * @param {合同id} rentId
 * @returns
 */

export function outRentAPI(rentId) {
  return request({
    url: `/park/enterprise/rent/${rentId}`,
    method: 'PUT'
  })
}

/**
 * 删除合同
 * @param {合同id} rentId
 * @returns
 */

export function delRentAPI(rentId) {
  return request({
    url: `/park/enterprise/rent/${rentId}`,
    method: 'DELETE'
  })
}
