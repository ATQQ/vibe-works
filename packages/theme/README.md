# @vibe-works/vitepress-theme

作品目录站用的 VitePress 主题：粘性导航、社交外链、作品卡片目录、详情页 MD tabs 与右侧 CTA。

交互组件来自 Naive UI。静态导出时用 `@css-render/vue3-ssr` 把组件样式收进每一页的 `<head>`。

## 站点里怎么接

```ts
// .vitepress/config.ts
import { withThemeConfig } from '@vibe-works/vitepress-theme/config'

export default withThemeConfig({
  title: '你的目录',
  description: '一句话说明。',
  themeConfig: {
    brand: '你的名字',
    nav: [
      { text: '首页', link: '/' },
      { text: '全部', link: '/works/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/you/repo' },
      { icon: 'x', link: 'https://x.com/you' },
    ],
    // space 可选；不配则不显示右上角 pill。也可用 Layout 插槽 nav-bar-extra。
    footerNote: '页脚说明。',
    footerColumns: [
      { title: '目录', links: [{ text: '全部', link: '/works/' }] },
    ],
  },
})
```

```ts
// .vitepress/theme/index.ts
import Theme from '@vibe-works/vitepress-theme'
import '@vibe-works/vitepress-theme/style.css'

export default Theme
```

`withThemeConfig` 会补上：

- `markdown.config`：`:::: tabs` / `::: tab` 容器
- `vite.ssr.noExternal`：Naive UI 相关包
- `postRender` / `transformHtml`：按 markdown 相对路径注入 SSR 样式

全局组件：`HomePage`、`CatalogPage`、`VWTabs`、`VWTab`（以及可选遗留的 `ServicesPage`、`SpacePage`、`TideDemo`）。

## 详情页

`kind: detail`。正文用 MD tabs（外层多一档冒号，避免嵌套闭合冲突）：

```md
:::: tabs
::: tab 概览
介绍…
:::
::: tab 场景
可选…
:::
::::
```

右侧 CTA 写在 frontmatter：

```yaml
actions:
  - label: 访问站点
    icon: link
    href: https://example.com
  - label: GitHub
    icon: github
    href: https://github.com/you/repo
  - label: 联系作者
    type: modal
    modalTitle: 联系
    modalContent: |
      微信 / 邮箱说明…
```

常用字段：`catalog`（`work` | `service`）、`summary`、`category`、`platforms`、`accent`（`mint` `amber` `sea` `lilac` `clay` `ink`）、`icon`、`tags`、`featured`、`order`、`actions`。

## 发布

包入口直接指向源码（`.ts` / `.vue`），让使用方的 VitePress 自己编译 `import.meta.env.SSR`。

```bash
pnpm --filter @vibe-works/vitepress-theme build
```

开发和生产构建前都要先跑 `build:config`（产出 `dist/config.js`）。

消费方 peer：`vue@^3.5`、`vitepress@next`（或 1.6+）。

## 许可

MIT
