import request from '@/utils/request'

/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @returns promise
 */

export function loginAPI(data) {
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns
 */
export function getProfileAPI() {
  return request({
    url: '/park/user/profile',
    method: 'GET'
  })
}
