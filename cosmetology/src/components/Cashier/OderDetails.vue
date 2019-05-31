<template>
    <div class="content">
      <div class="en">
        <DetailsBox></DetailsBox>
        <DetailsBoxStyle></DetailsBoxStyle>
      </div>

      <!--<div class="en">订单产品列表</div>-->
      <!--<DetailsBox></DetailsBox>-->
      <!--<div class="en">支付明细列表</div>-->
      <!--<DetailsBox></DetailsBox>-->
    </div>
</template>

<script>
  import DetailsBox from './detailsBox'
  import DetailsBoxStyle from './detailxBoxStyle'
    export default {
        name: "OderDetails",
        components:{
          DetailsBox,
          DetailsBoxStyle
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
</style>
