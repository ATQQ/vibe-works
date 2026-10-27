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
  icon?: string
  cover?: string
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
        return {
          url: page.url,
          title: String(frontmatter.title ?? ''),
          summary: String(frontmatter.summary ?? ''),
          catalog: frontmatter.catalog === 'service' ? 'service' : 'work',
          category: String(frontmatter.category ?? ''),
          recommend: Boolean(frontmatter.recommend),
          platforms: Array.isArray(frontmatter.platforms) ? frontmatter.platforms.map(String) : [],
          accent: String(frontmatter.accent ?? 'mint'),
          icon: frontmatter.icon ? String(frontmatter.icon) : undefined,
          cover: frontmatter.cover ? String(frontmatter.cover) : undefined,
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
          featured: Boolean(frontmatter.featured),
          order: Number(frontmatter.order ?? 0),
        }
      })
      .sort((a, b) => a.order - b.order)
  },
})
