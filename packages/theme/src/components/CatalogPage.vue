<script setup lang="ts">
import { NButton, NEmpty, NInput } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import type { CatalogCopy, CatalogItem } from '../types'
import ProductCard from './ProductCard.vue'

const props = withDefaults(
  defineProps<{ catalog?: CatalogItem[]; scope?: 'work' | 'service' | 'all' }>(),
  { catalog: () => [], scope: undefined },
)

const { frontmatter } = useData()
const copy = computed(() => (frontmatter.value.catalog ?? {}) as CatalogCopy)
const scope = computed(() => props.scope || copy.value.scope || 'all')
const query = ref('')
const category = ref('所有作品')

const pool = computed(() =>
  props.catalog.filter((item) => scope.value === 'all' || item.catalog === scope.value),
)

const categories = computed(() => [
  '所有作品',
  ...Array.from(new Set(pool.value.map((item) => item.category).filter(Boolean))),
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return pool.value.filter((item) => {
    const inCat = category.value === '所有作品' || item.category === category.value
    if (!inCat) return false
    if (!q) return true
    const haystack = [item.title, item.summary, item.category, ...item.tags]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
})
</script>

<template>
  <div class="vw-container" style="padding-bottom: 48px">
    <header class="vw-page-intro">
      <p class="vw-crumb">
        <a href="/">首页</a>
        <span> / {{ copy.crumb || '目录' }}</span>
      </p>
      <h1>{{ copy.title || '目录' }}</h1>
      <p class="vw-lede">{{ copy.lede }}</p>
    </header>
    <div class="vw-filters">
      <NInput v-model:value="query" clearable placeholder="搜索名称、标签" />
      <div class="vw-cats">
        <NButton
          v-for="item in categories"
          :key="item"
          size="small"
          round
          :type="item === category ? 'primary' : 'default'"
          :secondary="item !== category"
          @click="category = item"
        >
          {{ item }}
        </NButton>
      </div>
    </div>
    <p class="vw-result-meta">共 {{ filtered.length }} 件 · 筛选只发生在这台浏览器里</p>
    <div v-if="filtered.length" class="vw-grid">
      <ProductCard v-for="item in filtered" :key="item.url" :item="item" />
    </div>
    <NEmpty v-else description="没有符合的条目，换个词或分类试试。" />
  </div>
</template>
