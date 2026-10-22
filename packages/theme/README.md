# @vibe-works/vitepress-theme

给「作品目录 + 付费工具占位」用的 VitePress 主题。浅色工具市场布局：粘性导航、左侧标题加右侧卡片、带统计的目录卡、01–04 步骤、示例报价，以及详情页右侧档位栏。

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
      { text: '作品', link: '/works/' },
      { text: '工具', link: '/tools/' },
    ],
    space: { text: '我的空间', link: '/space/' },
    footerNote: '页脚说明。',
    footerColumns: [
      { title: '目录', links: [{ text: '作品', link: '/works/' }] },
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

- `vite.ssr.noExternal`：`naive-ui`、`date-fns`、`vueuc`、`seemly`、`vooks`、`vdirs`、`evtd`、`@css-render/vue3-ssr`
- `postRender` / `transformHtml`：按 markdown 相对路径注入 Naive UI 的 SSR 样式

默认导出是 VitePress `Theme`。全局组件：`HomePage`、`CatalogPage`、`ServicesPage`、`SpacePage`、`TideDemo`。

## 页面怎么写

首页、目录、工具页把 `createContentLoader` 的结果传进组件。文案放在 frontmatter，不写进主题。

详情页设置 `kind: detail`。主题会套上图标、环境芯片、统计、标签页和右侧档位。正文 markdown 出现在「概览」。

常用字段：`catalog`（`work` | `service`）、`summary`、`category`、`platforms`、`accent`（`mint` `amber` `sea` `lilac` `clay` `ink`）、`priceLabel`、`stats`、`tags`、`scenes`、`highlights`、`faq`、`plans`、`action`（`overview` | `demo` | `waitlist`）、`railLabel`。

`plans[].disabled: true` 时，底部按钮打开说明，不会发起支付。

## 发布

包入口直接指向源码（`.ts` / `.vue`），让使用方的 VitePress 自己编译 `import.meta.env.SSR`。不要把主题预构建成一份只含客户端的 JS 再当作默认入口，否则服务端样式收集会失效。

```bash
pnpm --filter @vibe-works/vitepress-theme build
```

这条命令会做三件事：`vue-tsc` 类型检查、Vite library 构建（`dist/index.js`，可选的预览包）、以及 `dist/config.js`。站点配置实际加载的是 `dist/config.js`，所以开发和生产构建前都要先跑 `build:config`。

`pnpm pack` 会带上 `src/`、`dist/` 和本说明。消费方需要自行安装 peer：`vue@^3.5`、`vitepress@next`（或 1.6+）。

## 许可

MIT
