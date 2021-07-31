import Vue from 'vue';
import App from './App.vue';
import XBearEditor from '../packages/index';
Vue.use(XBearEditor);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
