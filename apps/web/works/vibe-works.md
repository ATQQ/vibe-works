---
title: Vibe 作品集
kind: detail
catalog: work
summary: 就是你正在看的这个站点：基于 VitePress 的作品集模板，写 Markdown 就能上架作品，纯静态。
category: Web应用
platforms: [Web]
accent: lilac
icon: /logo.svg
cover: /covers/vibe-works.png
tags: [VitePress, Vue, VibeCoding]
date: 2026-10-22
version: '0.1.1'
updated: 2026-10-31
featured: 6
actions:
  - label: 访问站点
    icon: link
    href: https://vibework.sugarat.top
  - label: GitHub
    icon: github
    href: https://github.com/ATQQ/vibe-works
  - label: VitePress 主题定制咨询
    icon: mail
    type: modal
    modalTitle: VitePress 主题定制咨询
    modalContent: |
      主题本身免费开源。需要定制 VitePress 主题或站点，扫码加微信咨询。
      添加时备注「主题定制」。
    modalImage: /wechat-qr.png
---

:::: tabs
::: tab 概览

![](/covers/vibe-works.png)

就是你正在看的这个站点。基于 **VitePress** 的作品集模板，每个作品一份 Markdown，写好就能上架。

- 首页滚动卡片、精选作品、全部列表支持搜索与分类筛选
- 纯静态 SSG，深色模式，移动端适配

快速使用：
```bash
pnpm create @sugarat/vibework-theme my-site
cd my-site
pnpm install
pnpm dev
```

:::
::: tab 使用

**新建站点**

```bash
pnpm create @sugarat/vibework-theme my-site
```

不传目录时会询问目录名，随后询问站点标题。生成后在 `works/` 下每个作品写一份 Markdown，`.vitepress/config.ts` 里改站点名、导航和页脚。

**接入已有 VitePress 站点**

```bash
pnpm add @sugarat/vitepress-theme-vibework vitepress vue
```

```ts
// .vitepress/config.ts
import { withThemeConfig } from '@sugarat/vitepress-theme-vibework/config'

export default withThemeConfig({
  title: '我的作品集',
  themeConfig: { /* ... */ },
})
```

```ts
// .vitepress/theme/index.ts
import Theme from '@sugarat/vitepress-theme-vibework'
import '@sugarat/vitepress-theme-vibework/style.css'

export default Theme
```

完整配置见 [主题文档](https://github.com/ATQQ/vibe-works/tree/main/packages/theme)。

:::
::: tab 场景

适合想快速搭一个个人作品集、产品展示页的朋友。

:::
::::
