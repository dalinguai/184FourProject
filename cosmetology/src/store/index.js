import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    changePath:'',
    list:[],//刷卡
  },//初始数据
  getters:{},//监听state
  mutations:{
    phone:(state,payload)=>{
      state.list = payload;
    },
    changePath:(state,payload)=>{
      state.changePath=payload;
      if(state.changePath){
        console.log(state.changePath);
      }else {
        console.log('aaa');
      }
    }
  },//改变state方法
  actions:{},//触发mutations里面函数的方法
});

export default store;

