<template>
    <div class="content">
      <div class="en">
        <p><span class="title">订单详情</span><span>订单编号:</span><el-button type="primary">返回</el-button></p>
        <el-divider></el-divider>
        <p class="red">订单状态：待支付</p>
        <DetailsOne></DetailsOne>
        <p class="title">订单产品列表</p>
        <el-divider></el-divider>
        <p class="red"><span>实付金额：</span><span>消费金额：</span></p>
        <DetailsTwo></DetailsTwo>
        <p>支付明细列表</p>
        <el-divider></el-divider>
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
            list:[]
          }
        },
        beforeMount(){
          this.name = this.$route.params.customer;
          this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/staffManagement",{params:{name:this.name}}).
          then((res)=>{
            console.log(res.data[0]);
            this.list = res.data[0];
          }).catch((err)=>{
            console.log(err)
          })
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
    border: 1px solid red;
  }
  .en{
    width: 1280px;
    height: auto;
    border: 1px solid black;
  }
  .red{
    color: red;
    text-shadow: 0 2px 3px red;
    font-size:14px;
  }
  .el-button{
    float: right;
  }
</style>
