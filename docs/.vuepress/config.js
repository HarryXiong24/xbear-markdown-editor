module.exports = {
  title: 'XBear Markdown Editor',
  description: 'A markdown editor based on Vue 2.x, Marked and CodeMirror.',
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }, // 浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    logo: '/xbear.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/HarryXiong24/xbear-markdown-editor' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: "起步",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['', '介绍'], 
            ['install', '安装'],
            ['usage', '使用']
          ] 
        },
        {
          title: "深入",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['structure', '组件'],  
            ['config', '配置文件'],
            ['mixins', '混入文件']
          ] 
        },
        {
          title: "可扩展",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['extend', '组件设计架构'],  
            ['config', '配置文件'],
            ['mixins', '使用']
          ] 
        }
      ],
      '/api/': [
        {
          title: "API",
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['', '概括'],
            ['props', 'Props'], 
            ['events', 'Events']
          ] 
        }
      ]
    }
  },
};
