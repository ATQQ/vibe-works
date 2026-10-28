<script setup lang="ts">
import { NButton, NModal, NTag } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import type { ActionItem, PlatformInput, RailCard } from '../types'
import wechatUrl from '../assets/channels/wechat.svg?url'
import PlatformBadges from './PlatformBadges.vue'
import { resolveSocialSvg, socialSvgs } from './SocialIcons'

const { frontmatter } = useData()
const page = computed(() => frontmatter.value)

const title = computed(() => String(page.value.title ?? ''))
const summary = computed(() => String(page.value.summary ?? ''))
const category = computed(() => String(page.value.category ?? ''))
const accent = computed(() => String(page.value.accent ?? 'mint'))
const icon = computed(() => (page.value.icon ? String(page.value.icon) : ''))
const platforms = computed(() =>
  Array.isArray(page.value.platforms) ? (page.value.platforms as PlatformInput[]) : [],
)
const tags = computed(() => (Array.isArray(page.value.tags) ? page.value.tags.map(String) : []))
const actions = computed(() => (Array.isArray(page.value.actions) ? (page.value.actions as ActionItem[]) : []))

const railCard = computed(() => {
  const raw = page.value.railCard as RailCard | undefined
  if (!raw || typeof raw !== 'object') return null
  const image = String(raw.image ?? raw.qrImage ?? '').trim()
  if (!image) return null
  return {
    title: String(raw.title ?? '').trim(),
    text: String(raw.text ?? '').trim(),
    image,
    caption: String(raw.caption ?? '').trim(),
    icon: String(raw.icon ?? '').trim(),
  }
})

const showRail = computed(() => Boolean(actions.value.length || railCard.value))

