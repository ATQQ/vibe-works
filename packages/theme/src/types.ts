export interface CatalogStats {
  downloads: string
  views: string
  rating: string
  users: string
}

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
  stats: CatalogStats
  tags: string[]
  featured?: boolean
  order: number
}

export interface LinkItem {
  text: string
  link: string
}

export interface StepItem {
  title: string
  text: string
}

export interface QuoteLine {
  label: string
  value: string
  mute?: boolean
}

export interface HomeCopy {
  eyebrow?: string
  title?: string
  lede?: string
  primary?: LinkItem
  secondary?: LinkItem
  checks?: string[]
  featuredTitle?: string
  featuredLede?: string
  featuredMore?: LinkItem
  stepsTitle?: string
  stepsLede?: string
  steps?: StepItem[]
  offerTitle?: string
  offerLede?: string
  offerPoints?: string[]
  offerLink?: LinkItem
  quoteTitle?: string
  quoteLines?: QuoteLine[]
  quoteTotal?: QuoteLine
  closingTitle?: string
  closingLede?: string
  closingLink?: LinkItem
}

export interface CatalogCopy {
  crumb?: string
  title?: string
  lede?: string
  scope?: 'work' | 'service' | 'all'
}

export interface ServicesCopy {
  crumb?: string
  title?: string
  lede?: string
  alert?: string
  offerTitle?: string
  offerLede?: string
  offerPoints?: string[]
  quoteTitle?: string
  quoteLines?: QuoteLine[]
  quoteTotal?: QuoteLine
}

export interface PlanItem {
  id: string
  name: string
  price: string
  period?: string
  devices?: string
  badge?: string
  note?: string
  disabled?: boolean
}

export interface SceneItem {
  title: string
  text: string
}

export interface NoteItem {
  title: string
  text: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface VibeThemeConfig {
  brand?: string
  caption?: string
  nav?: LinkItem[]
  space?: LinkItem
  footerNote?: string
  footerColumns?: { title: string; links: LinkItem[] }[]
}
