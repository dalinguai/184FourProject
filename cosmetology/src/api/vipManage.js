/*
* 作用：会员管理的接口
* */

export default {
  vipListAll: "http://172.17.1.237:8080/customer/selectByVipNo",//获取所有会员列表
  vipInfo:"http://172.17.1.237:8080/customer/selectByVipid",//获取会员个人信息
  vipListPage: "http://172.17.1.237:8080/customer/selectAllVip",//获取会员当前页面列表
  searchVip: "http://172.17.1.237:8080/customer/selectByVipLike",//搜索会员信息
  customerListPage:"http://172.17.1.237:8080/customer/selectAll",//获取当前页面散客列表
  AddressList:"/static/Address.json",//获取省市区
  addVip:"http://172.17.1.237:8080/customer/insertCustomer",
  vipAffair: "/static/vipAffairDataOne.json",//获取会员事务相关信息
  // vipAffairComes: "/static/vipAffairDataTwo.json",//发送充值的金额
  //获取员工个人的所有疗程信息
  vipAffairComes:"http://172.17.1.237:8080/customer/selectCourse",//获取疗程信息
  // vipAffairComesAdd: "/static/vipAffairDataThree.json",//补增获取疗程信息
  //点击请求对应的不增疗程项目
  vipAffairComesAdd: "http://172.17.1.237:8080/customer/selectTreatment",
  //点击保存增加的补增疗程信息
  insertTreatment: "http://172.17.1.237:8080/customer/insertTreatment",
  VipsendMessage: "/static/sendMessage.json",//获取短信信息
  VipsendHistory: "/static/sendHistory.json",//获取短信历史
  //会员预约
  // CustomerBooking:"/static/CustomersBooking.json",//获取预约详情
  //会员预约查询
  CustomerBooking: "http://172.17.1.237:8080/Reservation/selectByDate",
  //添加预约
  CustomerBookingAdd: "http://172.17.1.237:8080/Reservation/insertByDate",
  //会员删除预约
  CustomerBookingUpdate: "http://172.17.1.237:8080/Reservation/updateByDate",
  sendMessageToVip: "http://172.17.1.237:8080/customer/insertNote",//向服务器发送短信
  ViewConsumptionRecords: "http://172.17.1.237:8080/customer/selectConsume",//查询会员的商品消费详细信息
  ViewTreatmentRecord: "http://172.17.1.237:8080/customer/selectAllCourse",//查询会员的疗程消费信息
//  获取积分规则
  VipIntegral: 'http://172.17.1.237:8080/integral/select',
//  充值提交确认
  VipRecharge: 'http://172.17.1.237:8080/VipRecharge/insert',
  //会员消费排行
  VipConsume: "http://172.17.1.237:8080/customer/selectRanking",
}
