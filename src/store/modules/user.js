import { loginAPI, getProfileAPI } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || '',
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 存入cook
      setToken(token)
    },
    removeToken(state) {
      removeToken()
      state.token = ''
      state.userInfo = {}
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async asyncLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password })
      ctx.commit('setToken', res.data.token)
    },
    async asyncGetUserInfo(ctx) {
      const res = await getProfileAPI()
      ctx.commit('setUserInfo', res.data)
      return res.data.permissions
    }
  }
}
