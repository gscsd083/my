export function addDisabled(threeList) {
  threeList.forEach(item => {
    item.disabled = true
    if (item.children && item.children.length > 0) {
      addDisabled(item.children)
    }
  })
}
