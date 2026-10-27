<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import type { CatalogItem, HomeCopy } from '../types'
import HeroMarquee from './HeroMarquee.vue'
import ProductCard from './ProductCard.vue'

const props = withDefaults(defineProps<{ catalog?: CatalogItem[] }>(), {
  catalog: () => [],
})

const { frontmatter } = useData()

const home = computed(() => (frontmatter.value.home ?? {}) as HomeCopy)
const worksTab = ref<'featured' | 'all'>('featured')

const stage = computed(() =>
  [...props.catalog]
    .filter((item) => item.catalog === 'work')
    .sort((a, b) => a.order - b.order),
)
const featured = computed(() =>
  [...props.catalog]
    .filter((item) => item.featured)
    .sort((a, b) => a.order - b.order),
)
const shown = computed(() => (worksTab.value === 'featured' ? featured.value : stage.value))
</script>

<template>
  <div>
    <section class="vw-hero">
      <div class="vw-container vw-hero-grid">
        <div>
          <p class="vw-kicker">{{ home.eyebrow }}</p>
          <h1>{{ home.title }}</h1>
          <p class="vw-lede">{{ home.lede }}</p>
          <div class="vw-hero-actions">
            <NButton
              v-if="home.primary"
              type="primary"
              size="large"
              tag="a"
              :href="home.primary.link"
            >
              {{ home.primary.text }} →
            </NButton>
            <NButton
              v-if="home.secondary"
              class="vw-ghost"
              size="large"
              tag="a"
              :href="home.secondary.link"
              secondary
            >
              {{ home.secondary.text }}
            </NButton>
          </div>
          <ul v-if="home.checks?.length" class="vw-trust">
            <li v-for="item in home.checks" :key="item">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3.5 8.2 6.4 11 12.5 4.8"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
        <HeroMarquee :items="stage" />
      </div>
    </section>

    <section class="vw-section">
      <div class="vw-container">
        <div class="vw-section-head">
          <div>
            <h2>{{ home.featuredTitle || '作品' }}</h2>
            <p>{{ home.featuredLede }}</p>
          </div>
          <a class="vw-more" href="/works/">全部 →</a>
        </div>
        <div class="vw-cats" style="margin-bottom: 16px">
          <NButton
            size="small"
            round
            :type="worksTab === 'featured' ? 'primary' : 'default'"
            :secondary="worksTab !== 'featured'"
            @click="worksTab = 'featured'"
          >
            精选
          </NButton>
          <NButton
            size="small"
            round
            :type="worksTab === 'all' ? 'primary' : 'default'"
            :secondary="worksTab !== 'all'"
            @click="worksTab = 'all'"
          >
            所有作品
          </NButton>
        </div>
        <div class="vw-grid">
          <ProductCard v-for="item in shown" :key="item.url" :item="item" />
        </div>
      </div>
    </section>

    <section v-if="home.closingTitle" class="vw-closing">
      <div class="vw-container vw-closing-inner">
        <div>
          <h2>{{ home.closingTitle }}</h2>
          <p>{{ home.closingLede }}</p>
        </div>
        <NButton
          v-if="home.closingLink"
          type="primary"
          size="large"
          tag="a"
          :href="home.closingLink.link"
        >
          {{ home.closingLink.text }}
        </NButton>
      </div>
    </section>
  </div>
</template>
