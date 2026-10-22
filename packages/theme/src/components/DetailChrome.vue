<script setup lang="ts">
import {
  NButton,
  NModal,
  NPopover,
  NRadio,
  NRadioGroup,
  NTabPane,
  NTabs,
  NTag,
} from 'naive-ui'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import type { FaqItem, NoteItem, PlanItem, SceneItem } from '../types'
import WaitlistForm from './WaitlistForm.vue'

const { frontmatter } = useData()
const page = computed(() => frontmatter.value)

const title = computed(() => String(page.value.title ?? ''))
const summary = computed(() => String(page.value.summary ?? ''))
const category = computed(() => String(page.value.category ?? ''))
const accent = computed(() => String(page.value.accent ?? 'mint'))
const catalog = computed(() => (page.value.catalog === 'service' ? 'service' : 'work'))
const platforms = computed(() =>
  Array.isArray(page.value.platforms) ? page.value.platforms.map(String) : [],
)
const tags = computed(() => (Array.isArray(page.value.tags) ? page.value.tags.map(String) : []))
const scenes = computed(() => (page.value.scenes ?? []) as SceneItem[])
const notes = computed(() => (page.value.highlights ?? []) as NoteItem[])
const faq = computed(() => (page.value.faq ?? []) as FaqItem[])
const plans = computed(() => (page.value.plans ?? []) as PlanItem[])
const stats = computed(() => (page.value.stats ?? {}) as Record<string, string>)
const action = computed(() => String(page.value.action ?? 'overview'))
const railLabel = computed(() => String(page.value.railLabel ?? '打开介绍'))
const listHref = computed(() => (catalog.value === 'service' ? '/tools/' : '/works/'))
const listLabel = computed(() => (catalog.value === 'service' ? '工具' : '作品'))

const meta = computed(() =>
  [
    page.value.version ? `v${page.value.version}` : '',
    page.value.updated ? `${page.value.updated} 更新` : '',
    page.value.size ? String(page.value.size) : '',
    page.value.lang ? String(page.value.lang) : '',
  ].filter(Boolean),
)

const device = ref('')
const activeDevice = computed({
  get: () => device.value || platforms.value[0] || '',
  set: (value: string) => {
    device.value = value
  },
})

const planId = ref('')
const activePlanId = computed({
  get: () => planId.value || plans.value[0]?.id || '',
  set: (value: string) => {
    planId.value = value
  },
})
const selected = computed(
  () => plans.value.find((plan) => plan.id === activePlanId.value) ?? plans.value[0],
)
const tab = ref('overview')
const blocked = ref(false)

const statCells = computed(() => [
  { label: '预览', value: stats.value.downloads ?? '—', tone: '↓' },
  { label: '查看', value: stats.value.views ?? '—', tone: '◎' },
  { label: '评分', value: stats.value.rating ?? '—', tone: '★' },
  { label: '试用', value: stats.value.users ?? '—', tone: '◌' },
])

const sparks = [
  'M2 20 C 12 18, 18 8, 28 12 S 48 22, 58 10 74 8',
  'M2 16 C 14 20, 22 6, 34 14 S 54 22, 78 8',
  'M2 18 C 16 10, 24 22, 40 12 S 60 6, 78 14',
  'M2 14 C 18 20, 30 8, 44 16 S 62 20, 78 9',
]

