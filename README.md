# Vibe Works

基于 VitePress 的个人作品集站点与主题。每个作品一份 Markdown，写好就能上架，纯静态部署。

在线预览：<https://vibework.sugarat.top>

![](apps/web/public/covers/vibe-works.png)

## 特性

- 首页滚动卡片与精选作品
- 作品目录：搜索、分类与标签筛选
- 详情页：Markdown tabs、右侧操作按钮（外链 / 弹窗二维码）、小程序码卡片
- GitHub 按钮自动显示 Star 数
- 平台图标、页脚社交渠道与二维码
- 深色模式、移动端适配
- Naive UI 组件，SSG 时样式注入每页 `<head>`

## 仓库结构

```
apps/web          作品集站点（内容与配置）
packages/theme    主题包 @sugarat/vitepress-theme-vibework
scripts           辅助脚本
```

## 本地开发

需要 Node.js 22+ 和 pnpm 10。

```bash
pnpm install
pnpm dev        # http://127.0.0.1:4391
pnpm build
pnpm preview
```

## 添加作品

在 `apps/web/works/` 下新建一份 Markdown：

```md
---
title: 作品名
kind: detail
catalog: work
summary: 一句话介绍
category: Web应用
platforms: [Web]
icon: /logo.svg
cover: /covers/demo.png
tags: [Vue]
actions:
  - label: 访问站点
    icon: link
    href: https://example.com
  - label: GitHub
    icon: github
    href: https://github.com/you/repo
---

:::: tabs
::: tab 概览
介绍…
:::
::::
```

完整字段见 [主题文档](packages/theme/README.md)。

`pnpm sync:updated` 会通过 `gh` CLI 读取各作品仓库的最近提交与版本号，加 `--write` 回写到 frontmatter。

## 在自己的站点使用主题

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

配置项与组件说明见 [packages/theme/README.md](packages/theme/README.md)，`apps/web` 是一份完整示例。

## 实现说明

- `import.meta.env.SSR` 需要由使用方的 VitePress 编译时替换，所以主题不预打包。仓库内入口指向 `src`；发布时照 VitePress 默认主题的做法用 mkdist 逐文件转到 `dist`：`.ts` 转 `.js`，`.vue` 只剥掉 TS。
- Naive UI 在 SSR 里要放进 `ssr.noExternal`，连带 `date-fns`、`vueuc`、`seemly`、`vooks`、`vdirs`，`withThemeConfig` 已处理。
- 官方 Naive UI + VitePress 示例用页面文件名当样式键，多个 `index.html` 会互相覆盖。这里改成按 markdown 相对路径对应。

## 发布主题

```bash
pnpm --filter @sugarat/vitepress-theme-vibework publish
```

`prepack` 会先构建 `dist`。

## 许可

[MIT](LICENSE)
