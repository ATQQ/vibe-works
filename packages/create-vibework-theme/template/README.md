# {{title}}

用 [@sugarat/vitepress-theme-vibework](https://github.com/ATQQ/vibe-works) 搭建的作品集。

```bash
pnpm install
pnpm dev
pnpm build
```

用 npm 也一样：`npm install`、`npm run dev`、`npm run build`。

## 怎么改

| 想改的 | 文件 |
| --- | --- |
| 站点名、导航、页脚、社交链接 | `.vitepress/config.ts` |
| 首页文案 | `index.md` |
| 作品 | `works/*.md`，一个作品一份 |
| 普通页面 | `about.md`（`plain: true`） |
| 图片、二维码 | `public/` |

示例内容来自 [粥里有勺糖的作品集](https://vibework.sugarat.top)，换成自己的即可。`works/miaowa.md` 里有全部字段的注释，完整说明见 [主题文档](https://github.com/ATQQ/vibe-works/tree/main/packages/theme)。
