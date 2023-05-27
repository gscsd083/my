// 放置所有和权限控制相关的代码

import router from './router'
import { getToken } from './utils/auth'
const WHITF_LIST = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (WHITF_LIST.includes(to.path)) {
      next()
    } else {
      router.push('/login')
    }
  }
})
