/*
* 作用：结算页面右部操作页面
* */

export default {
  cusInfo:"http://172.17.1.237:8080/customer/vipPhone",  //获取服务器上对应手 机号的会员信息
  //获取订单号对应的购物车信息
  // carData:"/static/carInfo.json",
  carData:"http://172.17.1.237:8080/order/selectShoppingTrolleyByOrderId",
  carDelete:"http://172.17.1.237:8080/shoppingTrolley/deleteMiddle", //购物车中删除某一项商品
  carModify:"",//购物车中修改某一项数据
  carInsert:"", //购物车中快速查询商品的input提醒
  carInsertAdd:"http://172.17.1.237:8080/shoppingTrolley/addMiddle", //购物车中快速添加商品
  searchLoading:"", //购物车的快速添加请求
  carSearch:"/static/carSearch.json",//购物车的搜索功能
  integralRule:"http://172.17.1.237:8080/integral/select",//在商品添加板块的积分规则获取
  carModifySave:"",//购物车修改的保存按钮
  brandName:"http://172.17.1.237:8080/commodity/brandName",//请求添加的商品品牌
  seriesName:"http://172.17.1.237:8080/commodity/seriesName",//请求添加的商品品牌
  carAddBrandOrSeries:"http://172.17.1.237:8080/commodity/selectByCondition",//筛选品牌商品
  treatmentName:"http://172.17.1.237:8080/courseTreatment/selectByCondition",//请求添加的商品品牌
  carAddTreatment:"http://172.17.1.237:8080/commodity/selectByCondition",//筛选品牌商品
  carAddBrandBatch:"http://172.17.1.237:8080/commodity/selectBatch",//查询批次信息
  carAddBrandStaff:"http://172.17.1.237:8080/user/idAndName",//查询批次信息
  carAddBrandAndSeries:"http://172.17.1.237:8080/user/idAndName",//提交商品和疗程
  carGetOrd:"http://172.17.1.237:8080/consumeRecorder/addConsumeRecorder",//生成订单
  makeAOrd:"http://172.17.1.237:8080/order/addOrder",//生成消费记录
  carCalcRule:"http://172.17.1.237:8080/order/calculatedAmount",//获取订单的支付规则以选项

  
}
