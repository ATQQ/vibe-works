/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare global {
  /** Injected by `withThemeConfig` via `vite.define` */
  const __VW_THEME_INFO__: { label: string; link: string } | undefined
}

declare module 'vue' {
  interface GlobalComponents {
    Content: import('vue').Component
  }
}

export {}
