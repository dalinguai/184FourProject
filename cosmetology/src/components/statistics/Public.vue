<template>
  <div class="myapp">
    <Tnav/>
    <!-- 柱状图 -->
    <div id="profitEach"></div>
    <div class="pro_row">
      <!-- 横线图-->
      <div id="profitYear"></div>
      <!--  饼状图-->
      <div id="profitTotal"></div>
    </div>
  </div>
</template>

<script>
  import Tnav from './Tnav'
export default {
name: 'Baobiao',
  components:{
    Tnav,
  },
}
</script>

<style scoped>
  .myapp{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: center;
  }
  #profitEach{
    width: 100%;
    height:400px;
  }
  #profitEach,#profitQtr{
    width: 100%;
    height: 400px;
  }
  #profitTotal,#profitYear{
    width:50%;
    height: 500px;
  }
  .pro_row{
    width: 100%;
    display:flex;
    flex-direction: row;
  }
</style>
