<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="vw-prose vw-tab-panel">
    <slot />
  </div>
</template>
