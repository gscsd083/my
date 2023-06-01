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

