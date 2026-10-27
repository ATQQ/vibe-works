---
title: 全部作品
description: 按分类浏览作品，搜索只在本机过滤。
catalog:
  crumb: 全部
  title: 全部作品
  lede: 搜索与分类只在这台浏览器里过滤，没有账号。
  scope: work
---

<script setup lang="ts">
import { data as catalog } from '../catalog.data'
</script>

<CatalogPage :catalog="catalog" scope="work" />
