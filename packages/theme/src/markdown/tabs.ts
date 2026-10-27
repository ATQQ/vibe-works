import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

/**
 * Register tabs / tab Title containers that emit VWTabs / VWTab.
 * Nest with more colons on the outer fence so closings don't collide:
 *
 * :::: tabs
 * ::: tab 概览
 * ...
 * :::
 * ::::
 */
export function registerTabsContainers(md: MarkdownIt) {
  // markdown-it / @types mismatch between container plugin and vitepress; cast plugin.
  const use = md.use.bind(md) as (plugin: unknown, ...params: unknown[]) => MarkdownIt

  use(container, 'tabs', {
    validate(params: string) {
      return /^tabs\s*$/.test(params.trim())
    },
    render(tokens: { nesting: number }[], idx: number) {
      return tokens[idx].nesting === 1 ? '<VWTabs>\n' : '</VWTabs>\n'
    },
  })

  use(container, 'tab', {
    validate(params: string) {
      return /^tab\s+.+$/.test(params.trim())
    },
    render(tokens: { nesting: number; info: string }[], idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        const title = token.info.trim().replace(/^tab\s+/, '').trim()
        const escaped = md.utils.escapeHtml(title)
        return `<VWTab title="${escaped}">\n`
      }
      return '</VWTab>\n'
    },
  })
}
