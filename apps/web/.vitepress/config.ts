import { withThemeConfig } from '@vibe-works/vitepress-theme/config'

export default withThemeConfig({
  title: 'Vibe works',
  description: '作品演示与即将开放的工具目录。先看场景和交付物，付费档仍是占位。',
  themeConfig: {
    brand: 'Vibe works',
    caption: '作品与工具',
    nav: [
      { text: '首页', link: '/' },
      { text: '作品', link: '/works/' },
      { text: '工具', link: '/tools/' },
    ],
    space: { text: '我的空间', link: '/space/' },
    footerNote: '发现能直接上手的作品。付费工具仍是占位，这里不收款、不发授权码。',
    footerColumns: [
      {
        title: '目录',
        links: [
          { text: '首页', link: '/' },
          { text: '作品', link: '/works/' },
          { text: '工具', link: '/tools/' },
        ],
      },
      {
        title: '占位',
        links: [
          { text: '我的空间', link: '/space/' },
          { text: '服务说明', link: '/tools/' },
        ],
      },
      {
        title: '其他',
        links: [{ text: 'English stub', link: '/en/' }],
      },
    ],
  },
})
