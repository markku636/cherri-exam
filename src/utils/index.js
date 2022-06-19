
//  函数防抖（debounce）
let timeoutDebounce = null
export function debounce(fn, wait) {
  if (timeoutDebounce !== null) clearTimeout(timeoutDebounce)
  timeoutDebounce = setTimeout(fn, wait)
}

// 將物件捲動到最下面
export function scrollElementToBottom(elementId) {
  var ele = document.getElementById(elementId)

  if (ele) {
    ele.scrollTo({ top: ele.scrollHeight, behavior: 'smooth' })
  }
}
