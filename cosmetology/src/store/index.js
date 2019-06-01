import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    list:[],//刷卡
  },//初始数据
  getters:{},//监听state
  mutations:{
    phone:(state,payload)=>{
      state.list = payload;
    },
  },//改变state方法
  actions:{},//触发mutations里面函数的方法
});

export default store;

