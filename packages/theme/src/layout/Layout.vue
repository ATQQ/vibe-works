<script setup lang="ts">
import { darkTheme, dateZhCN, NConfigProvider, zhCN } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { useData } from 'vitepress'
import { computed, defineComponent, h, inject, onMounted, ref } from 'vue'
import DetailChrome from '../components/DetailChrome.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { useThemeMode } from '../theme-mode'

const { frontmatter, page } = useData()
const { isDark } = useThemeMode()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const isDetail = computed(() => frontmatter.value.kind === 'detail')
const isPlain = computed(() => frontmatter.value.plain === true || page.value.isNotFound)

const dark = computed(() => mounted.value && isDark.value)

const overrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    primaryColor: '#1DA350',
    primaryColorHover: '#178A44',
    primaryColorPressed: '#136B36',
    primaryColorSuppl: '#1DA350',
    borderRadius: '10px',
    fontFamily: '"Bricolage Grotesque Variable", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif',
    ...(dark.value ? { cardColor: '#141a24', modalColor: '#141a24', popoverColor: '#1c2533' } : {}),
  },
  Button: {
    fontWeight: '700',
    borderRadiusMedium: '10px',
    borderRadiusLarge: '10px',
    heightMedium: '36px',
    heightLarge: '44px',
  },
  Tag: dark.value
    ? { color: '#163228', textColor: '#7fe0a4', borderRadius: '999px' }
    : { color: '#eef8f2', textColor: '#147439', borderRadius: '999px' },
  Tabs: dark.value
    ? {
        tabTextColorLine: '#a3acb9',
        tabTextColorActiveLine: '#7aabff',
        tabTextColorHoverLine: '#7aabff',
        barColor: '#7aabff',
        tabBorderColor: '#263140',
      }
    : {
        tabTextColorLine: '#616875',
        tabTextColorActiveLine: '#1d6ef5',
        tabTextColorHoverLine: '#1d6ef5',
        barColor: '#1d6ef5',
        tabBorderColor: '#e6e8ee',
      },
}))

const naiveTheme = computed(() => (dark.value ? darkTheme : null))
const isSsr = import.meta.env.SSR

const SsrMarkers = defineComponent({
  name: 'SsrMarkers',
  setup() {
    const collect = inject<() => string>('vw-css-collect', () => '')
    const relativePath = page.value.relativePath
    return () => [
      h('css-render-style', { innerHTML: collect() }),
      h('vitepress-path', { 'data-path': relativePath }),
    ]
  },
})

</script>

<template>
  <NConfigProvider
    abstract
    inline-theme-disabled
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="naiveTheme"
    :theme-overrides="overrides"
  >
    <div class="vw-app">
      <a class="vw-skip" href="#main">跳到内容</a>
      <SiteHeader>
        <template #nav-bar-extra>
          <slot name="nav-bar-extra" />
        </template>
      </SiteHeader>
      <main id="main">
        <DetailChrome v-if="isDetail">
          <Content />
        </DetailChrome>
        <div v-else-if="isPlain" class="vw-container vw-plain">
          <div class="vw-prose">
            <Content />
          </div>
        </div>
        <Content v-else />
      </main>
      <SiteFooter />
    </div>
    <SsrMarkers v-if="isSsr" />
  </NConfigProvider>
</template>
