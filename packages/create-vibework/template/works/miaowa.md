---
# 有 kind: detail 的页面才会进入作品目录
title: 妙蛙记账
kind: detail
catalog: work
summary: 一句话，记清花销；一句话完成想要的数据查询。
# 目录页按 category 分类筛选，按 tags 标签筛选
category: APP
tags: [小程序, Vue, VibeCoding]
# 字符串自动匹配内置图标：Web / CLI / Windows / macOS / iOS / Android / 小程序 / Chrome …
platforms: [Web, Android, 小程序]
# 卡片主色：mint / amber / sea / lilac / clay / ink
accent: mint
# 图标与封面；不写 cover 时用 icon 加主色生成卡片封面
icon: https://miaowa.sugarat.top/favicon.ico
cover: /covers/miaowa.jpg
# 首页精选，数字越小越靠前；不写则不进精选
featured: 1
# 上线时间（列表按它倒序）、版本、更新时间，显示在详情页标题下
date: 2026-08-17
version: '0.2.3'
updated: 2026-10-25
# 右侧栏媒体卡片，如小程序码；可写一个对象或数组
railCard:
  - title: 微信小程序
    text: 微信扫码即可打开，在微信里记账
    image: /qr/miaowa-miniapp.jpg
    caption: 扫码打开
    icon: wechat
# 右侧按钮：默认外链；type: modal 为弹窗，可带图片
actions:
  - label: 访问站点
    icon: link
    href: https://miaowa.sugarat.top/docs/
  - label: 联系作者
    icon: mail
    type: modal
    modalTitle: 联系作者
    modalContent: |
      扫码加微信，备注「妙蛙」。
    modalImage: /wechat-qr.png
---

:::: tabs
::: tab 概览

![](/covers/miaowa.jpg)

一句话，记清花销；一句话完成想要的数据查询。

:::
::: tab 场景

适合想用自然语言记帐、查帐单的个人用户。

:::
::::
