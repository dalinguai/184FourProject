<template>
  <div>
    <Top></Top>
    <Bottom></Bottom>
    <!--<router-view name="top"></router-view>-->
    <!--<router-view name=""></router-view>-->
  </div>
</template>

<script>
  import Top from './VipInfo'
  import Bottom from './cusOrdInfo'
  export default {
    name: "Cashier_right",
    components: {
      Top,
      Bottom
    },
    computed: {
      myState() {
        return this.$store.state.vipInfo;
      },
      add() {
        return this.$store.state.add;
      },
      getNumber() {
        return this.$store.state.oderNumber;
      },
      getCarOrdList() {
        return this.$store.state.carOrdList;
      }
    },
    watch: {
      myState: function () {
        // console.log("监听器:会员信息改变");
      },
      add() {
        // console.log("添加散客")
      },
      getNumber() {
        // console.log("订单编号为：" + this.$store.state.oderNumber);
      },
      getCarOrdList() {
        // console.log("监听器:购物车改变");
        // return this.$store.state.carOrdList;
      }
    }
  }
</script>

<style scoped>
  .right {
    /*float: left;*/
    width: 790px;
    height: 100%;
    border: 2px solid black;
    margin-left: 30px;
  }
</style>
