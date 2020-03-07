import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from './store'
import ElementUI from 'element-ui';
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import hljs from 'highlight.js';
Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

