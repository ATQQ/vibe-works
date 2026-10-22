<script setup lang="ts">
import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import { useData, useRoute } from 'vitepress'
import { computed, ref } from 'vue'
import { useThemeMode } from '../theme-mode'
import type { VibeThemeConfig } from '../types'
import BrandMark from './BrandMark.vue'

const { theme, site } = useData()
const route = useRoute()
const { isDark, toggle } = useThemeMode()
const open = ref(false)

const config = computed(() => (theme.value ?? {}) as VibeThemeConfig)
const brand = computed(() => config.value.brand || site.value.title || 'Vibe works')
const nav = computed(
  () =>
    config.value.nav ?? [
      { text: '首页', link: '/' },
      { text: '作品', link: '/works/' },
      { text: '工具', link: '/tools/' },
    ],
)
const space = computed(() => config.value.space ?? { text: '我的空间', link: '/space/' })

function active(link: string) {
  const path = route.path
  if (link === '/') return path === '/' || path === '/index.html'
  const bare = link.replace(/\/$/, '')
  return path === link || path === bare || path.startsWith(`${bare}/`)
}
</script>

<template>
  <header class="vw-header">
    <div class="vw-container vw-header-inner">
      <a class="vw-brand" href="/" aria-label="Vibe works 首页">
        <BrandMark />
        <span>{{ brand }}</span>
      </a>
      <nav class="vw-nav" aria-label="主导航">
        <a
          v-for="item in nav"
          :key="item.link"
          :href="item.link"
          :aria-current="active(item.link) ? 'page' : undefined"
          :class="{ 'is-active': active(item.link) }"
        >
          {{ item.text }}
        </a>
      </nav>
      <div class="vw-header-actions">
        <button
          class="vw-icon-btn"
          type="button"
          :aria-pressed="isDark"
          :aria-label="isDark ? '切换到浅色' : '切换到深色'"
          @click="toggle"
        >
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z" />
          </svg>
        </button>
        <NButton class="vw-pill" type="primary" round tag="a" :href="space.link">
          {{ space.text }}
        </NButton>
        <button class="vw-icon-btn vw-menu-btn" type="button" aria-label="打开菜单" @click="open = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
    <NDrawer v-model:show="open" placement="right" :width="280">
      <NDrawerContent title="导航" closable>
        <nav class="vw-drawer-links" aria-label="移动端导航">
          <a v-for="item in nav" :key="item.link" :href="item.link" @click="open = false">{{ item.text }}</a>
          <a :href="space.link" @click="open = false">{{ space.text }}</a>
        </nav>
      </NDrawerContent>
    </NDrawer>
  </header>
</template>
