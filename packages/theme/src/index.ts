import type { Theme } from 'vitepress'
import { setup } from '@css-render/vue3-ssr'
import type { App } from 'vue'
import CatalogPage from './components/CatalogPage.vue'
import HomePage from './components/HomePage.vue'
import ServicesPage from './components/ServicesPage.vue'
import SpacePage from './components/SpacePage.vue'
import TideDemo from './components/TideDemo.vue'
import Layout from './layout/Layout.vue'

export type {
  CatalogItem,
  CatalogCopy,
  HomeCopy,
  ServicesCopy,
  VibeThemeConfig,
} from './types'

export { withThemeConfig } from './config'

function installCssRender(app: App) {
  const { collect } = setup(app)
  app.provide('vw-css-collect', collect)
}

const theme = {
  Layout,
  enhanceApp({ app }) {
    if (import.meta.env.SSR || typeof window === 'undefined') {
      installCssRender(app)
    }
    app.component('HomePage', HomePage)
    app.component('CatalogPage', CatalogPage)
    app.component('ServicesPage', ServicesPage)
    app.component('SpacePage', SpacePage)
    app.component('TideDemo', TideDemo)
  },
} satisfies Theme

export default theme
