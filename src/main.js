import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'

// 注册svg
import '@/icons'

// 权限控制
import './permission'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 注册全局指令
import './directive'
// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
