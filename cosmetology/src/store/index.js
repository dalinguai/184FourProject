import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    IsRefresh: true, //判断页面是否刷新
    isLoading: false,
    isLogin: window.sessionStorage.getItem("isLogin") ?
      Boolean(window.sessionStorage.getItem("isLogin")) : false,
    token:window.sessionStorage.getItem("token") || "",
    menuInfo:(window.sessionStorage.getItem("menuInfo")||
      window.sessionStorage.getItem("menuInfo")!="undefined")?
      JSON.parse( window.sessionStorage.getItem("menuInfo")):[],
    userInfo:(window.sessionStorage.getItem("userInfo")||
      window.sessionStorage.getItem("userInfo")!="undefined"
    )?
      JSON.parse(window.sessionStorage.getItem("userInfo")):[],
    changePath:'',
    user_id:'',
    list:[],//刷卡
    payCard:null,//刷卡
    add:false,//添加散客
    oderNumber:null,//购物车编号
    orderCar:null,//购物车的具体信息
    carOrdList:null ,// 购物车中的消费信息
    proId:null, //当前修改的商品ID
    // list:{},//刷卡
    orderId: '',//订单编号
    vipInfo: null,//会员信息
    cashierId:null,//收银员ID
  },//初始数据
//可以认为是store的计算属性
  getters:{
    getRefresh(state){
      return  state.IsRefresh;
    },
    getToken(state) {
      if (state.isLogin) {
        return state.token;
      } else {
        return "";
      }
    },
    getIsLogin(state){
      return state.isLogin;
    },
    getMenuInfo(state){
      return [...state.menuInfo];
    },
    getUserInfo(state){
      return [...state.userInfo]
    }
},
  mutations:{
    //刷卡，存入电话号码
    getPhone:(state,payload)=>{
      state.payCard = payload;
    },
    getVipInfo: (state, payload) => {
      state.vipInfo = payload;
    },
    changePath: (state, payload) => {
      state.user_id = payload;
      if (state.changePath) {
        console.log(state.changePath);
      } else {
        console.log('aaa');
      }
    },
    setUser_id: (state, payload) => {
      state.user_id = payload;
    },
    getOrderId: (state, payload) => {
      state.orderId = payload;
    },
    //  添加客户
    addCustomer: (state, payload) => {
      state.add = !state.add;
    },
    //  订单编号改变
    getOderNumber: (state, payload) => {
      state.oderNumber = payload;
      console.log(state.oderNumber);
    },
    setNoRefresh(state){
      state.IsRefresh = false; //设置不刷新
    },
    SetToken(state, token) {  //设置token
      // console.log(token);
      state.token = token;
      window.sessionStorage.setItem("token", token);
    },
    LoginSuccess(state, data) { //登录成功
      state.isLogin = true;
      state.menuInfo = data.menuInfo;
      state.userInfo = data.userInfo;
      window.sessionStorage.setItem("isLogin",true);
      window.sessionStorage.setItem("menuInfo", JSON.stringify(data.menuInfo));
      window.sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    },
    loginEdit(state) {  //注销
      console.log('执行了')
      state.isLogin = false;
      state.token = "";
      // state.roleData = [];
      state.userInfo = [];
      window.sessionStorage.setItem("isLogin",false);
      // window.sessionStorage.removeItem("roleData");
      window.sessionStorage.removeItem("userInfo");
      window.sessionStorage.removeItem("token");
    },
  },//改变state方法
  actions: {
    setNoRefresh({commit}) {
      commit('setNoRefresh');
    },
    setToken({commit}, token) {
      commit('SetToken', token);  //与mutations里的名称对应
    },
    loginSuccess({commit}, data) {
      commit('LoginSuccess', data);
    },
    loginEdit({commit}) {
      commit('LoginEdit');
    },
  }
});

export default store;

