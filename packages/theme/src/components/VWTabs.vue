<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import { Comment, Fragment, Text, computed, ref, useSlots, type VNode } from 'vue'

const slots = useSlots()
const active = ref('0')

function flatten(nodes: VNode[] | undefined): VNode[] {
  if (!nodes) return []
  const out: VNode[] = []
  for (const node of nodes) {
    if (!node) continue
    if (node.type === Fragment && Array.isArray(node.children)) {
      out.push(...flatten(node.children as VNode[]))
      continue
    }
    if (node.type === Comment || node.type === Text) continue
    out.push(node)
  }
  return out
}

function isTab(node: VNode) {
  const type = node.type as { name?: string; __name?: string } | string
  if (typeof type === 'string') return false
  return type?.name === 'VWTab' || type?.__name === 'VWTab'
}

const tabNodes = computed(() => flatten(slots.default?.()).filter(isTab))
</script>

<template>
  <div class="vw-content-tabs">
    <NTabs
      v-if="tabNodes.length"
      v-model:value="active"
      type="line"
      display-directive="show"
    >
      <NTabPane
        v-for="(node, index) in tabNodes"
        :key="index"
        :name="String(index)"
        :tab="String((node.props as { title?: string } | null)?.title ?? `Tab ${index + 1}`)"
      >
        <component :is="node" />
      </NTabPane>
    </NTabs>
    <div v-else class="vw-prose">
      <slot />
    </div>
  </div>
</template>
