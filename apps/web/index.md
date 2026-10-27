---
title: Vibe works
description: 作品展示与介绍。
home:
  eyebrow: Vibe works
  title: 能玩的作品，都在这里
  lede: APP、CLI、网站、都有。部分 GitHub 开源。
  primary:
    text: 浏览全部
    link: /works/
  secondary:
    text: GitHub
    link: https://github.com/ATQQ/sugar-blog
  checks:
    - 9 件作品
    - 纯静态，无账号
    - 外链到站点与仓库
  perks:
    - icon: filter
      title: 先看作品本身
      text: 介绍和场景摊开，不用猜适不适合。
    - icon: doc
      title: 外链写清楚
      text: 独立站、GitHub 在详情页一键打开。
    - icon: play
      title: 打开就能逛
      text: 纯静态页面，无账号、不收款。
    - icon: shield
      title: 想聊能联系
      text: 联系 / 购买等 CTA 可自定义弹窗。
  featuredTitle: 精选作品
  featuredLede: 瞧一瞧，看一看。
  # closingTitle: 想看完整列表？
  # closingLede: 「全部」页支持搜索和按分类筛选。
  # closingLink:
    # text: 打开全部
    # link: /works/
---

<script setup lang="ts">
import { data as catalog } from './catalog.data'
</script>

<HomePage :catalog="catalog" />
