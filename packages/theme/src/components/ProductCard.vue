<script setup lang="ts">
import { NTag } from 'naive-ui'
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
  <a
    v-if="variant === 'mini'"
    class="vw-mini"
    :href="item.url"
    :aria-label="item.title"
  >
    <CoverArt
      :title="item.title"
      :caption="item.category"
      :accent="item.accent"
      :cover="item.cover"
      :icon="item.icon"
    />
    <div class="vw-mini-body">
      <div class="vw-mini-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">案例推荐</span>
      </div>
      <h3>{{ item.title }}</h3>
      <p class="vw-clamp">{{ item.summary }}</p>
      <div v-if="item.platforms?.length" class="vw-platforms">
        <span v-for="platform in item.platforms" :key="platform">{{ platform }}</span>
      </div>
    </div>
  </a>

  <a
    v-else
    class="vw-card"
    :href="item.url"
    :aria-label="item.title"
  >
    <CoverArt
      :title="item.title"
      :caption="item.category"
      :accent="item.accent"
      :cover="item.cover"
      :icon="item.icon"
    />
    <div class="vw-card-body">
      <div class="vw-card-kicker">
        <span>{{ item.category }}</span>
        <span v-if="item.recommend" class="vw-recommend">✦ 案例推荐</span>
      </div>
      <h3>{{ item.title }}</h3>
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
    </div>
  </a>
</template>
