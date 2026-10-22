---
title: Vibe works
description: 作品演示与即将开放的工具目录。先看场景和交付物，付费档仍是占位。
home:
  eyebrow: Vibe works 收录作品演示，也预留即将开放的工具
  title: 发现能直接上手的作品，少看空话。
  lede: 不再只翻概念和报价单。作品介绍、适用场景、交付物和定价占位都在这里，适合想先看成果的人。
  primary:
    text: 挑选作品
    link: /works/
  secondary:
    text: 查看服务
    link: /tools/
  checks:
    - 已收录 5 件作品
    - 演示在浏览器里打开
    - 付款与授权保持关闭
  featuredTitle: 先从能看懂的作品开始
  featuredLede: 围绕写作、界面、建站和办公，把做过的东西摊开。
  featuredMore:
    text: 查看全部作品
    link: /works/
  stepsTitle: 从看到用起来，少绕一步
  stepsLede: 很多作品不是不好，而是看不出适不适合自己。这里把判断顺序写短。
  steps:
    - title: 看懂适用场景
      text: 用白话写它解决什么问题，适合谁使用。
    - title: 对上交付物
      text: 场景、成品和边界分开，方便决定要不要继续。
    - title: 定价先占位
      text: 付费档只作示意，不生成订单，也不会要授权码。
    - title: 试用或留言
      text: 演示可以直接看。想跟进的邮箱只留在这台浏览器里。
  offerTitle: 需要的话，可以把作品收成一项服务
  offerLede: 如果你已经有想做的方向，可以先看一笔示例报价怎么拆。当前站点不收款、不发授权，数字只说明范围。
  offerPoints:
    - 不用从零猜范围，作品页里写过交付物
    - 场景和客户关系可以留在你自己这边
    - 示例报价、周期和包含内容写在一起
    - 支付、授权和设备限制还没接上
  offerLink:
    text: 查看服务占位
    link: /tools/
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
  closingTitle: 现在就挑一件看看
  closingLede: 案例免费浏览。付费档是占位，点开会说明为什么还不能买。
  closingLink:
    text: 浏览全部作品
    link: /works/
---

<script setup lang="ts">
import { data as catalog } from './catalog.data'
</script>

<HomePage :catalog="catalog" />
