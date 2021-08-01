# 组件设计架构

组件库目录结构如下：

``` text
.
├── docs               (项目文档)
├── examples           (使用示例)
├── packages           (组件所在位置)
│   ├── index.js       (导出组件)
│   └── XBearEditor    (组件包)
│       ├── index.js 
│       └── src
│           ├── assets (外部资源, 包括 marked, highlight.js 库)
│           ├── config (存放配置文件)
│           ├── mixins (存放混入功能文件)
│           ├── utils  (存放工具文件)
│           └── index.vue
├── public  
├── LICENSE
├── package.json
├── README.md
├── vue.config.js
├── babel.config.js
└── yarn.lock
```
