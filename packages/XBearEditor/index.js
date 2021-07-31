// packages/textarea/index.js

// 导入组件，组件必须声明 name
import XBearEditor from './src/index';

// 为组件添加 install 方法，用于按需引入
XBearEditor.install = function (Vue) {
  Vue.component(XBearEditor.name, XBearEditor);
};

export default XBearEditor;
