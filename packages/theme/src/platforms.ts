import androidUrl from './assets/platforms/android.svg?url'
import appUrl from './assets/platforms/app.svg?url'
import appleUrl from './assets/platforms/apple.svg?url'
import chromeUrl from './assets/platforms/chrome.svg?url'
import desktopUrl from './assets/platforms/desktop.svg?url'
import edgeUrl from './assets/platforms/edge.svg?url'
import firefoxUrl from './assets/platforms/firefox.svg?url'
import miniprogramUrl from './assets/platforms/miniprogram.svg?url'
import terminalUrl from './assets/platforms/terminal.svg?url'
import wechatUrl from './assets/platforms/wechat.svg?url'
import windowsUrl from './assets/platforms/windows.svg?url'

/** Built-in platform marks — files under `assets/platforms/` (see SOURCES.md). */
export const platformIcons: Record<string, string> = {
  chrome: chromeUrl,
  web: chromeUrl,
  windows: windowsUrl,
  apple: appleUrl,
  macos: appleUrl,
  ios: appleUrl,
  android: androidUrl,
  terminal: terminalUrl,
  cli: terminalUrl,
  desktop: desktopUrl,
  app: appUrl,
  miniprogram: miniprogramUrl,
  wechat: wechatUrl,
  edge: edgeUrl,
  firefox: firefoxUrl,
}

/** Alias → built-in icon key */
const aliases: Record<string, string> = {
  web: 'web',
  chrome: 'chrome',
  chromium: 'chrome',
  浏览器: 'chrome',
  edge: 'edge',
  firefox: 'firefox',
  cli: 'cli',
  terminal: 'terminal',
  终端: 'terminal',
  命令行: 'cli',
  windows: 'windows',
  win: 'windows',
  win32: 'windows',
  macos: 'macos',
  mac: 'macos',
  osx: 'macos',
  apple: 'apple',
  ios: 'ios',
  iphone: 'ios',
  ipad: 'ios',
  android: 'android',
  安卓: 'android',
  app: 'app',
  apps: 'app',
  应用: 'app',
  桌面: 'desktop',
  desktop: 'desktop',
  桌面端: 'desktop',
  小程序: 'miniprogram',
  miniprogram: 'miniprogram',
  'mini-program': 'miniprogram',
  微信小程序: 'miniprogram',
  wechat: 'wechat',
  微信: 'wechat',
}

export type PlatformInput =
  | string
  | {
      /** Display label */
      label?: string
      text?: string
      /** Built-in icon key, or alias */
      icon?: string
      /** Raw SVG markup; wins over icon */
      svg?: string
      /** Image URL; wins over svg/icon */
      src?: string
    }

export interface PlatformBadge {
  label: string
  /** Prefer img src for stock logos */
  src?: string
  /** Custom inline SVG */
  svg?: string
  key: string
}

function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase()
}

function resolveIconKey(raw: string): string | undefined {
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (platformIcons[trimmed]) return trimmed
  if (platformIcons[normalizeKey(trimmed)]) return normalizeKey(trimmed)
  if (aliases[trimmed]) return aliases[trimmed]
  if (aliases[normalizeKey(trimmed)]) return aliases[normalizeKey(trimmed)]
  return undefined
}

function fallbackMark(label: string): string {
  const letter = (label.trim()[0] || '?').toUpperCase()
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#94a3b8"/><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" font-family="system-ui,sans-serif">${letter}</text></svg>`
}

export function resolvePlatform(input: PlatformInput): PlatformBadge {
  if (typeof input === 'string') {
    const label = input.trim()
    const key = resolveIconKey(label) || normalizeKey(label) || 'unknown'
    const src = platformIcons[key]
    if (src) return { label, src, key }
    return { label, svg: fallbackMark(label), key }
  }

  const label = String(input.label || input.text || '').trim() || 'Platform'
  if (input.src) {
    return { label, src: input.src, key: 'custom' }
  }
  if (input.svg) {
    return { label, svg: input.svg, key: 'custom' }
  }
  const fromIcon = input.icon ? resolveIconKey(input.icon) : undefined
  const fromLabel = resolveIconKey(label)
  const key = fromIcon || fromLabel || 'unknown'
  const src = platformIcons[key]
  if (src) return { label, src, key }
  return { label, svg: fallbackMark(label), key }
}

export function resolvePlatforms(list: PlatformInput[] | undefined | null): PlatformBadge[] {
  if (!Array.isArray(list)) return []
  return list.map(resolvePlatform)
}
