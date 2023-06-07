import request from '@/utils/request'

/**
 * 获取列表
 *  https://api-hmzs.itheima.net/v1/park/propertyfee
 */
export function getPropetyListAPI(params) {
  return request({
    url: '/park/propertyfee',
    method: 'GET',
    params
  })
}

/**
 * 查询所有企业
 *   https://api-hmzs.itheima.net/v1/park/all/enterprise
 */
export function getEnterpriseListAllAPI() {
  return request({
    url: '/park/all/enterprise',
    method: 'GET'
  })
}

/**
 * 查询所有楼宇
 *   https://api-hmzs.itheima.net/v1/park/all/building
 */
export function getBuildingListAllAPI() {
  return request({
    url: '/park/all/building',
    method: 'GET'
  })
}

/**
 * 预算金额
 *  https://api-hmzs.itheima.net/v1/park/propertyfee/pre/payment
 */
export function getPaymentListAllAPI(data) {
  return request({
    url: '/park/propertyfee/pre/payment',
    method: 'POST',
    data
  })
}

/**
 * 添加账单
 * https://api-hmzs.itheima.net/v1/park/propertyfee
 */
export function editPropertyfeeListAPI(data) {
  return request({
    url: '/park/propertyfee',
    method: 'POST',
    data
  })
}

/**
 * 删除账单
 * @param {*} id
 * @returns  https://api-hmzs.itheima.net/v1/park/propertyfee/{id}
 */
export function delPropertyfeeListAPI(id) {
  return request({
    url: `/park/propertyfee/${id}`,
    method: 'DELETE'
  })
}
