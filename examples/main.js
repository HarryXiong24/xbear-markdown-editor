import Vue from 'vue';
import App from './App.vue';

// 按需引入
import { XBearEditor } from '../packages/index';
Vue.component(XBearEditor.name, XBearEditor);

// 全局引入
// import XBearEditor from '../packages/index';
// Vue.use(XBearEditor);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
