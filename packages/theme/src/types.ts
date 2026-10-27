import type { PlatformInput } from './platforms'

export type { PlatformInput }

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
  platforms: PlatformInput[]
  accent: string
  icon?: string
  cover?: string
  tags: string[]
  /** 精选排序权重；未配置则不在首页精选展示 */
  featured?: number
  order: number
  stats?: CatalogStats
}

export interface LinkItem {
  text: string
  link: string
}

export interface SocialLink {
  /**
   * Built-in name (`github` / `x`), image URL (`https://…` / `/icon.png`),
   * or `{ svg }` / `{ src }`.
   */
  icon: string | { svg?: string; src?: string }
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

/** Footer bottom-bar text; optional link. */
export interface FooterTextLink {
  text: string
  link?: string
}

/**
 * Separate strip under footer nav columns.
 * Left: copyright · Center: beian · Right: extra links.
 */
export interface FooterBar {
  /** Fully custom; does not fall back to site title. */
  copyright?: string | FooterTextLink
  /** ICP / 备案等 */
  beian?: string | FooterTextLink
  links?: LinkItem[]
}

/**
 * Footer brand-column social channels (抖音 / B站 / 小红书 / 公众号…).
 * Hover shows QR: `qrImage` or generate from `qrContent`.
 */
export interface FooterChannel {
  /** Built-in key, or `{ src }` / `{ svg }` for custom logo */
  icon?: string | { src?: string; svg?: string }
  /** Accessible name; also used when icon is custom */
  label?: string
  /** Optional click-through when not only QR */
  link?: string
  /** Text/URL encoded into a QR image */
  qrContent?: string
  /** Direct QR image URL; wins over qrContent */
  qrImage?: string
  /** Caption under the QR in the hover card */
  qrTitle?: string
}

export interface VibeThemeConfig {
  brand?: string
  /** Brand mark image, e.g. `/logo.png` */
  logo?: string
  /** Brand click target; defaults to `/` */
  logoLink?: string
  caption?: string
  nav?: LinkItem[]
  space?: LinkItem
  socialLinks?: SocialLink[]
  footerNote?: string
  footerColumns?: { title: string; links: LinkItem[] }[]
  /** Under brand blurb: channel icons with optional QR hover */
  footerChannels?: FooterChannel[]
  /** Small label before channel icons, e.g. 「关注我」 */
  footerChannelsLabel?: string
  footerBar?: FooterBar
}
