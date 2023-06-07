// 放置全局指令
import Vue from 'vue'
import store from '@/store'
Vue.directive('auth-btn', {
  inserted(el, binding) {
    const btnPerms = binding.value
    const permissions = store.state.user.userInfo.permissions
    if (permissions[0] === '*:*:*') return
    if (!permissions.includes(btnPerms)) {
      el.remove()
    }
  }
})
