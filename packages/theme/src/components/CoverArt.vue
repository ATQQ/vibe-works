<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  accent?: string
  title: string
  caption?: string
  cover?: string
  icon?: string
}>()

const variant = Math.abs(hash(props.title)) % 3
const iconIsUrl = computed(
  () => Boolean(props.icon) && (/^https?:\/\//.test(props.icon!) || props.icon!.startsWith('/')),
)
const iconIsEmoji = computed(() => Boolean(props.icon) && !iconIsUrl.value)
const mode = computed(() => {
  if (props.cover) return 'cover' as const
  if (props.icon) return 'icon' as const
  return 'wire' as const
})

function hash(value: string) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0)
}
</script>

<template>
  <div
    class="vw-cover"
    :class="[`is-${accent || 'mint'}`, `is-v${variant}`, `is-mode-${mode}`]"
  >
    <img
      v-if="mode === 'cover'"
      class="vw-cover-photo"
      :src="cover"
      :alt="title"
      loading="lazy"
    />
    <div v-else-if="mode === 'icon'" class="vw-cover-icon">
      <img v-if="iconIsUrl" :src="icon" :alt="title" loading="lazy" />
      <span v-else-if="iconIsEmoji" aria-hidden="true">{{ icon }}</span>
      <span class="vw-cover-icon-caption">{{ caption || title }}</span>
    </div>
    <div v-else class="vw-window">
      <div class="vw-window-bar">
        <i /><i /><i />
        <span>{{ caption || title }}</span>
      </div>
      <div class="vw-window-body">
        <div v-if="variant !== 1" class="vw-window-side">
          <b /><b /><b /><b />
        </div>
        <div class="vw-window-main">
          <strong />
          <p />
          <div class="vw-window-row">
            <em /><em /><em />
          </div>
          <u />
        </div>
      </div>
    </div>
  </div>
</template>
