<script setup lang="ts">
import { NAlert } from 'naive-ui'
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { CatalogItem, ServicesCopy } from '../types'
import ProductCard from './ProductCard.vue'
import QuotePanel from './QuotePanel.vue'
import WaitlistForm from './WaitlistForm.vue'

const props = withDefaults(defineProps<{ catalog?: CatalogItem[] }>(), {
  catalog: () => [],
})
const { frontmatter } = useData()
const copy = computed(() => (frontmatter.value.services ?? {}) as ServicesCopy)
const services = computed(() =>
  props.catalog.filter((item) => item.catalog === 'service').sort((a, b) => a.order - b.order),
)
</script>

<template>
  <div class="vw-container vw-stack">
    <header class="vw-page-intro">
      <p class="vw-crumb">
        <a href="/">首页</a>
        <span> / {{ copy.crumb || '工具' }}</span>
      </p>
      <h1>{{ copy.title }}</h1>
      <p class="vw-lede">{{ copy.lede }}</p>
    </header>
    <NAlert type="info" :bordered="false">
      {{ copy.alert }}
    </NAlert>
    <div class="vw-grid">
      <ProductCard v-for="item in services" :key="item.url" :item="item" />
    </div>
    <div class="vw-offer">
      <div>
        <h2>{{ copy.offerTitle }}</h2>
        <p class="vw-lede">{{ copy.offerLede }}</p>
        <ul class="vw-checks">
          <li v-for="point in copy.offerPoints || []" :key="point" class="vw-check">
            <i>✓</i>
            <span>{{ point }}</span>
          </li>
        </ul>
        <h3 style="margin-top: 22px">留下等候邮箱</h3>
        <p class="vw-lede">只存在这台浏览器的本地存储，刷新还在，换一台就没有。</p>
        <WaitlistForm />
      </div>
      <QuotePanel :title="copy.quoteTitle" :lines="copy.quoteLines" :total="copy.quoteTotal" />
    </div>
  </div>
</template>
