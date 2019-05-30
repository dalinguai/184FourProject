<template>
  <div>
    <Top></Top>
    <Bottom></Bottom>
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
    width: 790px;
    height: 100%;
    border: 2px solid black;
    float: right;
  }
</style>
