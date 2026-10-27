import { createContentLoader } from 'vitepress'

export type PlatformInput =
  | string
  | {
      label?: string
      text?: string
      icon?: string
      svg?: string
    }

export interface CatalogItem {
  url: string
  title: string
  summary: string
  catalog: 'work' | 'service'
  category: string
  recommend?: boolean
  platforms: PlatformInput[]
  accent: string
  icon?: string
  cover?: string
  tags: string[]
  featured?: boolean
  order: number
}

function normalizePlatforms(raw: unknown): PlatformInput[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') return String(item)
      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>
        return {
          label: obj.label != null ? String(obj.label) : obj.text != null ? String(obj.text) : undefined,
          text: obj.text != null ? String(obj.text) : undefined,
          icon: obj.icon != null ? String(obj.icon) : undefined,
          svg: obj.svg != null ? String(obj.svg) : undefined,
        }
      }
      return null
    })
    .filter((item): item is PlatformInput => item != null)
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
          platforms: normalizePlatforms(frontmatter.platforms),
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
