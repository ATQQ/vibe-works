---
title: 全部作品
description: 按分类、标签浏览作品。
catalog:
  crumb: 全部
  title: 全部作品
  lede: 支持搜索、分类与标签筛选。
  scope: work
---

<script setup lang="ts">
import { data as catalog } from '../catalog.data'
</script>

<CatalogPage :catalog="catalog" scope="work" />
