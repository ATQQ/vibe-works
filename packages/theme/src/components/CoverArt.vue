<script setup lang="ts">
const props = defineProps<{
  accent?: string
  title: string
  caption?: string
}>()

const variant = Math.abs(hash(props.title)) % 3

function hash(value: string) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0)
}
</script>

<template>
  <div class="vw-cover" :class="[`is-${accent || 'mint'}`, `is-v${variant}`]">
    <div class="vw-window">
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
