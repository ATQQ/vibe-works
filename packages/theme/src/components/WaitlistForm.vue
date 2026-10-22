<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
import { useWaitlist } from '../waitlist'

const { draft, message, save } = useWaitlist()
</script>

<template>
  <form class="vw-form" @submit.prevent="save()">
    <NInput
      v-model:value="draft"
      placeholder="you@example.com"
      aria-label="等候邮箱"
    />
    <NButton attr-type="submit" type="primary">记下邮箱</NButton>
    <p v-if="message" role="status">{{ message }}</p>
  </form>
</template>
