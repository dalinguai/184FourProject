<template>
    <div class="content">
      <div class="en">
        <p class="title_p"><span class="title">订单详情</span><span class="number">订单编号:<span>{{orderId}}</span></span><el-button type="primary" @click="backFun">返回</el-button></p>
        <el-divider></el-divider>
        <p class="red">订单状态：待支付</p>
        <DetailsOne></DetailsOne>
        <p class="title title_p">订单产品列表</p>
        <el-divider></el-divider>
        <p class="red"><span>实付金额：</span><span>消费金额：</span></p>
        <DetailsTwo></DetailsTwo>
        <p class="title_p">支付明细列表</p>
        <el-divider></el-divider>
        <p class="red"></p>
        <DetailsTwo></DetailsTwo>
      </div>
    </div>
</template>

<script>
  import DetailsOne from './detailsOne'
  import DetailsTwo from './detailsTwo'
  import DetailsThree from './detailsThree'
    export default {
        name: "OderDetails",
        components:{
          DetailsOne,
          DetailsTwo,
          DetailsThree
        },
        data(){
          return {
            name:"",
            list:[],
            orderId:'',
          }
        },
        beforeMount(){
          this.name = this.$route.params.customer;
          //获得订单号
          console.log('获得订单号'+this.$store.state.orderId);
          this.orderId = this.$store.state.orderId;
          // this.$axios.post('http',{orderId:this.orderId},this.$config).
          this.$axios.post("http://172.17.1.241:8080/order/selectShoppingTrolleyByOrderId",{order_id:this.orderId},this.$config).
          then((res)=>{
            console.log(res.data);
            this.list = res.data[0];
          }).catch((err)=>{
            console.log(err)
          })
        },
        methods:{
          backFun(){
            console.log('返回点击');
            this.$router.go(-1);
          },
        }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*border: 1px solid red;*/
  }
  .en{
    margin-top: 20px;
    padding: 10px;
    width: 1280px;
    height: auto;
    /*border: 1px solid black;*/
  }
  .red{
    color: red;
    text-shadow: 0 1px 1px red;
    font-size:14px;
  }
  .el-button{
    float: right;
  }
  p{
    font-size: 20px;
    text-shadow: 0 1px 1px black;
    height: 40px;
    line-height: 40px;
  }
  .title_p{
    margin-top: 20px;
  }
  .number{
    font-size: 12px;
    margin-left: 20px;
  }
  /*横线*/
  .el-divider{
    margin: 0;
  }
</style>
