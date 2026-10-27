/** Built-in social icons aligned with VitePress simple-icons subset. */
export const socialSvgs: Record<string, string> = {
  github:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
  twitter:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>',
  link: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4"/><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20"/></svg>',
  cart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.2 11h10.4L21 7H7"/></svg>',
}

export type SocialIconInput = string | { svg?: string; src?: string }

export type ResolvedSocialIcon =
  | { kind: 'svg'; value: string }
  | { kind: 'img'; value: string }

function looksLikeIconUrl(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  if (/^https?:\/\//i.test(v)) return true
  if (v.startsWith('//')) return true
  if (v.startsWith('/') || v.startsWith('./') || v.startsWith('../')) return true
  if (v.startsWith('data:image/')) return true
  return /\.(svg|png|jpe?g|webp|gif|ico)(\?.*)?$/i.test(v)
}

/** Prefer SVG markup for built-ins; image URL for http(s) / relative paths. */
export function resolveSocialIcon(icon: SocialIconInput): ResolvedSocialIcon {
  if (typeof icon === 'object' && icon) {
    if (icon.src?.trim()) return { kind: 'img', value: icon.src.trim() }
    if (icon.svg?.trim()) return { kind: 'svg', value: icon.svg }
  }

  const raw = String(icon ?? '').trim()
  if (looksLikeIconUrl(raw)) return { kind: 'img', value: raw }

  const key = raw.toLowerCase()
  return { kind: 'svg', value: socialSvgs[key] || socialSvgs.link }
}

/** @deprecated Prefer resolveSocialIcon; kept for action buttons expecting SVG markup. */
export function resolveSocialSvg(icon: SocialIconInput): string {
  const resolved = resolveSocialIcon(icon)
  if (resolved.kind === 'svg') return resolved.value
  // Image URL passed into SVG slot — wrap as <img> via outer caller; fallback glyph here.
  return socialSvgs.link
}
