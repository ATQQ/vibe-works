import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'vw-waitlist-email'

export function useWaitlist() {
  const draft = ref('')
  const saved = ref('')
  const message = ref('')

  onMounted(() => {
    saved.value = localStorage.getItem(STORAGE_KEY) ?? ''
    if (!draft.value) draft.value = saved.value
  })

  function save(value = draft.value) {
    const next = value.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      message.value = '邮箱格式还不对。'
      return false
    }
    localStorage.setItem(STORAGE_KEY, next)
    saved.value = next
    draft.value = next
    message.value = '已记在这台浏览器里，不会发到服务器。'
    return true
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY)
    saved.value = ''
    draft.value = ''
    message.value = '已从这台浏览器移除。'
  }

  return { draft, saved, message, save, clear }
}
