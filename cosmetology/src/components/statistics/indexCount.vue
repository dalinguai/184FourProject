<template>
  <div id="app">
    <people-count/>
    <vip-count/>
    <statistical-chart/>
    <QuarterlyDetails/>
  </div>
</template>

<script>
  import peopleCount from './peopleCount'//引用人数统计
  import  statisticalChart from './statisticalChart'//人数统计图
  // import showChart from './showChart'//利润分布
  import vipCount from './vipCount'//VIP分布
  import QuarterlyDetails from './QuarterlyDetails'
  export default {
    name: 'indexApp',
    components:{
      peopleCount,
      statisticalChart,
      // showChart,
      vipCount,
      QuarterlyDetails,
    },
    methods:{

    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*margin-top: 60px;*/
    /*text-align: center;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*margin: 0 auto;*/
    /*width: 1348px;*/
    /*border: 1px saddlebrown solid;*/
  }
</style>
