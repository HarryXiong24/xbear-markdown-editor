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
      { text: 'Guide', link: '/guide/intro' },
      { text: 'API', link: '/api/props' },
      { text: 'GitHub', link: 'https://github.com/HarryXiong24/xbear-markdown-editor' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: "起步",
          path: 'intro',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['intro', '介绍'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
            ['install', '安装'],
            ['usage', '使用']
          ] 
        },
        {
          title: "深入",
          path: 'structure',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['structure', '项目结构'],  
            ['config', '配置文件'],
            ['mixins', '混入文件']
          ] 
        },
        {
          title: "可扩展",
          path: 'extend',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['extend', '项目结构'],  
            ['config', '配置文件'],
            ['config', '使用']
          ] 
        }
      ],
      '/api/': [
        {
          title: "API",
          path: 'props',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['props', 'Props'], 
            ['events', 'Events']
          ] 
        }
      ]
    }
  },
};
