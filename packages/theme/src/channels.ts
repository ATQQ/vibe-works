import bilibiliUrl from './assets/channels/bilibili.svg?url'
import douyinUrl from './assets/channels/douyin.svg?url'
import wechatUrl from './assets/channels/wechat.svg?url'
import xiaohongshuUrl from './assets/channels/xiaohongshu.svg?url'
import type { FooterChannel } from './types'

const builtIn: Record<string, string> = {
  bilibili: bilibiliUrl,
  b站: bilibiliUrl,
  哔哩哔哩: bilibiliUrl,
  douyin: douyinUrl,
  抖音: douyinUrl,
  tiktok: douyinUrl,
  xiaohongshu: xiaohongshuUrl,
  小红书: xiaohongshuUrl,
  red: xiaohongshuUrl,
  wechat: wechatUrl,
  weixin: wechatUrl,
  微信: wechatUrl,
  公众号: wechatUrl,
  gongzhonghao: wechatUrl,
  official: wechatUrl,
}

const labels: Record<string, string> = {
  bilibili: 'Bilibili',
  douyin: '抖音',
  xiaohongshu: '小红书',
  wechat: '公众号',
  weixin: '公众号',
  公众号: '公众号',
  gongzhonghao: '公众号',
}

export interface ResolvedChannel {
  key: string
  label: string
  iconSrc?: string
  iconSvg?: string
  link?: string
  qrSrc?: string
  qrTitle?: string
  tone: string
}

function toneFor(key: string): string {
  if (key.includes('bili') || key === 'b站' || key === '哔哩哔哩') return 'bilibili'
  if (key.includes('douyin') || key.includes('抖音') || key.includes('tiktok')) return 'douyin'
  if (key.includes('xiao') || key.includes('小红') || key === 'red') return 'xiaohongshu'
  if (key.includes('wechat') || key.includes('wei') || key.includes('公众') || key.includes('gong')) return 'wechat'
  return 'neutral'
}

function qrImageFromContent(content: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=10&data=${encodeURIComponent(content)}`
}

export function resolveChannel(input: FooterChannel, index: number): ResolvedChannel {
  const iconKey = typeof input.icon === 'string' ? input.icon.trim() : ''
  const key = (iconKey || input.label || `channel-${index}`).toLowerCase()
  const label =
    input.label?.trim() ||
    labels[iconKey] ||
    labels[key] ||
    iconKey ||
    `渠道 ${index + 1}`

  let iconSrc: string | undefined
  let iconSvg: string | undefined
  if (input.icon && typeof input.icon === 'object') {
    if (input.icon.src) iconSrc = input.icon.src
    else if (input.icon.svg) iconSvg = input.icon.svg
  } else if (iconKey) {
    iconSrc = builtIn[iconKey] || builtIn[key] || builtIn[iconKey.toLowerCase()]
  }

  const qrSrc = input.qrImage?.trim()
    ? input.qrImage.trim()
    : input.qrContent?.trim()
      ? qrImageFromContent(input.qrContent.trim())
      : undefined

  return {
    key,
    label,
    iconSrc,
    iconSvg,
    link: input.link,
    qrSrc,
    qrTitle: input.qrTitle?.trim() || undefined,
    tone: toneFor(key),
  }
}

export function resolveChannels(list: FooterChannel[] | undefined | null): ResolvedChannel[] {
  if (!Array.isArray(list)) return []
  return list.map(resolveChannel)
}
