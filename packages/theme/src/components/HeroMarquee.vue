<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue'
import type { CatalogItem } from '../types'
import ProductCard from './ProductCard.vue'

const props = defineProps<{ items: CatalogItem[] }>()

/**
 * Two rows scroll opposite directions.
 * When there are enough works, rows are a disjoint split so top/bottom don't repeat.
 * Order is shuffled on each visit (client).
 */
const rows = shallowRef<CatalogItem[][]>([])

function shuffle<T>(list: T[]): T[] {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function partition(items: CatalogItem[]): CatalogItem[][] {
  if (!items.length) return []
  if (items.length === 1) return [items]

  // ≥4：上下各一半，互不重复
  if (items.length >= 4) {
    const mid = Math.ceil(items.length / 2)
    return [items.slice(0, mid), items.slice(mid)]
  }

  // 2–3 件不够铺两行：允许上下都出现，错开一位减少同步感
  const [first, ...rest] = items
  return [items, [...rest, first]]
}

function rebuild() {
  rows.value = partition(shuffle(props.items))
}

// SSG 首屏用稳定切分，避免空白；挂载后再随机
function ssrPartition(items: CatalogItem[]): CatalogItem[][] {
  if (!items.length) return []
  if (items.length === 1) return [items]
  if (items.length >= 4) {
    const mid = Math.ceil(items.length / 2)
    return [items.slice(0, mid), items.slice(mid)]
  }
  const [first, ...rest] = items
  return [items, [...rest, first]]
}

rows.value = ssrPartition(props.items)

onMounted(rebuild)
watch(() => props.items, rebuild)

/** Paint each row twice so translateX(-50%) loops without a jump. */
function looped(row: CatalogItem[]) {
  return row.concat(row)
}
</script>

<template>
  <div
    v-if="rows.length"
    class="vw-marquee"
    role="region"
    :aria-label="`作品滚动展示，${items.length} 款`"
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
      >
        <ProductCard
          :item="item"
          variant="mini"
          :tabindex="index >= row.length ? -1 : undefined"
        />
      </li>
    </ul>
  </div>
</template>
