---
title: 工具
description: 即将开放的付费工具占位。可以看范围和示例报价，不能下单。
services:
  crumb: 工具
  title: 付费工具还在占位。
  lede: 这些卡片是以后可能单独提供的服务。现在只能看范围、留一个本地邮箱，不能付款。
  alert: 没有微信支付，没有授权码，也没有自动开通。按钮如果看起来能买，点开只会说明原因。
  offerTitle: 服务范围先写清楚
  offerLede: 下面这张示例报价和首页是同一笔账，方便对照。它不是购物车。
  offerPoints:
    - 交付物跟作品页用的是同一套说法
    - 周期和包含内容分开列
    - 邮箱只存在这台浏览器
    - 不会生成订单号
  quoteTitle: 一笔工作室订单怎么估
  quoteLines:
    - label: 方案与原型
      value: ¥8,000
    - label: 静态站点搭建
      value: ¥6,000
    - label: 上线陪跑（暂不单列）
      value: −¥0
      mute: true
  quoteTotal:
    label: 示例合计
    value: ¥14,000
---

<script setup lang="ts">
import { data as catalog } from '../catalog.data'
</script>

<ServicesPage :catalog="catalog" />
