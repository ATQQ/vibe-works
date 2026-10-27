import { withThemeConfig } from '@vibe-works/vitepress-theme/config'

export default withThemeConfig({
  title: 'Vibe works',
  description: '作品展示与介绍。',
  themeConfig: {
    brand: 'Vibe works',
    caption: '作品展示',
    nav: [
      { text: '首页', link: '/' },
      { text: '全部', link: '/works/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ATQQ/sugar-blog' },
      { icon: 'x', link: 'https://x.com/Mr_XiaoZou' },
    ],
    footerNote: '展示做过的作品，并链到独立站点与开源仓库。',
    footerColumns: [
      {
        title: '目录',
        links: [
          { text: '首页', link: '/' },
          { text: '全部', link: '/works/' },
        ],
      },
      {
        title: '外链',
        links: [
          { text: 'GitHub', link: 'https://github.com/ATQQ/sugar-blog' },
          { text: '博客', link: 'https://sugarat.top' },
        ],
      },
    ],
  },
})
