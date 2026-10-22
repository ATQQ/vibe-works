<script setup lang="ts">
import { computed } from 'vue'
import type { CatalogItem } from '../types'
import ProductCard from './ProductCard.vue'

const props = defineProps<{ items: CatalogItem[] }>()

/**
 * Two horizontal rows, matching toolsoul's hero marquee.
 * The second row is the same catalog shifted by one card and scrolls in reverse.
 * Each row is painted twice so translateX(-50% - half the gap) loops without a jump.
 */
const rows = computed(() => {
  const items = props.items
  const [first, ...rest] = items
  if (!first || rest.length === 0) return items.length ? [items] : []
  return [items, [...rest, first]]
})

function looped(row: CatalogItem[]) {
  return row.concat(row)
}
</script>

<template>
  <div
    v-if="rows.length"
    class="vw-marquee"
    role="region"
    :aria-label="`精选作品，${items.length} 款`"
  >
    <ul
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="vw-marquee-track"
      :class="{ 'vw-marquee-track--reverse': rowIndex === 1 }"
      :style="{ '--count': String(row.length) }"
    >
      <li
        v-for="(item, index) in looped(row)"
        :key="`${rowIndex}-${item.url}-${index}`"
        class="vw-marquee-item"
        :data-copy="index >= row.length ? '1' : '0'"
        :aria-hidden="index >= row.length ? 'true' : undefined"
        :inert="index >= row.length ? true : undefined"
      >
        <ProductCard :item="item" variant="mini" />
      </li>
    </ul>
  </div>
</template>
