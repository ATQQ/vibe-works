<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    alt?: string
  }>(),
  { alt: '' },
)
</script>

<template>
  <img
    v-if="src"
    class="vw-mark vw-mark-img"
    :src="src"
    :alt="alt"
    width="40"
    height="40"
    decoding="async"
  />
  <svg
    v-else
    class="vw-mark"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <rect width="32" height="32" rx="8" fill="currentColor" />
    <path d="M9 9.5h3.7L16 18.2 19.3 9.5H23L17.2 23h-2.4L9 9.5z" fill="#fff" />
  </svg>
</template>

<style scoped>
.vw-mark {
  color: var(--vw-primary);
  display: block;
  flex: none;
}

.vw-mark-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
}
</style>
