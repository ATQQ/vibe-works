import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'vw-theme'

export function useThemeMode() {
  const isDark = ref(false)

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
