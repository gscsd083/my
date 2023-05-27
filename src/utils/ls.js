// 存本地存储
export function lsSet(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

// 取
export function lsGet(key) {
  return JSON.parse(localStorage.getItem(key))
}

// 删
export function lsRemove(key) {
  return localStorage.removeItem(key)
}
