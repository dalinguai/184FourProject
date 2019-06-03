/*
* 作用：会员管理的接口
* */

export default {
  vipListAll: "http://5cec9881b779120014b4974f.mockapi.io/demo/VipList",//获取所有会员列表
  vipListPage: "http://5cec9881b779120014b4974f.mockapi.io/demo/VipList",//获取会员当前页面列表
  // vipListPage: "http://172.17.1.236:8080/customer/selectAllVip",//获取会员当前页面列表
  searchVip: "http://5cec9881b779120014b4974f.mockapi.io/demo/VipList",//搜索会员信息
  customerListPage:"/static/vipList-H.json",//获取当前页面散客列表
  AddressList:"/static/Address.json",//获取省市区
  addVip:"http://5cec9881b779120014b4974f.mockapi.io/demo/VipList",//添加会员信息
  vipAffair: "/static/vipAffairDataOne.json",//获取会员事务相关信息
  vipAffairComes: "/static/vipAffairDataTwo.json",//发送充值的金额
  vipAffairComesAdd: "/static/vipAffairDataThree.json",//补增获取疗程信息
  VipsendMessage:"/static/sendMessage.json",//获取短信信息
  VipsendHistory:"/static/sendHistory.json"//获取短信历史
}
