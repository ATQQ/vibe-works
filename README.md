# Vibe works

中文作品目录，外加还不能购买的服务占位。静态站点，用 VitePress 生成。

视觉是浅色工具市场：粘性导航、大标题、作品卡片、四步说明、一笔示例报价，以及详情页右侧的档位栏。主题在 `packages/theme`，站点只通过包名引用它。

## 目录

```
apps/web                 VitePress 内容与一份很薄的配置
packages/theme           @vibe-works/vitepress-theme
```

## 本地运行

需要 Node.js 22+ 和 pnpm 10。

```bash
pnpm install
pnpm --filter web dev
```

开发地址：<http://127.0.0.1:4391>

```bash
pnpm --filter web build
pnpm --filter web preview
```

`dev` / `build` 会先编译主题的配置入口（`dist/config.js`）。完整的主题检查：

```bash
pnpm --filter @vibe-works/vitepress-theme build
```

## 主题以后怎么卖

见 [packages/theme/README.md](packages/theme/README.md)。站点侧只保留：

- `apps/web/.vitepress/config.ts` 调用 `withThemeConfig`
- `apps/web/.vitepress/theme/index.ts` 导入默认主题和 `style.css`
- markdown 与 `catalog.data.ts`

## 页面

| 路径 | 内容 |
| --- | --- |
| `/` | 首页 |
| `/works/` | 作品目录，可搜索、按分类过滤 |
| `/works/tide` | 案例详情，含页内演示 |
| `/tools/` | 付费服务占位与本地等候邮箱 |
| `/space/` | 我的空间，无登录无订单 |
| `/en/` | 英文占位 |

没有支付、账号或授权码。邮箱写在浏览器 `localStorage`。

## VitePress @next 上碰到的点

- 官方 Naive UI + VitePress 示例用页面文件名当样式键，多个 `index.html` 会互相覆盖。这里改成按 `pageData.relativePath` 对应。
- `import.meta.env.SSR` 必须由 VitePress 在编译主题源码时替换。所以包的默认入口是 `src`，不是预构建的客户端包。
- Naive UI 在 SSR 里要放进 `ssr.noExternal`，连带 `date-fns`、`vueuc`、`seemly`、`vooks`、`vdirs`。
- 配置文件跑在 Node 里，不能直接 import `.ts`。`withThemeConfig` 单独编成 `dist/config.js`。

## 还没做

- 真封面图（现在是按分类生成的界面示意）
- 完整英文
- 深色模式只做了变量和 Naive 主题切换，不是默认外观
- 目录筛选不进静态 URL
