<script setup lang="ts">
import { NButton, NModal, NTag } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import type { ActionItem, PlatformInput } from '../types'
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

const meta = computed(() =>
  [
    page.value.version ? `v${page.value.version}` : '',
    page.value.updated ? `${page.value.updated} 更新` : '',
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
        <a href="/works/">全部</a>
        <span v-if="category"> / {{ category }}</span>
        <span> / {{ title }}</span>
      </p>
      <div class="vw-detail-grid" :class="{ 'has-rail': actions.length }">
        <div>
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
              <ul v-if="meta.length" class="vw-meta">
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

          <div id="detail-tabs" class="vw-tabs">
            <slot />
          </div>
        </div>

        <aside v-if="actions.length" class="vw-rail">
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
            </span>
          </NButton>
        </aside>
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