const railIconSrc = computed(() => {
  const value = railCard.value?.icon
  if (!value) return wechatUrl
  if (value === 'wechat' || value === 'weixin' || value === '微信') return wechatUrl
  if (/^https?:\/\//.test(value) || value.startsWith('/')) return value
  return wechatUrl
})

function formatDay(raw: unknown) {
  if (!raw) return ''
  const date = new Date(String(raw))
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

const launched = computed(() => formatDay(page.value.date))
const updated = computed(() => formatDay(page.value.updated))

const calendarSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>'
const refreshSvg =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16"/><path d="M20 20v-4h-4"/></svg>'

const meta = computed(() =>
  [
    page.value.version ? `v${page.value.version}` : '',
    page.value.size ? String(page.value.size) : '',
    page.value.lang ? String(page.value.lang) : '',
  ].filter(Boolean),
)

const iconIsUrl = computed(() => /^https?:\/\//.test(icon.value) || icon.value.startsWith('/'))
const iconGlyph = computed(() => {
  if (!icon.value || iconIsUrl.value) return title.value.slice(0, 1)
  return icon.value
})

const modalOpen = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

function actionIcon(name?: string) {
  if (!name) return socialSvgs.link
  return resolveSocialSvg(name)
}

const stars = ref<Record<string, number>>({})

function githubRepo(href?: string) {
  const match = href?.match(/^https?:\/\/github\.com\/([^/]+)\/([^/?#]+)/)
  return match ? `${match[1]}/${match[2].replace(/\.git$/, '')}` : ''
}

function formatStars(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(count)
}

async function loadStars(repo: string) {
  const cacheKey = `vw-stars:${repo}`
  const cached = sessionStorage.getItem(cacheKey)
  if (cached != null) {
    stars.value = { ...stars.value, [repo]: Number(cached) }
    return
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`)
    if (!res.ok) return
    const count = (await res.json()).stargazers_count
    if (typeof count !== 'number') return
    sessionStorage.setItem(cacheKey, String(count))
    stars.value = { ...stars.value, [repo]: count }
  } catch {}
}

function actionStars(action: ActionItem) {
  const count = stars.value[githubRepo(action.href)]
  return count == null ? '' : formatStars(count)
}

onMounted(() => {
  const repos = new Set(actions.value.map((action) => githubRepo(action.href)).filter(Boolean))
  repos.forEach(loadStars)
})

function runAction(action: ActionItem) {
  if (action.type === 'modal' || (!action.href && action.modalContent)) {
    modalTitle.value = action.modalTitle || action.label
    modalContent.value = action.modalContent || ''
    modalOpen.value = true
    return
  }
  if (action.href) {
    window.open(action.href, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <article class="vw-detail">
    <div class="vw-container">
      <p class="vw-crumb">
        <a href="/">首页</a>
        <span> / </span>
        <a href="/works/">全部作品</a>
        <span v-if="category"> / {{ category }}</span>
        <span> / {{ title }}</span>
      </p>
      <div class="vw-detail-grid" :class="{ 'has-rail': showRail }">
        <header class="vw-detail-head">
          <div
            class="vw-appicon"
            :class="[iconIsUrl ? 'has-logo' : `is-${accent}`]"
            aria-hidden="true"
          >
            <img v-if="iconIsUrl" :src="icon" :alt="title" />
            <template v-else>{{ iconGlyph }}</template>
          </div>
          <div>
            <h1>{{ title }}</h1>
            <p class="vw-detail-summary">{{ summary }}</p>
            <ul v-if="meta.length || launched || updated" class="vw-meta">
              <li v-if="launched">
                <span class="vw-meta-icon" aria-hidden="true" v-html="calendarSvg" />
                {{ launched }} 上线
              </li>
              <li v-if="updated">
                <span class="vw-meta-icon" aria-hidden="true" v-html="refreshSvg" />
                {{ updated }} 更新
              </li>
              <li v-for="item in meta" :key="item">{{ item }}</li>
            </ul>
            <PlatformBadges v-if="platforms.length" :platforms="platforms" style="margin-top: 8px" />
            <div v-if="tags.length" class="vw-detail-tags">
              <NTag v-for="tag in tags" :key="tag" size="small" round :bordered="false">
                {{ tag }}
              </NTag>
            </div>
          </div>
        </header>

        <aside v-if="showRail" class="vw-rail">
          <div v-if="railCard" class="vw-rail-card">
            <div class="vw-rail-card-copy">
              <span class="vw-rail-card-icon" aria-hidden="true">
                <img :src="railIconSrc" alt="" width="18" height="18" />
              </span>
              <strong v-if="railCard.title">{{ railCard.title }}</strong>
              <p v-if="railCard.text">{{ railCard.text }}</p>
            </div>
            <figure class="vw-rail-card-qr">
              <img :src="railCard.image" :alt="railCard.title || '二维码'" width="120" height="120" />
              <figcaption v-if="railCard.caption">{{ railCard.caption }}</figcaption>
            </figure>
          </div>

          <NButton
            v-for="(action, index) in actions"
            :key="`${action.label}-${index}`"
            class="vw-download"
            block
            size="large"
            :type="index === 0 ? 'primary' : 'default'"
            :secondary="index !== 0"
            @click="runAction(action)"
          >
            <span class="vw-action-btn">
              <span
                class="vw-action-icon"
                aria-hidden="true"
                v-html="actionIcon(action.icon)"
              />
              {{ action.label }}
              <span v-if="actionStars(action)" class="vw-action-stars">★ {{ actionStars(action) }}</span>
            </span>
          </NButton>
        </aside>

        <div id="detail-tabs" class="vw-tabs">
          <slot />
        </div>
      </div>
    </div>

    <NModal
      v-model:show="modalOpen"
      preset="card"
      :title="modalTitle"
      :style="{ width: 'min(440px, calc(100vw - 32px))' }"
    >
      <div class="vw-prose vw-modal-body" style="white-space: pre-wrap">{{ modalContent }}</div>
      <div style="margin-top: 16px; display: flex; justify-content: flex-end">
        <NButton type="primary" @click="modalOpen = false">关闭</NButton>
      </div>
    </NModal>
  </article>
</template>
