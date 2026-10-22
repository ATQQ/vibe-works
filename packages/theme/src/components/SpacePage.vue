<script setup lang="ts">
import { NAlert, NButton, NEmpty, NTabPane, NTabs } from 'naive-ui'
import { useWaitlist } from '../waitlist'
import WaitlistForm from './WaitlistForm.vue'

const { saved, clear } = useWaitlist()
</script>

<template>
  <div class="vw-container vw-stack">
    <header class="vw-page-intro">
      <p class="vw-crumb"><a href="/">首页</a> / 我的空间</p>
      <h1>我的空间</h1>
      <p class="vw-lede">登录、订单和授权码都还没做。这里只给静态占位，避免看起来像能付款。</p>
    </header>
    <div class="vw-space-actions">
      <NButton disabled>登录（未开放）</NButton>
      <NButton tag="a" href="/works/" secondary>去看作品</NButton>
    </div>
    <NAlert type="warning" :bordered="false">
      没有账号系统。购买按钮在详情页里会说明原因，不会跳出支付。
    </NAlert>
    <div class="vw-panel" style="padding: 8px 18px 22px">
      <NTabs type="line" animated>
        <NTabPane name="orders" tab="订单">
          <NEmpty description="没有订单。这个站点不会生成账单。" />
        </NTabPane>
        <NTabPane name="trials" tab="试用">
          <NEmpty description="试用不用登录。打开作品页里的演示即可。" />
          <div style="display: flex; justify-content: center; margin-top: 8px">
            <NButton type="primary" tag="a" href="/works/">浏览作品</NButton>
          </div>
        </NTabPane>
        <NTabPane name="wait" tab="等候">
          <p class="vw-lede">如果在工具页留下过邮箱，会出现在下面。</p>
          <p v-if="saved"><strong>当前邮箱：</strong>{{ saved }}</p>
          <WaitlistForm />
          <NButton v-if="saved" style="margin-top: 10px" secondary @click="clear">移除邮箱</NButton>
        </NTabPane>
      </NTabs>
    </div>
  </div>
</template>
