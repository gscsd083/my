import { loginAPI } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
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
    }
  },
  actions: {
    async asyncLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password })
      ctx.commit('setToken', res.data.token)
    }
  }
}
