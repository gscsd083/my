import request from '@/utils/request'

/**
 * @description: 获取一体杆列表
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 *  https://api-hmzs.itheima.net/v1/pole/info/list
 */
export function getpoleAPI(params) {
  return request({
    url: '/pole/info/list',
    method: 'GET',
    params
  })
}

/**
 * @description: 获取区域列表
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 *  https://api-hmzs.itheima.net/v1/pole/info/list
 */
export function getpoleListAPI() {
  return request({
    url: '/parking/area/dropList',
    method: 'GET'
  })
}

/**
 * @description: 添加
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 *   https://api-hmzs.itheima.net/v1/pole/info
 */
export function createRouListAPI(data) {
  return request({
    url: '/pole/info',
    method: 'POST',
    data
  })
}

/**
 * @description: 删除
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 *  https://api-hmzs.itheima.net/v1/pole/info/{ids}
 */
export function delRouListAPI(ids) {
  return request({
    url: `/pole/info/${ids}`,
    method: 'DELETE'
  })
}

/**
 * @description: 编辑
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 *  h https://api-hmzs.itheima.net/v1/pole/info
 */
export function infoRouListAPI(data) {
  return request({
    url: '/pole/info',
    method: 'PUT',
    data
  })
}

