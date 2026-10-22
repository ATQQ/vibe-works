---
title: 作品
description: 按场景浏览 Vibe works 的案例。每件都写了适合谁、交付物和定价占位。
catalog:
  crumb: 作品
  title: 作品目录
  lede: 五件可以打开的案例。搜索和分类只在这台浏览器里过滤，没有账号。
  scope: work
---

<script setup lang="ts">
import { data as catalog } from '../catalog.data'
</script>

<CatalogPage :catalog="catalog" scope="work" />
