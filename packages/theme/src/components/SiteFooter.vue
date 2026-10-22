<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { VibeThemeConfig } from '../types'
import BrandMark from './BrandMark.vue'

const { theme, site } = useData()
const config = computed(() => (theme.value ?? {}) as VibeThemeConfig)
const columns = computed(
  () =>
    config.value.footerColumns ?? [
      {
        title: '目录',
        links: [
          { text: '作品', link: '/works/' },
          { text: '工具', link: '/tools/' },
          { text: '我的空间', link: '/space/' },
        ],
      },
    ],
)
</script>

<template>
  <footer class="vw-footer">
    <div class="vw-container">
      <div class="vw-footer-grid">
        <div>
          <a class="vw-brand" href="/">
            <BrandMark />
            <span>{{ config.brand || site.title }}</span>
          </a>
          <p>{{ config.footerNote || '作品目录与工具占位。' }}</p>
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
      <p class="vw-copy">© {{ new Date().getFullYear() }} {{ config.brand || site.title }} · 静态演示，不含支付</p>
    </div>
  </footer>
</template>
