// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Axios from 'axios'
import api from './api/index.js'
import store from './store'
Vue.prototype.$api = api;
Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL="http://192.168.1.101:8080";默认地址
Vue.config.productionTip = false;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>',
});
