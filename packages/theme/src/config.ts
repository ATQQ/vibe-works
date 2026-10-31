import type { UserConfig } from 'vitepress'
import pkg from '../package.json' with { type: 'json' }
import { registerTabsContainers } from './markdown/tabs'

const { homepage, name, version } = pkg

const collectedStyles = new Map<string, string>()

const themeBoot = `(() => { try { if (localStorage.getItem('vw-theme') === 'dark') document.documentElement.classList.add('dark') } catch (e) {} })()`

const naivePackages = [
  'naive-ui',
  'date-fns',
  'vueuc',
  'seemly',
  'vooks',
  'vdirs',
  'evtd',
  '@css-render/vue3-ssr',
  '@sugarat/vitepress-theme-vibework',
]

/**
 * Merge a site config with the theme's SSG hooks.
 * Naive UI prints component CSS during SSR; `postRender` keeps it and
 * `transformHtml` moves it into `<head>`, keyed by the markdown path
 * so nested `index.html` files do not collide.
 */
export function withThemeConfig(user: UserConfig = {}): UserConfig {
  const userNoExternal = user.vite?.ssr?.noExternal
  const extra = Array.isArray(userNoExternal)
    ? userNoExternal.filter((item): item is string => typeof item === 'string')
    : []

  const userMarkdownConfig = user.markdown?.config
  const userHead = user.head ?? []
  const userHasIcon = userHead.some(
    (item) =>
      Array.isArray(item) &&
      item[0] === 'link' &&
      typeof item[1] === 'object' &&
      item[1] !== null &&
      'rel' in item[1] &&
      String((item[1] as { rel?: string }).rel) === 'icon',
  )

  const config: UserConfig = {
    lang: 'zh-CN',
    title: 'Vibe works',
    description: '作品展示与介绍。',
    cleanUrls: true,
    appearance: false,
    ...user,
    head: [
      ['meta', { name: 'theme-color', content: '#1da350' }],
      ...(userHasIcon
        ? []
        : ([['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]] as typeof userHead)),
      ['script', {}, themeBoot],
      ...userHead,
    ],
    markdown: {
      ...user.markdown,
      config(md) {
        registerTabsContainers(md)
        userMarkdownConfig?.(md)
      },
    },
    vite: {
      ...user.vite,
      define: {
        __VW_THEME_INFO__: JSON.stringify({ label: `${name.replace(/^@[^/]+\//, '')}@${version}`, link: homepage }),
        ...user.vite?.define,
      },
      server: {
        fs: { allow: ['../..'] },
        ...user.vite?.server,
      },
      optimizeDeps: {
        ...user.vite?.optimizeDeps,
        // Excluded packages are not scanned, so their deps must be listed or they get discovered on first page load.
        include: [
          '@sugarat/vitepress-theme-vibework > naive-ui',
          '@sugarat/vitepress-theme-vibework > @css-render/vue3-ssr',
          ...(user.vite?.optimizeDeps?.include ?? []),
        ],
        exclude: [
          '@sugarat/vitepress-theme-vibework',
          ...(user.vite?.optimizeDeps?.exclude ?? []),
        ],
      },
      ssr: {
        ...user.vite?.ssr,
        noExternal: [...naivePackages, ...extra],
      },
    },
    postRender(context) {
      const styleRegex = /<css-render-style>([\s\S]*?)<\/css-render-style>/
      const pathRegex = /<vitepress-path data-path="([^"]*)">[\s\S]*?<\/vitepress-path>/
      // Client renders `<SsrMarkers v-if>` as a single comment, so the SSR fragment wrapper must collapse to one too.
      const markersRegex = /<!--\[--><css-render-style>[\s\S]*?<\/vitepress-path><!--\]-->/
      const style = styleRegex.exec(context.content)?.[1]
      const key = pathRegex.exec(context.content)?.[1]
      if (style && key) collectedStyles.set(key, style)
      context.content = context.content
        .replace(markersRegex, '<!---->')
        .replace(styleRegex, '')
        .replace(pathRegex, '')
      return user.postRender?.(context)
    },
    async transformHtml(code, id, ctx) {
      const page = ctx.page
      const style = collectedStyles.get(page)
      const next = style ? code.replace('</head>', `${style}</head>`) : code
      const userResult = await user.transformHtml?.(next, id, ctx)
      return userResult ?? next
    },
  }
  return config
}
