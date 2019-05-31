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
      components:{
        Top,
        Bottom
      }
    }
</script>

<style scoped>
  .right{
    /*float: left;*/
    width: 790px;
    height: 100%;
    border: 2px solid black;
    margin-left: 30px;
  }
</style>
