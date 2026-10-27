<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { FooterTextLink, LinkItem, VibeThemeConfig } from '../types'
import BrandMark from './BrandMark.vue'
import FooterChannels from './FooterChannels.vue'

const { theme, site } = useData()
const config = computed(() => (theme.value ?? {}) as VibeThemeConfig)
const columns = computed(
  () =>
    config.value.footerColumns ?? [
      {
        title: '目录',
        links: [
          { text: '首页', link: '/' },
          { text: '全部', link: '/works/' },
        ],
      },
    ],
)
const brand = computed(() => config.value.brand || site.value.title || 'Vibe works')
const logo = computed(() => config.value.logo?.trim() || '')
const logoLink = computed(() => config.value.logoLink?.trim() || '/')
const logoExternal = computed(() => logoLink.value.startsWith('http'))

function asTextLink(value: string | FooterTextLink | undefined): FooterTextLink | null {
  if (!value) return null
  if (typeof value === 'string') {
    const text = value.trim()
    return text ? { text } : null
  }
  const text = String(value.text ?? '').trim()
  if (!text) return null
  return { text, link: value.link }
}

const bar = computed(() => config.value.footerBar)
const copyright = computed(() => asTextLink(bar.value?.copyright))
const beian = computed(() => asTextLink(bar.value?.beian))
const barLinks = computed(() => (Array.isArray(bar.value?.links) ? (bar.value!.links as LinkItem[]) : []))
const showBar = computed(() => Boolean(copyright.value || beian.value || barLinks.value.length))
</script>

<template>
  <footer class="vw-footer">
    <div class="vw-container vw-footer-main">
      <div class="vw-footer-grid">
        <div>
          <a
            class="vw-brand"
            :href="logoLink"
            :aria-label="brand"
            :target="logoExternal ? '_blank' : undefined"
            :rel="logoExternal ? 'noopener noreferrer' : undefined"
          >
            <BrandMark :src="logo || undefined" :alt="brand" />
            <span>{{ brand }}</span>
          </a>
          <p>{{ config.footerNote || '作品展示与介绍。' }}</p>
          <FooterChannels :channels="config.footerChannels" :label="config.footerChannelsLabel" />
        </div>
        <div v-for="column in columns" :key="column.title">
          <h3>{{ column.title }}</h3>
          <ul>
            <li v-for="link in column.links" :key="link.link">
              <a :href="link.link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="showBar" class="vw-footer-bar">
      <div class="vw-container vw-footer-bar-inner">
        <div class="vw-footer-bar-start">
          <a v-if="copyright?.link" class="vw-footer-bar-copy" :href="copyright.link">{{ copyright.text }}</a>
          <span v-else-if="copyright" class="vw-footer-bar-copy">{{ copyright.text }}</span>
        </div>
        <div class="vw-footer-bar-center">
          <a v-if="beian?.link" class="vw-footer-bar-beian" :href="beian.link" target="_blank" rel="noopener noreferrer">
            {{ beian.text }}
          </a>
          <span v-else-if="beian" class="vw-footer-bar-beian">{{ beian.text }}</span>
        </div>
        <nav v-if="barLinks.length" class="vw-footer-bar-links" aria-label="页脚链接">
          <a v-for="link in barLinks" :key="link.link" :href="link.link">{{ link.text }}</a>
        </nav>
      </div>
    </div>
  </footer>
</template>
