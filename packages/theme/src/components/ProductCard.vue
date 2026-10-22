<script setup lang="ts">
import { NButton, NTag } from 'naive-ui'
import type { CatalogItem } from '../types'
import CoverArt from './CoverArt.vue'

withDefaults(
  defineProps<{
    item: CatalogItem
    variant?: 'full' | 'mini'
  }>(),
  { variant: 'full' },
)

const metrics = [
  { key: 'downloads', label: '预览', icon: '↓' },
  { key: 'views', label: '查看', icon: '◎' },
  { key: 'rating', label: '评分', icon: '★' },
  { key: 'users', label: '试用', icon: '◌' },
] as const
</script>

<template>
  <article v-if="variant === 'mini'" class="vw-mini">
    <a :href="item.url" :aria-label="item.title">
      <CoverArt :title="item.title" :caption="item.category" :accent="item.accent" />
    </a>
    <div class="vw-mini-body">
      <div class="vw-mini-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">案例推荐</span>
      </div>
      <h3><a :href="item.url">{{ item.title }}</a></h3>
      <p class="vw-clamp">{{ item.summary }}</p>
      <div class="vw-platforms">
        <span v-for="platform in item.platforms" :key="platform">{{ platform }}</span>
      </div>
      <div class="vw-mini-foot">
        <a :href="item.url">详情 →</a>
        <strong class="vw-price">{{ item.priceLabel }}</strong>
      </div>
    </div>
  </article>

  <article v-else class="vw-card">
    <a :href="item.url" :aria-label="item.title">
      <CoverArt :title="item.title" :caption="item.category" :accent="item.accent" />
    </a>
    <div class="vw-card-body">
      <div class="vw-card-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">✦ 案例推荐</span>
      </div>
      <h3><a :href="item.url">{{ item.title }}</a></h3>
      <p class="vw-clamp">{{ item.summary }}</p>
      <div class="vw-platforms">
        <span v-for="platform in item.platforms" :key="platform">▣ {{ platform }}</span>
      </div>
      <div class="vw-metrics">
        <div v-for="metric in metrics" :key="metric.key">
          <b><span aria-hidden="true">{{ metric.icon }}</span>{{ item.stats[metric.key] }}</b>
          <small>{{ metric.label }}</small>
        </div>
      </div>
      <div v-if="item.tags.length" class="vw-tags">
        <NTag
          v-for="tag in item.tags"
          :key="tag"
          size="small"
          round
          :bordered="false"
        >
          {{ tag }}
        </NTag>
      </div>
      <div class="vw-card-foot">
        <div>
          <strong class="vw-price">{{ item.priceLabel }}</strong>
          <span v-if="item.trial" class="vw-trial">{{ item.trial }}</span>
        </div>
        <NButton type="primary" tag="a" :href="item.url" size="medium">
          查看详情 →
        </NButton>
      </div>
    </div>
  </article>
</template>
