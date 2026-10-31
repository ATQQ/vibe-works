# @sugarat/vitepress-theme-vibework

作品目录站用的 VitePress 主题：粘性导航、社交外链、作品卡片目录、详情页 MD tabs 与右侧 CTA。

交互组件来自 Naive UI。静态导出时用 `@css-render/vue3-ssr` 把组件样式收进每一页的 `<head>`。

## 站点里怎么接

```bash
pnpm add @sugarat/vitepress-theme-vibework vitepress vue
```

```ts
// .vitepress/config.ts
import { withThemeConfig } from '@sugarat/vitepress-theme-vibework/config'

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
      // icon 也可用图片：相对路径或 http(s)
      // { icon: '/icons/juejin.svg', link: 'https://juejin.cn/...', ariaLabel: '掘金' },
      // { icon: { src: 'https://example.com/logo.png' }, link: 'https://...' },
    ],
    // space 可选；不配则不显示右上角 pill。也可用 Layout 插槽 nav-bar-extra。
    footerNote: '页脚说明。',
    footerColumns: [
      { title: '目录', links: [{ text: '全部', link: '/works/' }] },
    ],
    // 品牌说明下的渠道：小标题 + 横向图标；hover 出二维码
    footerChannelsLabel: '关注我',
    footerChannels: [
      {
        icon: 'wechat', // douyin | bilibili | xiaohongshu | zhihu | wechat / 公众号
        qrImage: 'https://example.com/qr.png', // 或 qrContent: 'https://...'
        qrTitle: '关注公众号',
      },
      {
        icon: { src: '/my-logo.png' }, // 自定义 logo
        label: '自定义',
        qrContent: 'https://example.com',
        qrTitle: '扫码关注',
        link: 'https://example.com',
      },
    ],
    // 与上方导航列分开的底栏：左版权 · 中备案 · 右链接
    footerBar: {
      copyright: { text: '© 2026 你的名字', link: 'https://example.com' },
      beian: { text: '京ICP备xxxxxxxx号', link: 'https://beian.miit.gov.cn/' },
      links: [
        { text: '隐私政策', link: '/privacy' },
        { text: '服务条款', link: '/terms' },
      ],
      // 右侧默认展示主题名与版本，链接到主题介绍；设为 false 关闭
      // themeVersion: false,
    },
  },
})
```

```ts
// .vitepress/theme/index.ts
import Theme from '@sugarat/vitepress-theme-vibework'
import '@sugarat/vitepress-theme-vibework/style.css'

export default Theme
```

`withThemeConfig` 会补上：

- `markdown.config`：`:::: tabs` / `::: tab` 容器
- `vite.ssr.noExternal`：Naive UI 相关包
- `vite.optimizeDeps.include`：启动时预构建 Naive UI，避免首次打开页面时等待依赖优化
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

右侧栏写在 frontmatter：按钮用 `actions`，小程序码等媒体用 `railCard`。

```yaml
railCard:
  title: 微信小程序
  text: 微信扫码即可打开
  image: /qr/demo.jpg   # 或 qrImage
  caption: 扫码打开
  icon: wechat          # 可选：wechat / 图片路径
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

常用字段：`catalog`（`work` | `service`）、`summary`、`category`、`platforms`、`accent`（`mint` `amber` `sea` `lilac` `clay` `ink`）、`icon`、`tags`、`featured`（数字，越小越靠前；不配则不进首页精选）、`order`、`actions`、`railCard`。

`platforms` 支持字符串自动匹配图标，或对象自定义。内置 logo 来自 Google / Devicon / MingCute / Simple Icons 等现成资源（见 `src/assets/platforms/SOURCES.md`）：

```yaml
platforms:
  - Web          # → Chrome 官方标
  - CLI          # → 终端
  - Windows
  - macOS
  - iOS
  - Android
  - 小程序       # → MingCute 小程序标
  - label: 自研端
    icon: desktop
  - label: 特殊
    src: /my-icon.svg
```

## 发布

```bash
pnpm --filter @sugarat/vitepress-theme-vibework publish
```

`prepack` 会先跑 `build`：mkdist 把 `src` 逐文件转到 `dist`，`.ts` 转 `.js`，`.vue` 保留 SFC 只剥掉 TS，并生成类型声明。和 VitePress 默认主题一样，`.vue` 与 `import.meta.env.SSR` 交给使用方的 Vite 编译，不预打包。

仓库内 `exports` 指向 `src`，改主题无需构建；发布时由 `publishConfig.exports` 换成 `dist`。站点 `dev` / `build` 前的 `build:config` 只为本地产出 `dist/config.js`。

消费方 peer：`vue@^3.5`、`vitepress@^1.6` 或 `vitepress@next`。

## 许可

MIT
