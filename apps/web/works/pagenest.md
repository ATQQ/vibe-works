---
title: 页栖 PageNest
kind: detail
catalog: work
summary: 本地优先的 Markdown 阅读、编辑与版本工作台，一行命令在浏览器里打开任意笔记目录。
category: Web应用
platforms: [CLI, Web]
accent: clay
icon: /icons/pagenest.svg
cover: /covers/pagenest.png
tags: [Markdown, React, Node.js, 开源, VibeCoding]
date: 2026-10-18
version: '0.1.0'
updated: 2026-10-31
featured: 7
actions:
  - label: npm
    icon: link
    href: https://www.npmjs.com/package/pagenest
  - label: GitHub
    icon: github
    href: https://github.com/ATQQ/pagenest
---

:::: tabs
::: tab 概览

![](/covers/pagenest.png)

直接读取本地目录里的 Markdown，用浏览器阅读、富文本编辑、源码编辑和版本回溯。正文始终以磁盘文件为准，不建数据库。

- 阅读 / 富文本 / Markdown 源码三种模式
- `⌘/Ctrl + K` 全文搜索，多标签页与章节收藏
- 保存前自动快照，历史 diff、版本恢复与冲突检测
- 八套阅读配色，另含 14 套主流文档站配色


快速使用：
```bash
npx pagenest
```

指定目录：
```bash
npx pagenest /path/to/notes
```

:::
::: tab 场景

适合在浏览器里舒服地读写本地笔记、项目文档，文件仍可继续用 Git、iCloud 或任意编辑器管理。

:::
::::
