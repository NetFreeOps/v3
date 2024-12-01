import { ref, onMounted, onUnmounted } from 'vue'
import { debounce, observerDomResize } from './index'

export function useAutoResize(refKey) {
  const width = ref(0)
  const height = ref(0)
  let dom = null
  let observer = null

  const initWH = () => {
    if (!dom) return
    width.value = dom.clientWidth
    height.value = dom.clientHeight
  }

  const resize = debounce(100, initWH)

  const addObserver = () => {
    if (!dom) return
    observer = observerDomResize(dom, resize)
    window.addEventListener('resize', resize)
  }

  const removeObserver = () => {
    if (!dom) return
    observer && observer.disconnect()
    observer = null
    window.removeEventListener('resize', resize)
  }

  onMounted(() => {
    dom = document.querySelector(`.${refKey.value}`)
    if (!dom) return
    initWH()
    addObserver()
  })

  onUnmounted(() => {
    removeObserver()
  })

  return {
    width,
    height
  }
}