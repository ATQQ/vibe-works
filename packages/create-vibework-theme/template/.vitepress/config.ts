import { withThemeConfig } from '@sugarat/vitepress-theme-vibework/config'

export default withThemeConfig({
  title: '{{title}}',
  description: '收录做过的 App、CLI、网站与开源工具，含介绍、适用场景与站点 / 仓库入口。',
  srcExclude: ['README.md'],
  // 其余 VitePress 配置照常写，例如 vite 插件、统计脚本：
  // vite: { plugins: [] },
  // head: [['script', { src: 'https://example.com/analytics.js' }]],
  themeConfig: {
    // 左上角品牌
    brand: '{{title}}',
    logo: '/logo.svg',
    caption: '作品展示',

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '全部', link: '/works/' },
      { text: '关于', link: '/about' },
    ],

    // 右上角图标：内置 github / x，或图片路径
    socialLinks: [
      { icon: '/logo.svg', link: 'https://sugarat.top', ariaLabel: '博客' },
      { icon: 'github', link: 'https://github.com/ATQQ' },
      { icon: 'x', link: 'https://x.com/Mr_XiaoZou' },
    ],

    // 页脚左侧：说明 + 渠道图标，悬停显示二维码
    footerNote: '展示做过的作品，并链到独立站点与开源仓库。',
    footerChannelsLabel: '关注我',
    footerChannels: [
      // 内置图标：wechat / bilibili / xiaohongshu / douyin / zhihu
      // 二维码二选一：qrImage 直接用图片，qrContent 按内容生成
      { icon: 'wechat', label: '公众号', qrImage: '/wechat-qr.png', qrTitle: '关注公众号' },
      {
        icon: 'bilibili',
        label: 'Bilibili',
        link: 'https://space.bilibili.com/169511987',
        qrContent: 'https://space.bilibili.com/169511987',
        qrTitle: 'B站主页',
      },
      {
        icon: 'xiaohongshu',
        label: '小红书',
        link: 'https://www.xiaohongshu.com/user/profile/641327dc000000001102206e',
        qrContent: 'https://www.xiaohongshu.com/user/profile/641327dc000000001102206e',
        qrTitle: '小红书',
      },
      {
        icon: 'douyin',
        label: '抖音',
        link: 'https://v.douyin.com/OVyq9nzuXhM/',
        qrContent: 'https://v.douyin.com/OVyq9nzuXhM/',
        qrTitle: '抖音',
      },
      {
        icon: 'zhihu',
        label: '知乎',
        link: 'https://www.zhihu.com/people/rose-72-9',
        qrContent: 'https://www.zhihu.com/people/rose-72-9',
        qrTitle: '知乎',
      },
    ],

    // 页脚中间：链接列
    footerColumns: [
      {
        title: '相关链接',
        links: [
          { text: 'GitHub', link: 'https://github.com/ATQQ' },
          { text: '博客', link: 'https://sugarat.top' },
        ],
      },
    ],

    // 页脚最右：常驻联系二维码
    footerContact: {
      title: '微信联系我',
      qrImage: '/wechat-qr.png',
    },

    // 页脚底栏：版权 · 备案 · 链接
    footerBar: {
      copyright: { text: '© ' + new Date().getFullYear() + ' {{title}}', link: '/' },
      // beian: { text: '京ICP备xxxxxxxx号', link: 'https://beian.miit.gov.cn/' },
      links: [{ text: '关于', link: '/about' }],
    },
  },
})
