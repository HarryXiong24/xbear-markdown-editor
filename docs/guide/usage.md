# 在 Vue 项目中作为插件使用

## 全局引入

```js
import XBearEditor from 'xbear-editor';
Vue.use(XBearEditor);
```

## 按需引入

```js
import { XBearEditor } from 'xbear-editor';
Vue.component(XBearEditor.name, XBearEditor);
```

## 在 Vue 项目中当做组件使用

```vue
<template>
  <div id="app">
    <!--  Use as a component  -->
    <xbear-editor></xbear-editor>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style></style>
```
