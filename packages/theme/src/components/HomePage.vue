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
    .filter((item) => item.featured != null)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0)),
)
const shown = computed(() => (worksTab.value === 'featured' ? featured.value : stage.value))

const perkIcons: Record<string, string> = {
  filter:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="12" cy="16" r="3"/></svg>',
  doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  play: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/></svg>',
  shield:
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  link: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 5"/><path d="M14 11a5 5 0 0 0-7.07 0L4.8 13.12a5 5 0 0 0 7.07 7.07L13 19"/></svg>',
  chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/></svg>',
}

const perkFallback = ['filter', 'doc', 'play', 'shield']

function perkIcon(icon: string | undefined, index: number) {
  const key = icon || perkFallback[index % perkFallback.length]
  return perkIcons[key] || perkIcons.filter
}
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

    <section v-if="home.perks?.length" class="vw-perks-wrap">
      <div class="vw-container">
        <ul class="vw-perks">
          <li v-for="(perk, index) in home.perks" :key="perk.title">
            <span class="vw-perk-icon" aria-hidden="true" v-html="perkIcon(perk.icon, index)" />
            <strong>{{ perk.title }}</strong>
            <p>{{ perk.text }}</p>
          </li>
        </ul>
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
