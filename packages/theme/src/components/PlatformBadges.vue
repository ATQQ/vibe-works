<script setup lang="ts">
import { computed } from 'vue'
import { resolvePlatforms, type PlatformInput } from '../platforms'

const props = defineProps<{
  platforms?: PlatformInput[]
}>()

const badges = computed(() => resolvePlatforms(props.platforms))
</script>

<template>
  <div v-if="badges.length" class="vw-platforms">
    <span v-for="(item, index) in badges" :key="`${item.key}-${item.label}-${index}`">
      <img
        v-if="item.src"
        class="vw-platform-icon"
        :src="item.src"
        alt=""
        width="15"
        height="15"
        loading="lazy"
        decoding="async"
      />
      <span
        v-else-if="item.svg"
        class="vw-platform-icon"
        aria-hidden="true"
        v-html="item.svg"
      />
      {{ item.label }}
    </span>
  </div>
</template>
