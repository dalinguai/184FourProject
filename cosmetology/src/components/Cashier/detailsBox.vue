<template>
    <div>
      <p>订单详情<span>订单编号</span><el-button type="primary">返回</el-button></p>
      <el-divider></el-divider>
      <p>订单状态：待支付</p>
      <table>
        <tr>
          <td>会员名称：{{oderDetails.corseName}}</td><td>手机号码：{{oderDetails.phone}}</td><td>支付时间：{{oderDetails.time}}</td>
          <td>收银人员：{{oderDetails.cashierName}}</td><td>消费总额：{{oderDetails.payMone}}</td><td>获得积分：{{oderDetails.number}}</td>
        </tr>
        <tr>
          <td>产品金额：{{oderDetails.productMoney}}</td><td>护理金额：{{oderDetails.hlMoney}}</td><td>仪器金额：{{oderDetails.yqMoney}}</td>
          <td>卡项金额：{{oderDetails.littleMoney}}</td><td><button>小票预览</button></td><td><button>打印小票</button></td>
        </tr>
        <tr>
          <td>备注信息</td><td colspan="5"></td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "detailsBox",
      data(){
          return {
            oderDetails:{
              corseName:'1',
              phone:2,
              time:3,
              cashierName:4,
              payMone:5,
              number:6,
              productMoney:7,
              hlMoney:8,
              yqMoney:9,
              littleMoney:10,
            }
          }
      }
    }
</script>

<style scoped>
  table{
    border: 1px solid #3390FF;
    margin: 0;
    border-collapse: collapse;
  }
  table td{
    border: 1px solid #3390FF;
    width: 170px;
    height: 37px;
    font-size: 14px;
    text-align: center;
  }
</style>
