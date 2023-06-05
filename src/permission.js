// 放置所有和权限控制相关的代码
import { asyncRoutes } from '@/router/asyncRoutes'
import store from './store'
import router from './router'
import { getToken } from './utils/auth'
const WHITF_LIST = ['/login', '/404']
console.log('所有的动态路由', asyncRoutes)

function getFirstPerms(perms) {
  const list = perms.map(item => {
    const _arr = item.split(':')
    return _arr[0]
  })
  return [...new Set(list)]
}
function getSecondPerms(perms) {
  const list = perms.map(item => {
    const _arr = item.split(':')
    return `${_arr[0]}:${_arr[1]}`
  })
  return [...new Set(list)]
}

// 过滤动态路由
/**
 * 使用权限标识过滤动态路由表
 * @param {*} asyncRoutes  未经过处理的动态路由表
 * @param {*} firstPerms  一级路由权限标识
 * @param {*} secondPerms 二级路由权限标识
 */
function filterRoutes(asyncRoutes, firstPerms, secondPerms) {
  // 增加一个管理员的单独处理逻辑：如果是管理员的权限点 ['*:*:*'] 把所有的动态路由整体返回
  if (firstPerms.includes('*')) {
    return asyncRoutes
  }
  // 3.1 一级路由过滤处理
  const filterRoute = asyncRoutes.filter(route => {
    return firstPerms.includes(route.permission)
  })
  console.log(filterRoute)
  // 3.2 二级路由过滤处理
  const filterFinishedRoutes = filterRoute.map(route => {
    return {
      ...route,
      children: route.children.filter(item => secondPerms.includes(item.permission))
    }
  })
  return filterFinishedRoutes
}

router.beforeEach(async(to, from, next) => {
  const token = getToken()
  if (token) {
    next()
    if (store.state.user.userInfo.id) return
    const perms = await store.dispatch('user/asyncGetUserInfo')
    // console.log('权限', perms)
    const firstPerms = getFirstPerms(perms)
    // console.log(firstRoutes)
    const secondPerms = getSecondPerms(perms)
    // console.log(secondRoutes)
    const filterFinishedRoutes = filterRoutes(asyncRoutes, firstPerms, secondPerms)
    console.log(filterFinishedRoutes)
    filterFinishedRoutes.forEach(route => {
      router.addRoute(route)
    })
    store.commit('menu/setMenuList', filterFinishedRoutes)
  } else {
    if (WHITF_LIST.includes(to.path)) {
      next()
    } else {
      router.push('/login')
    }
  }
})
