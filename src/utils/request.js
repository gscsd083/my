import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

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
    return Promise.reject(error)
  }
)

export default service
