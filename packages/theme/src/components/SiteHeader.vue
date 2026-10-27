<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useData, useRoute } from 'vitepress'
import { computed, onBeforeUnmount, ref, useSlots, watch } from 'vue'
import { useThemeMode } from '../theme-mode'
import type { SocialLink, VibeThemeConfig } from '../types'
import BrandMark from './BrandMark.vue'
import { resolveSocialIcon } from './SocialIcons'

const { theme, site } = useData()
const route = useRoute()
const slots = useSlots()
const { isDark, toggle } = useThemeMode()
const open = ref(false)

const config = computed(() => (theme.value ?? {}) as VibeThemeConfig)
const brand = computed(() => config.value.brand || site.value.title || 'Vibe works')
const logo = computed(() => config.value.logo?.trim() || '')
const logoLink = computed(() => config.value.logoLink?.trim() || '/')
const nav = computed(
  () =>
    config.value.nav ?? [
      { text: '首页', link: '/' },
      { text: '全部', link: '/works/' },
    ],
)
const space = computed(() => config.value.space)
const socialLinks = computed(() =>
  (config.value.socialLinks ?? []).map((item) => ({
    ...item,
    resolvedIcon: resolveSocialIcon(item.icon),
  })),
)
const hasExtra = computed(() => Boolean(slots['nav-bar-extra']?.()))

function active(link: string) {
  const path = route.path
  if (link === '/') return path === '/' || path === '/index.html'
  const bare = link.replace(/\/$/, '')
  return path === link || path === bare || path.startsWith(`${bare}/`)
}

function socialLabel(item: SocialLink) {
  if (item.ariaLabel) return item.ariaLabel
  if (typeof item.icon === 'string') {
    if (/^https?:\/\//i.test(item.icon) || item.icon.startsWith('/') || item.icon.includes('/')) {
      try {
        return new URL(item.link, 'https://local.invalid').hostname || '外链'
      } catch {
        return '外链'
      }
    }
    return item.icon
  }
  return '外链'
}

function closeMenu() {
  open.value = false
}

watch(
  () => route.path,
  () => {
    open.value = false
  },
)

watch(open, (value) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('vw-nav-open', value)
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.remove('vw-nav-open')
})
</script>

<template>
  <header class="vw-header">
    <div class="vw-container vw-header-inner">
      <a
        class="vw-brand"
        :href="logoLink"
        :aria-label="brand"
        :target="logoLink.startsWith('http') ? '_blank' : undefined"
        :rel="logoLink.startsWith('http') ? 'noopener noreferrer' : undefined"
      >
        <BrandMark :src="logo || undefined" :alt="brand" />
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
        <a
          v-for="item in socialLinks"
          :key="item.link"
          class="vw-icon-btn vw-desktop-only"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="socialLabel(item)"
        >
          <span class="vw-social-icon">
            <img
              v-if="item.resolvedIcon.kind === 'img'"
              :src="item.resolvedIcon.value"
              alt=""
              width="16"
              height="16"
            />
            <span v-else aria-hidden="true" v-html="item.resolvedIcon.value" />
          </span>
        </a>
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
        <div v-if="hasExtra" class="vw-desktop-only vw-header-extra">
          <slot name="nav-bar-extra" />
        </div>
        <NButton
          v-if="space"
          class="vw-pill vw-desktop-only"
          type="primary"
          round
          tag="a"
          :href="space.link"
        >
          {{ space.text }}
        </NButton>
        <button
          class="vw-icon-btn vw-menu-btn"
          type="button"
          :aria-expanded="open"
          :aria-label="open ? '关闭菜单' : '打开菜单'"
          @click="open = !open"
        >
          <svg v-if="!open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

  </header>

  <!-- Teleport out of header: backdrop-filter creates a containing block that clips fixed children -->
  <Teleport to="body">
    <div v-if="open" class="vw-nav-screen" role="dialog" aria-modal="true" aria-label="菜单">
      <div class="vw-container vw-nav-screen-inner">
        <nav class="vw-nav-screen-links" aria-label="移动端导航">
          <a
            v-for="item in nav"
            :key="item.link"
            :href="item.link"
            :class="{ 'is-active': active(item.link) }"
            @click="closeMenu"
          >
            {{ item.text }}
          </a>
          <a v-if="space" :href="space.link" @click="closeMenu">{{ space.text }}</a>
          <div v-if="hasExtra" class="vw-nav-screen-extra" @click="closeMenu">
            <slot name="nav-bar-extra" />
          </div>
        </nav>

        <div class="vw-nav-screen-appearance">
          <span>外观</span>
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
        </div>

        <div v-if="socialLinks.length" class="vw-nav-screen-socials">
          <a
            v-for="item in socialLinks"
            :key="item.link"
            class="vw-icon-btn"
            :href="item.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="socialLabel(item)"
            @click="closeMenu"
          >
            <span class="vw-social-icon">
              <img
                v-if="item.resolvedIcon.kind === 'img'"
                :src="item.resolvedIcon.value"
                alt=""
                width="16"
                height="16"
              />
              <span v-else aria-hidden="true" v-html="item.resolvedIcon.value" />
            </span>
          </a>
        </div>
      </div>
    </div>
  </Teleport>
</template>
