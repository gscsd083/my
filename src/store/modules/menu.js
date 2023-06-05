// 左侧菜单
import { contantsRoutes, resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    menuList: [...contantsRoutes] // 菜单列表 静态表 + 动态表
  },
  mutations: {
    setMenuList(state, asyncRoutes) {
      // 把静态表和动态表合并为一个数组 当前用户拥有的所有的路由表
      state.menuList = [...contantsRoutes, ...asyncRoutes]
    }
  },
  resetMenu(state) {
    state.menuList = [...contantsRoutes]
    resetRouter()
  }
}
