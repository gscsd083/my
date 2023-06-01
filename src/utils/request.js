import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
const service = axios.create({
  // baseURL: 'https://api-hmzs.itheima.net/v1',
  baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.dir(error)
    if (error.response.data.msg) {
      Message({
        type: 'warning',
        message: error.response.data.msg
      })
    }
    if (error.response.status === 401) {
      //  清空用户数据
      store.commit('user/removeToken')
      //  跳转到登录
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
