<h1 align="center">xbear-markdown-editor</h1>

<p align="center">
  <img alt="Version" src="https://img.shields.io/github/package-json/v/harryxiong24/xbear-markdown-editor" />
  <img alt="License: MIT" src="https://img.shields.io/github/license/harryxiong24/xbear-markdown-editor" />
  <img alt="Vue" src="https://img.shields.io/badge/vue-2.x-brightgreen" />
  <img alt="Author" src="https://img.shields.io/badge/author-Harry Xiong-blue" />
 <!--   <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" /> -->
<!--   <img alt="Maintenance" src="https://img.shields.io/badge/maintained%3F-yes-green.svg" /> -->
<!--   <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%3E%3D3.7.2-blue" /> -->
</p>

## :pushpin: Introduction
  
> A markdown editor based on Vue 2.x, Marked and CodeMirror.

多功能 Markdown 编辑器。
  
## :triangular_ruler: Usage

### Install

#### npm
``` bash
npm install xbear
```

#### yarn
``` bash
yarn add xbear
```

### Use as plugins in Vue projects

#### main.js
``` js
import XBearEditor from '../packages/index';
Vue.use(XBearEditor);
```
#### app.vue
``` vue
<template>
  <div id="app">
    <xbear-editor></xbear-editor>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
</style>
```

### More functions

Please see the documents.

## :notebook: Documents

To check out docs, visit [xbear docs]().

## :triangular_flag_on_post: Support

- Vue 2.x Project

## :heartpulse: Contributor

- [Harry Xiong](https://github.com/harryxiong24)
  
## :memo: License

Copyright © 2021-present [Harry Xiong](https://github.com/harryxiong24).<br />
This project is [MIT](https://github.com/HarryXiong24/xbear-markdown-editor/blob/master/LICENSE) licensed.
