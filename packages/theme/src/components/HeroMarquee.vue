<script setup lang="ts">
import { computed, onMounted, shallowRef, watch } from 'vue'
import type { CatalogItem } from '../types'
import ProductCard from './ProductCard.vue'
import {
  ORDER_KEY,
  arrangeRows,
  marqueeBootScript,
  shuffleIndices,
} from './marquee-order'

const props = defineProps<{ items: CatalogItem[] }>()

/**
 * Two rows scroll opposite directions, order shuffled on each visit.
 * SSG HTML ships a stable order; the inline boot script shuffles the DOM
 * before hydration and hands the order over via window, so there's no reflow.
 */
let needsShuffleOnMount = false

function identity(count: number) {
  return Array.from({ length: count }, (_, i) => i)
}

function initialOrder(count: number): number[] {
  if (import.meta.env.SSR) return identity(count)
  const w = window as unknown as Record<string, number[] | undefined>
  const injected = w[ORDER_KEY]
  if (injected) {
    delete w[ORDER_KEY]
    if (injected.length === count) return injected
  }
  // Hydrating without boot script result: match SSR, shuffle after mount.
  if (document.querySelector('.vw-marquee')) {
    needsShuffleOnMount = true
    return identity(count)
  }
  return shuffleIndices(count)
}

const order = shallowRef(initialOrder(props.items.length))

const rows = computed(() =>
  arrangeRows(order.value).map((row) =>
    row.map((i) => ({ index: i, item: props.items[i] })),
  ),
)

onMounted(() => {
  if (needsShuffleOnMount) order.value = shuffleIndices(props.items.length)
})
watch(
  () => props.items,
  (items) => {
    order.value = shuffleIndices(items.length)
  },
)

/** Paint each row twice so translateX(-50%) loops without a jump. */
function looped<T>(row: T[]) {
  return row.concat(row)
}
</script>

<template>
  <div
    v-if="rows.length"
    class="vw-marquee"
    role="region"
    :aria-label="`作品滚动展示，${items.length} 款`"
    :data-count="items.length"
  >
    <ul
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="vw-marquee-track"
      :class="{ 'vw-marquee-track--reverse': rowIndex === 1 }"
      :style="{ '--count': String(row.length) }"
    >
      <li
        v-for="(entry, index) in looped(row)"
        :key="`${rowIndex}-${entry.item.url}-${index}`"
        class="vw-marquee-item"
        :data-i="entry.index"
        :data-copy="index >= row.length ? '1' : '0'"
        :aria-hidden="index >= row.length ? 'true' : undefined"
      >
        <ProductCard
          :item="entry.item"
          variant="mini"
          :tabindex="index >= row.length ? -1 : undefined"
        />
      </li>
    </ul>
    <div hidden v-html="marqueeBootScript" />
  </div>
</template>
