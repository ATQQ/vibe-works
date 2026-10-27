<script setup lang="ts">
import { computed } from 'vue'
import { resolveChannels } from '../channels'
import type { FooterChannel } from '../types'

const props = withDefaults(
  defineProps<{
    channels?: FooterChannel[]
    label?: string
  }>(),
  { label: '关注我' },
)

const items = computed(() => resolveChannels(props.channels))
const title = computed(() => props.label?.trim() || '')
</script>

<template>
  <div v-if="items.length" class="vw-channels-row">
    <span v-if="title" class="vw-channels-label">{{ title }}</span>
    <ul class="vw-channels" :aria-label="title || '关注渠道'">
      <li v-for="item in items" :key="item.key" class="vw-channel-item">
        <component
          :is="item.link && !item.qrSrc ? 'a' : 'button'"
          class="vw-channel"
          :class="`is-${item.tone}`"
          :href="item.link && !item.qrSrc ? item.link : undefined"
          :type="item.link && !item.qrSrc ? undefined : 'button'"
          :target="item.link && !item.qrSrc ? '_blank' : undefined"
          :rel="item.link && !item.qrSrc ? 'noopener noreferrer' : undefined"
          :aria-label="item.label"
        >
          <img v-if="item.iconSrc" class="vw-channel-icon" :src="item.iconSrc" alt="" width="18" height="18" />
          <span
            v-else-if="item.iconSvg"
            class="vw-channel-icon"
            aria-hidden="true"
            v-html="item.iconSvg"
          />
          <span v-else class="vw-channel-fallback" aria-hidden="true">{{ item.label.slice(0, 1) }}</span>

          <span v-if="item.qrSrc" class="vw-channel-pop" role="tooltip">
            <img class="vw-channel-qr" :src="item.qrSrc" :alt="`${item.label} 二维码`" width="148" height="148" />
            <span v-if="item.qrTitle" class="vw-channel-qr-title">{{ item.qrTitle }}</span>
          </span>
        </component>
      </li>
    </ul>
  </div>
</template>
