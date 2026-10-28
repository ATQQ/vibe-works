<script setup lang="ts">
import { NButton, NEmpty, NInput } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, ref, watch } from 'vue'
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
const tag = ref('全部标签')

const pool = computed(() =>
  props.catalog.filter((item) => scope.value === 'all' || item.catalog === scope.value),
)

const categories = computed(() => [
  '所有作品',
  ...Array.from(new Set(pool.value.map((item) => item.category).filter(Boolean))),
])

const inCategory = computed(() =>
  pool.value.filter((item) => category.value === '所有作品' || item.category === category.value),
)

const tags = computed(() => {
  const names = new Set<string>()
  for (const item of inCategory.value) {
    for (const t of item.tags) {
      const name = String(t).trim()
      if (name) names.add(name)
    }
  }
  return ['全部标签', ...Array.from(names).sort((a, b) => a.localeCompare(b, 'zh'))]
})

watch(category, () => {
  if (tag.value !== '全部标签' && !tags.value.includes(tag.value)) {
    tag.value = '全部标签'
  }
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return inCategory.value.filter((item) => {
    if (tag.value !== '全部标签' && !item.tags.includes(tag.value)) return false
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
      <div class="vw-filter-rows">
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
        <div v-if="tags.length > 1" class="vw-cats vw-tags-filter">
          <NButton
            v-for="item in tags"
            :key="item"
            size="small"
            round
            :type="item === tag ? 'primary' : 'default'"
            :secondary="item !== tag"
            @click="tag = item"
          >
            {{ item }}
          </NButton>
        </div>
      </div>
    </div>
    <div v-if="filtered.length" class="vw-grid">
      <ProductCard v-for="item in filtered" :key="item.url" :item="item" />
    </div>
    <NEmpty v-else description="没有符合的条目，换个词、分类或标签试试。" />
  </div>
</template>
