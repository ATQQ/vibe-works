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
  icon?: string
  cover?: string
  tags: string[]
  featured?: boolean
  order: number
  stats?: CatalogStats
}

export interface LinkItem {
  text: string
  link: string
}

export interface SocialLink {
  icon: string | { svg: string }
  link: string
  ariaLabel?: string
}

export interface ActionItem {
  label: string
  icon?: string
  href?: string
  type?: 'link' | 'modal'
  modalTitle?: string
  modalContent?: string
}

export interface HomePerk {
  title: string
  text: string
  /** filter | doc | play | shield | link | chat */
  icon?: string
}

export interface HomeCopy {
  eyebrow?: string
  title?: string
  lede?: string
  primary?: LinkItem
  secondary?: LinkItem
  checks?: string[]
  perks?: HomePerk[]
  featuredTitle?: string
  featuredLede?: string
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

export interface QuoteLine {
  label: string
  value: string
  mute?: boolean
}

/** Kept for optional ServicesPage; site demos no longer use it. */
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

export interface VibeThemeConfig {
  brand?: string
  caption?: string
  nav?: LinkItem[]
  space?: LinkItem
  socialLinks?: SocialLink[]
  footerNote?: string
  footerColumns?: { title: string; links: LinkItem[] }[]
}
