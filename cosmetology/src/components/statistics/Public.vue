<template>
  <div class="myapp">
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
  export default {
    name: 'Baobiao',
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value1: '',
        value2: '',
        value_date: '',
        timeDefaultShow: ''
      }
    },
    // watch:{
    // "value2":function(){
    //   this.$emit('getMessage',this.value2)
    // },
    mounted() {

  }
  }
</script>

<style scoped>
  .myapp {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 40px;
    /*align-items: center;*/
  }



  #profitEach {
    width: 100%;
    height: 400px;
  }

  #profitEach, #profitQtr {
    width: 100%;
    height: 400px;
  }

  #profitTotal, #profitYear {
    margin-top: 40px;
    margin-bottom: 40px;
    width: 50%;
    height: 500px;
  }

  .pro_row {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
</style>
