<script setup lang="ts">
import { NButton, NInput, NTag } from 'naive-ui'
import { computed, ref } from 'vue'

const text = ref('这周其实非常忙，然后把着陆页改了一版。')
const tones = ref<string[]>(['具体'])
const output = ref('')

const options = ['克制', '具体', '口语']

const preview = computed(() => output.value || '点「收成一段」，句子会留在这页里。')

function toggle(tone: string, checked: boolean) {
  tones.value = checked ? [...tones.value, tone] : tones.value.filter((item) => item !== tone)
}

function compose() {
  let next = text.value.trim()
  if (!next) {
    output.value = '先写一句这周发生的事。'
    return
  }
  if (tones.value.includes('克制')) next = next.replace(/非常|其实|就是|然后/g, '')
  if (tones.value.includes('具体') && !/\d/.test(next)) next += '（补一个数字会更站得住。）'
  if (tones.value.includes('口语')) next = `说人话的版本：${next}`
  output.value = next.replace(/\s{2,}/g, ' ').trim()
}
</script>

<template>
  <section id="demo" class="vw-demo">
    <h3>页内演示</h3>
    <p class="vw-demo-help">句子只在这台浏览器里变化，没有账号，也不会上传。</p>
    <NInput
      v-model:value="text"
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 6 }"
      placeholder="写一句这周发生的事"
    />
    <div class="vw-demo-tones">
      <NTag
        v-for="tone in options"
        :key="tone"
        checkable
        round
        :checked="tones.includes(tone)"
        @update:checked="(checked: boolean) => toggle(tone, checked)"
      >
        {{ tone }}
      </NTag>
    </div>
    <div class="vw-demo-actions">
      <NButton type="primary" @click="compose">收成一段</NButton>
      <NButton quaternary @click="output = ''">清空结果</NButton>
    </div>
    <div class="vw-demo-out" role="status">{{ preview }}</div>
  </section>
</template>
