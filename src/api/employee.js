import request from '@/utils/request'

/**
 * @description: 用户获取用户列表
 *  https://api-hmzs.itheima.net/v1/park/sys/user
 */
export function getUserListAPI(params) {
  return request({
    url: '/park/sys/user',
    method: 'GET',
    params
  })
}

/**
 * 添加员工
 * @returns
 */
export function createEmployeeAPI(data) {
  return request({
    url: `/park/sys/user`,
    method: 'POST',
    data
  })
}

/**
 * 编辑员工
 * @returns
 *  https://api-hmzs.itheima.net/v1/park/sys/user
 */
export function editEmployeeAPI(data) {
  return request({
    url: `/park/sys/user`,
    method: 'PUT',
    data
  })
}

/**
 * 重置密码
 * @returns
 *   https://api-hmzs.itheima.net/v1/park/sys/user/resetPwd
 */
export function resetEmployeeAPI(data) {
  return request({
    url: `/park/sys/user/resetPwd`,
    method: 'PUT',
    data
  })
}

/**
 * 删除员工
 * @returns
 */
export function delEmployeeAPI(id) {
  return request({
    url: `/park/sys/user/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取用户详情
 * @returns
 */
export function getEmployeeAllAPI(id) {
  return request({
    url: `/park/sys/user/${id}`,
    method: 'GET'
  })
}

