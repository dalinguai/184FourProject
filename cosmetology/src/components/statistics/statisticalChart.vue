<template>
    <div id="statisticalChart">
      <div id="nel">总利润月份分布 <i class="fubiaoT">下方选择年度进行查询</i></div>

      <el-select v-model="valueMounth" placeholder="选择年度" value="item.value" style="width: 130px;height: 30px">
        <el-option
          v-for="item in optionsMounth" :key="item.value" :label="item.label" :value="item.value" @click.native="orderYear(item.label)">
        </el-option>
      </el-select>

      <div id="chartmainline"></div>
    </div>
</template>

<script>
  // let charA = 6000;
  let weatherIcons = {};
  export default({
  name:'statisticalChart',
    data(){
      return{
        list:[ 1, 2, 3, 4, 5, 6, 7,8,9,10,1,1],
        list2:[ 1, 2, 3, 4, 5, 310650, 453652,491128,552080,395402,345950,612365],
        charA:6000,
        dataA2012:['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
        dataA2013:[{Jan:440524},{Jan:340524},{Jan:240524},{Jan:540524},{Jan:440524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524}],
        optionline :{
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            // data: this.list,
            data: [ 1, 2, 3, 4, 5, 6, 7,8,9,10,1,1],
            type: 'line'
          }]
        },
          valueMounth:null,
        optionsMounth:[{value:1,label:2015},{value:2,label:2016},{value:3,label:2017},{value:4,label:2018},{value:5,label:2019},{value:6,label:2029}]
      }
    },

  mounted() {
    this.drawLine()
  },
    beforeUpdate(){
    this.drawLine()
    },
  methods: {
    drawLine: function(){
      // console.log(this.optionline.series[0].data)
      //基于准备好的DOM，初始化echarts实例
      let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
      //绘制图表
      chartmainline.setOption(this.optionline);
    },
    orderYear (a) {
      let wa = a;
      // console.log(wa);
      for ( let i = 0 ; i < this.optionsMounth.length ; i ++ ) {
        if (wa === this.optionsMounth[i].label) {
         this.optionline.series[0].data = this.list2;
          return;
        }
      }
    },
  }
  })
</script>

<style scoped>
  #statisticalChart{
    margin-left: 20px;
  }
  #chartmainline{
    width: 100%;
    height: 400px;
  }
  #nel{
    margin-top: 25px;
    color: saddlebrown;
    font:500 25px/38px 宋体 serif;
  }
  .fubiaoT{
    color: #c0c4cc;
    font: 500 13px/20px 宋体 Serif;
  }
</style>
