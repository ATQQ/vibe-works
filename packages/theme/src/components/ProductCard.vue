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
</script>

<template>
  <article v-if="variant === 'mini'" class="vw-mini">
    <a :href="item.url" :aria-label="item.title">
      <CoverArt
        :title="item.title"
        :caption="item.category"
        :accent="item.accent"
        :cover="item.cover"
        :icon="item.icon"
      />
    </a>
    <div class="vw-mini-body">
      <div class="vw-mini-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">案例推荐</span>
      </div>
      <h3><a :href="item.url">{{ item.title }}</a></h3>
      <p class="vw-clamp">{{ item.summary }}</p>
      <div v-if="item.platforms?.length" class="vw-platforms">
        <span v-for="platform in item.platforms" :key="platform">{{ platform }}</span>
      </div>
      <div class="vw-mini-foot">
        <a :href="item.url">详情 →</a>
      </div>
    </div>
  </article>

  <article v-else class="vw-card">
    <a :href="item.url" :aria-label="item.title">
      <CoverArt
        :title="item.title"
        :caption="item.category"
        :accent="item.accent"
        :cover="item.cover"
        :icon="item.icon"
      />
    </a>
    <div class="vw-card-body">
      <div class="vw-card-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">✦ 案例推荐</span>
      </div>
      <h3><a :href="item.url">{{ item.title }}</a></h3>
      <p class="vw-clamp">{{ item.summary }}</p>
      <div v-if="item.platforms?.length" class="vw-platforms">
        <span v-for="platform in item.platforms" :key="platform">▣ {{ platform }}</span>
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
        <span class="vw-card-foot-spacer" />
        <NButton type="primary" tag="a" :href="item.url" size="medium">
          查看详情 →
        </NButton>
      </div>
    </div>
  </article>
</template>
