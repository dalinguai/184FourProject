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
        return this.$store.state.payCard;
      },
      add() {
        return this.$store.state.add;
      },
      getNumber() {
        return this.$store.state.oderNumber;
      }
    },
    watch: {
      myState: function () {
        console.log("刷卡了");
        console.log(this.$store.state.payCard);
      },
      add() {
        console.log("添加散客")
      },
      getNumber() {
        console.log("订单编号为：" + this.$store.state.oderNumber);
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
