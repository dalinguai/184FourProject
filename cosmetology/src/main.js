// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill"//ie浏览器promise未定义的问题
import router from './router'
import Axios from 'axios'
import api from './api/index.js'
import store from './store'
import './assets/iconfont/iconfont.css'

router.beforeEach(function (to, from, next) {
  if (to.name === 'login') {
    next();
  } else {
    if (to.meta.requireAuth) {
      if (sessionStorage.getItem('isLogin')) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    } else {
      next();
    }
  }
})

//全局注册echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.prototype.$api = api;
Vue.prototype.$axios = Axios;
Vue.prototype.$config = {
  transformRequest: [
    function (data) {
      // username=hahha&age=18
      let params = "";
      var arr = [];
      for (var key in data) {
        arr.push(key + "=" + data[key]);
      }
      params = arr.join("&");
      return params;
    }
  ]
};
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,//使用store
  components: {App},
  template: '<App/>',
});
// 拦截器
//设置loading
let loading;

function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "Loading...",
    background: "transparent"
  });
}

function endLoading() {
  loading.close();
}

Axios.interceptors.request.use(config => {
  console.log(sessionStorage);
  if (sessionStorage.getItem("xauthorization")) {
    config.headers['xauthorization'] = sessionStorage.getItem("xauthorization");
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 拦截Axios发起的所有请求，给请求添加加载中
//请求完成
Axios.interceptors.response.use((response) => {
  return response;
}, function (err) {
  if (err.response) {
    switch (err.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        store.dispatch("logout");
        router.replace({
          path: 'login',
          query: {redirect: router.history.current.fullPath}
        });
        break;
      case 402:
        store.dispatch("logout");
        router.replace({
          path: 'login',
          query: {redirect: router.history.current.fullPath}
        });
        break;
      case 403:
      //操作
    }
  }
  return Promise.reject(err);
});


