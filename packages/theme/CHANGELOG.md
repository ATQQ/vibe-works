# @sugarat/vitepress-theme-vibework

## 0.1.1

### Patch Changes

- 853c74e: `withThemeConfig` 启动时预构建 Naive UI，dev 首次打开页面不再等待依赖优化与整页刷新
- 页脚底栏右侧默认展示主题名与版本，点击跳转主题介绍；`footerBar.themeVersion: false` 可关闭

## 0.1.0

首次发布。

- 首页：滚动卡片、精选作品、卖点卡片与底部引导
- 作品目录：搜索、分类与标签筛选
- 详情页：Markdown tabs、右侧操作按钮（外链 / 弹窗二维码）、小程序码卡片、版本与更新时间
- GitHub 按钮自动显示 Star 数
- 内置平台图标与页脚社交渠道（公众号、B站、小红书、抖音、知乎），悬停显示二维码
- 深色模式、移动端适配
- `withThemeConfig`：Naive UI SSR 样式按页注入 `<head>`
