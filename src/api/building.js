import request from '@/utils/request'

// 登录函数
/**
 * @description: 获取企业列表
 * @param {*} data { page,pageSize,name}
 * @return {*} promise
 */
export function getBuildingListAPI(params) {
  return request({
    url: '/park/building',
    method: 'GET',
    params
  })
}

/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export function createBuildingListAPI(data) {
  return request({
    url: '/park/building',
    method: 'POST',
    data
  })
}

/**
 * 删除楼宇
 * @param {*} data
 * @returns
 */
export function delBuildingListAPI(id) {
  return request({
    url: `/park/building/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加楼宇
 * @param {*} data
 * @returns
 */
export function editBuildingListAPI(data) {
  return request({
    url: '/park/building',
    method: 'PUT',
    data
  })
}
