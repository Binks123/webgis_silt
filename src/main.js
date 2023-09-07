import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios';
import * as echarts from 'echarts';




Vue.config.productionTip = false

Vue.prototype.$http = axios;
// 将全局echarts对象挂载到Vue的原型对象上 
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
