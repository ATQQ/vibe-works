<script setup lang="ts">
import type { QuoteLine } from '../types'

defineProps<{
  title?: string
  lines?: QuoteLine[]
  total?: QuoteLine
}>()
</script>

<template>
  <aside class="vw-receipt">
    <h3>{{ title || '一笔订单怎么估' }}</h3>
    <p
      v-for="line in lines || []"
      :key="line.label"
      class="vw-receipt-line"
      :class="{ 'is-mute': line.mute }"
    >
      <span>{{ line.label }}</span>
      <i />
      <b>{{ line.value }}</b>
    </p>
    <div v-if="total" class="vw-receipt-total">
      <span>{{ total.label }}</span>
      <b>{{ total.value }}</b>
    </div>
  </aside>
</template>
