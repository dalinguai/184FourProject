import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    payCard:null,//刷卡
    add:false,//添加散客
    oderNumber:null,//订单编号
    orderCar:null,//购物车的具体信息
    carOrdList:null ,// 某一订单中的用户所有商品信息
    proId:null, //当前修改的商品ID
    // list:{},//刷卡
  },//初始数据
  getters:{},//可以认为是store的计算属性
  mutations:{
    //刷卡，存入电话号码
    getPhone:(state,payload)=>{
      state.payCard = payload;
    },
  //  添加客户
    addCustomer:(state,payload)=>{
      state.add = !state.add;
    },
  //  订单编号改变
    getOderNumber:(state,payload)=>{
      state.oderNumber = payload;
    }
  },//改变state方法
  actions:{},//触发mutations里面函数的方法（异步的）
});

export default store;