function runPrimary() {
  if (action.value === 'waitlist') {
    blocked.value = true
    return
  }
  if (action.value === 'demo') {
    tab.value = 'overview'
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  tab.value = 'overview'
  document.getElementById('detail-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function runPlan() {
  if (selected.value?.disabled) {
    blocked.value = true
    return
  }
  runPrimary()
}
</script>

<template>
  <article class="vw-detail">
    <div class="vw-container">
      <p class="vw-crumb">
        <a href="/">首页</a>
        <span> / </span>
        <a :href="listHref">{{ listLabel }}</a>
        <span v-if="category"> / {{ category }}</span>
        <span> / {{ title }}</span>
      </p>
      <div class="vw-detail-grid">
        <div>
          <header class="vw-detail-head">
            <div class="vw-appicon" :class="`is-${accent}`" aria-hidden="true">
              {{ title.slice(0, 1) }}
            </div>
            <div>
              <h1>{{ title }}</h1>
              <p class="vw-detail-summary">{{ summary }}</p>
              <ul class="vw-meta">
                <li v-for="item in meta" :key="item">{{ item }}</li>
              </ul>
              <div class="vw-detail-tags">
                <NTag v-for="tag in tags" :key="tag" size="small" round :bordered="false">
                  {{ tag }}
                </NTag>
              </div>
            </div>
          </header>

          <h2 class="vw-block-title">支持环境</h2>
          <div class="vw-devices">
            <button
              v-for="platform in platforms"
              :key="platform"
              type="button"
              class="vw-device"
              :class="{ 'is-on': activeDevice === platform }"
              @click="activeDevice = platform"
            >
              ▣ {{ platform }}
            </button>
          </div>
          <p class="vw-stat-note">将以 {{ activeDevice || '浏览器' }} 查看。下面的数字是演示数据。</p>
          <div class="vw-statgrid">
            <div v-for="(cell, index) in statCells" :key="cell.label" class="vw-stat">
              <div class="vw-stat-icon">{{ cell.tone }}</div>
              <b>{{ cell.value }}</b>
              <span>{{ cell.label }}</span>
              <svg class="vw-spark" viewBox="0 0 80 28" aria-hidden="true">
                <path
                  :d="sparks[index]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>

          <div id="detail-tabs" class="vw-tabs">
            <NTabs v-model:value="tab" type="line" display-directive="show">
              <NTabPane name="overview" tab="概览">
                <div class="vw-prose">
                  <slot />
                </div>
              </NTabPane>
              <NTabPane name="scenes" tab="场景">
                <div class="vw-scene-list">
                  <article v-for="scene in scenes" :key="scene.title" class="vw-scene">
                    <h3>{{ scene.title }}</h3>
                    <p>{{ scene.text }}</p>
                  </article>
                  <p v-if="!scenes.length" class="vw-lede">这页还没写场景。</p>
                </div>
              </NTabPane>
              <NTabPane name="notes" tab="说明">
                <div class="vw-note-list">
                  <article v-for="note in notes" :key="note.title" class="vw-note">
                    <h3>{{ note.title }}</h3>
                    <p>{{ note.text }}</p>
                  </article>
                </div>
                <div class="vw-faq" style="margin-top: 12px">
                  <article v-for="item in faq" :key="item.q">
                    <h3>{{ item.q }}</h3>
                    <p>{{ item.a }}</p>
                  </article>
                </div>
              </NTabPane>
              <NTabPane name="pricing" tab="定价">
                <div class="vw-scene-list">
                  <article v-for="plan in plans" :key="plan.id" class="vw-scene">
                    <h3>{{ plan.name }} · {{ plan.price }}</h3>
                    <p>
                      {{ plan.period }} · {{ plan.devices }}
                      <template v-if="plan.disabled"> 这一档未开通，不能下单。</template>
                      <template v-else> 当前可以直接看。</template>
                    </p>
                    <p v-if="plan.note">{{ plan.note }}</p>
                  </article>
                </div>
              </NTabPane>
            </NTabs>
          </div>
        </div>

        <aside class="vw-rail">
          <NButton class="vw-download" block size="large" color="#1d6ef5" @click="runPrimary">
            ↓ {{ railLabel }}
          </NButton>
          <div class="vw-plans">
            <div class="vw-plans-head">
              <strong>选择档位</strong>
              <NPopover trigger="click">
                <template #trigger>
                  <button class="vw-help" type="button">价格说明</button>
                </template>
                数字只说明档位怎么拆。站点没有支付，也没有授权码。
              </NPopover>
            </div>
            <NRadioGroup v-model:value="activePlanId" style="display: block">
              <label
                v-for="plan in plans"
                :key="plan.id"
                class="vw-plan"
                :class="{ 'is-on': activePlanId === plan.id }"
              >
                <NRadio :value="plan.id" />
                <span>
                  <span class="vw-plan-name">
                    {{ plan.name }}
                    <em v-if="plan.badge" class="vw-plan-badge">{{ plan.badge }}</em>
                  </span>
                  <p>{{ plan.period }} · {{ plan.devices }}</p>
                </span>
                <b class="vw-plan-price">{{ plan.price }}</b>
              </label>
            </NRadioGroup>
            <p class="vw-plan-foot">
              {{ selected?.note || '免费档可以直接看。付费档保持关闭。' }}
            </p>
            <NButton class="vw-download" block size="large" color="#1d6ef5" @click="runPlan">
              {{ selected?.disabled ? '这一档还不能买' : railLabel }}
            </NButton>
          </div>
        </aside>
      </div>
    </div>

    <NModal
      v-model:show="blocked"
      preset="card"
      title="还不能买"
      :style="{ width: 'min(440px, calc(100vw - 32px))' }"
    >
      <p>
        <strong>{{ selected?.name || title }}</strong>
        的价格是占位。v1 没有微信支付、授权码或订单。
      </p>
      <p v-if="selected?.note">{{ selected.note }}</p>
      <div v-if="action === 'waitlist'" style="margin-top: 12px">
        <WaitlistForm />
      </div>
      <div style="margin-top: 16px; display: flex; justify-content: flex-end">
        <NButton type="primary" @click="blocked = false">知道了</NButton>
      </div>
    </NModal>
  </article>
</template>
