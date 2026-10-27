import { withThemeConfig } from '@vibe-works/vitepress-theme/config'

export default withThemeConfig({
  title: '粥里有勺糖 - 作品集',
  description:
    '粥里有勺糖的个人作品集：收录 App、CLI、网站与开源工具，含介绍、适用场景与 GitHub / 独立站入口，方便快速了解与试用。',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg?v=2', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
  ],
  themeConfig: {
    brand: '粥里有勺糖 - 作品集',
    logo: '/logo.svg',
    logoLink: 'https://sugarat.top',
    caption: '作品展示',
    nav: [
      { text: '首页', link: '/' },
      { text: '全部', link: '/works/' },
    ],
    socialLinks: [
      { icon: '/logo.svg', link: 'https://sugarat.top' },
      { icon: 'github', link: 'https://github.com/ATQQ' },
      { icon: 'x', link: 'https://x.com/Mr_XiaoZou' },
    ],
    footerNote: '展示做过的作品，并链到独立站点与开源仓库。',
    footerChannelsLabel: '关注我',
    footerChannels: [
      {
        icon: 'wechat',
        label: '公众号',
        // qrImage: 'https://example.com/wechat-qr.png', // 优先用图片
        qrContent: 'https://sugarat.top',
        qrTitle: '关注公众号',
      },
      {
        icon: 'bilibili',
        label: 'Bilibili',
        link: 'https://space.bilibili.com',
        qrContent: 'https://space.bilibili.com',
        qrTitle: 'B站主页',
      },
      {
        icon: 'xiaohongshu',
        label: '小红书',
        qrContent: 'https://www.xiaohongshu.com',
        qrTitle: '小红书',
      },
      {
        icon: 'douyin',
        label: '抖音',
        qrContent: 'https://www.douyin.com',
        qrTitle: '抖音',
      },
    ],
    footerColumns: [
      // {
      //   title: '目录',
      //   links: [
      //     { text: '首页', link: '/' },
      //     { text: '全部', link: '/works/' },
      //   ],
      // },
      {
        title: '相关链接',
        links: [
          { text: 'GitHub', link: 'https://github.com/ATQQ' },
          { text: '博客', link: 'https://sugarat.top' },
        ],
      },
      {
        title: '友链（待你加入~）',
        links: [
        ],
      },
    ],
    footerBar: {
      copyright: {
        text: '© 2026 粥里有勺糖',
        link: 'https://sugarat.top',
      },
      // beian: {
      //   text: '京ICP备xxxxxxxx号',
      //   link: 'https://beian.miit.gov.cn/',
      // },
      links: [
        // { text: '博客', link: 'https://sugarat.top' },
        // { text: 'GitHub', link: 'https://github.com/ATQQ' },
      ],
    },
  },
})
