import { createContentLoader } from 'vitepress'

export interface CatalogItem {
  url: string
  title: string
  summary: string
  catalog: 'work' | 'service'
  category: string
  recommend?: boolean
  platforms: string[]
  accent: string
  priceLabel: string
  trial?: string
  stats: {
    downloads: string
    views: string
    rating: string
    users: string
  }
  tags: string[]
  featured?: boolean
  order: number
}

declare const data: CatalogItem[]
export { data }

export default createContentLoader('**/*.md', {
  transform(raw): CatalogItem[] {
    return raw
      .filter((page) => page.frontmatter.kind === 'detail')
      .map((page) => {
        const frontmatter = page.frontmatter
        const stats = (frontmatter.stats ?? {}) as Record<string, string>
        return {
          url: page.url,
          title: String(frontmatter.title ?? ''),
          summary: String(frontmatter.summary ?? ''),
          catalog: frontmatter.catalog === 'service' ? 'service' : 'work',
          category: String(frontmatter.category ?? ''),
          recommend: Boolean(frontmatter.recommend),
          platforms: Array.isArray(frontmatter.platforms) ? frontmatter.platforms.map(String) : [],
          accent: String(frontmatter.accent ?? 'mint'),
          priceLabel: String(frontmatter.priceLabel ?? ''),
          trial: frontmatter.trial ? String(frontmatter.trial) : undefined,
          stats: {
            downloads: String(stats.downloads ?? '—'),
            views: String(stats.views ?? '—'),
            rating: String(stats.rating ?? '—'),
            users: String(stats.users ?? '—'),
          },
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
          featured: Boolean(frontmatter.featured),
          order: Number(frontmatter.order ?? 0),
        }
      })
      .sort((a, b) => a.order - b.order)
  },
})
