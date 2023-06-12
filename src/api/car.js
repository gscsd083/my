import request from '@/utils/request'

/**
 * 获取规则列表
 * @param { page, pageSize} params
 * @returns
 */
export function getRuleListAPI(params) {
  return request({
    url: 'parking/rule/list',
    params
  })
}

/**
 * 刪除
 *  https://api-hmzs.itheima.net/v1/parking/rule/{id}
 * @returns
 */
export function delRuleListAPI(id) {
  return request({
    method: 'DELETE',
    url: `/parking/rule/${id}`
  })
}
