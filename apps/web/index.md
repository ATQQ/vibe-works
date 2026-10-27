---
# title: 粥里有勺糖 - 作品集
# description: 作品展示与介绍。
home:
  eyebrow: Vibe 作品集
  title: 能玩的作品，都在这里
  lede: APP、CLI、网站、都有。部分 GitHub 开源。
  primary:
    text: 浏览全部
    link: /works/
  # secondary:
  #   text: GitHub
  #   link: https://github.com/ATQQ/sugar-blog
  # checks:
  #   - 9 个作品
  #   - 纯静态，无账号
  #   - 外链到站点与仓库
  perks:
    - icon: filter
      title: 类型不少
      text: App、CLI、网站与主题都有，按兴趣挑着看。
    - icon: play
      title: 能打开试用
      text: 多数有线上地址，点进去就能上手玩。
    - icon: link
      title: 大部分开源
      text: 欢迎 Star、Fork、PR。
    - icon: chat
      title: 联系我
      text: 底部有微信二维码。
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
