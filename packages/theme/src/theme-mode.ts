import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'vw-theme'
const isDark = ref(false)

export function useThemeMode() {
  function apply(dark: boolean) {
    isDark.value = dark
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark)
    }
  }

  onMounted(() => {
    apply(document.documentElement.classList.contains('dark'))
  })

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    apply(next)
  }

  return { isDark, toggle }
}
