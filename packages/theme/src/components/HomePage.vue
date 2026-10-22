<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useData } from 'vitepress'
import { computed } from 'vue'
import type { CatalogItem, HomeCopy } from '../types'
import ProductCard from './ProductCard.vue'
import QuotePanel from './QuotePanel.vue'

const props = withDefaults(defineProps<{ catalog?: CatalogItem[] }>(), {
  catalog: () => [],
})

const { frontmatter } = useData()

const home = computed(() => (frontmatter.value.home ?? {}) as HomeCopy)

const stage = computed(() =>
  [...props.catalog]
    .filter((item) => item.catalog === 'work')
    .sort((a, b) => a.order - b.order)
    .slice(0, 6),
)
const leftCards = computed(() => stage.value.filter((_, index) => index % 2 === 0))
const rightCards = computed(() => stage.value.filter((_, index) => index % 2 === 1))
const featured = computed(() =>
  [...props.catalog]
    .filter((item) => item.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3),
)
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
        <div class="vw-hero-stage" aria-label="精选作品">
          <div class="vw-hero-col">
            <ProductCard v-for="item in leftCards" :key="item.url" :item="item" variant="mini" />
          </div>
          <div class="vw-hero-col">
            <ProductCard v-for="item in rightCards" :key="item.url" :item="item" variant="mini" />
          </div>
        </div>
      </div>
    </section>

    <section class="vw-section">
      <div class="vw-container">
        <div class="vw-section-head">
          <div>
            <h2>{{ home.featuredTitle }}</h2>
            <p>{{ home.featuredLede }}</p>
          </div>
          <a v-if="home.featuredMore" class="vw-more" :href="home.featuredMore.link">
            {{ home.featuredMore.text }} →
          </a>
        </div>
        <div class="vw-grid">
          <ProductCard v-for="item in featured" :key="item.url" :item="item" />
        </div>
      </div>
    </section>

    <section class="vw-steps">
      <div class="vw-container">
        <h2>{{ home.stepsTitle }}</h2>
        <p class="vw-lede">{{ home.stepsLede }}</p>
        <ol>
          <li v-for="(step, index) in home.steps || []" :key="step.title">
            <span class="dot" />
            <em>{{ String(index + 1).padStart(2, '0') }}</em>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="vw-offer-wrap">
      <div class="vw-container">
        <div class="vw-offer">
          <div>
            <h2>{{ home.offerTitle }}</h2>
            <p class="vw-lede">{{ home.offerLede }}</p>
            <ul class="vw-checks">
              <li v-for="point in home.offerPoints || []" :key="point" class="vw-check">
                <i>✓</i>
                <span>{{ point }}</span>
              </li>
            </ul>
            <a v-if="home.offerLink" class="vw-link" :href="home.offerLink.link">
              {{ home.offerLink.text }} →
            </a>
          </div>
          <QuotePanel
            :title="home.quoteTitle"
            :lines="home.quoteLines"
            :total="home.quoteTotal"
          />
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
