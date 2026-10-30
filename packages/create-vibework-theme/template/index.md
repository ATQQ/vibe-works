---
home:
  eyebrow: '{{title}}'
  title: 能玩的作品，都在这里
  lede: APP、CLI、网站、都有。部分 GitHub 开源。
  primary:
    text: 浏览全部
    link: /works/
  secondary:
    text: GitHub
    link: https://github.com/ATQQ
  # 首屏标题下的勾选项
  checks:
    - 写 Markdown 上架
    - 纯静态部署
    - 深色模式
  # 卖点卡片，icon 可选：filter / doc / play / shield / link / chat
  perks:
    - icon: filter
      title: 啥都有
      text: App、CLI、Web应用都有。
    - icon: play
      title: 直接体验
      text: 多数有线上地址，点进去就能上手玩。
    - icon: shield
      title: 大部分开源
      text: 欢迎 Star、Fork、PR。
    - icon: chat
      title: 联系我
      text: 底部有微信二维码。
  # 精选区展示作品 frontmatter 里配了 featured 的
  featuredTitle: 精选作品
  featuredLede: 瞧一瞧，看一看。
  # 页面底部的引导
  closingTitle: 想看完整列表？
  closingLede: 「全部」页支持搜索和按分类筛选。
  closingLink:
    text: 打开全部
    link: /works/
---

<script setup lang="ts">
import { data as catalog } from './catalog.data'
</script>

<HomePage :catalog="catalog" />
