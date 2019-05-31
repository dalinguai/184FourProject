<template>
    <Public/>
</template>

<script>
  import Public from './Public'
  export default {
name: 'PdtSaCount',
    components:{
      Public,
    },
    data(){
      return{
        optionbar:{
          tooltip:{},
          legend:{
            data:['用户来源']
          },
          title:{
            text:'产品销售量',
            subtext: '数据来源于cosmetology',
            left:"center"
          },
          xAxis:{
            data:["明星水乳1","明星水乳1","明星水乳1","明星水乳5","明星水乳5","明星水乳5","明星水乳5","明星水乳5"]
          },
          yAxis:{

          },
          color:["#1ABC9c"],

          series:[{
            name:'销售量',
            type:'bar', //设置图表主题
            label: {
              normal: {
                show: true,
                position: 'insideTop'
              }
            },
            data:[500,200,360,100,300,500,600,200]
          }]
        },
        optionCake:{
          title : {
            text: '热门产品排行表',
            subtext: '数据来源于cosmetology',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '销量占比',
              type: 'pie',
              radius : '55%',
              center: ['50%', '55%'],
              data:[
                {value:335, name:'第一季度'},
                {value:310, name:'第二季度'},
                {value:234, name:'第三季度'},
                {value:135, name:'第四季度'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        optionYear:{
          title:{
            text:'热门产品排行表',
            left:'center',
            subtext: '数据来源于cosmetology',
          },
          tooltip : {//提示框组件
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color:["#1ABC9c"],
          grid: {
            left: '90px',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['2015年','2016年','2017年','2018年','2019年']
          },
          series: [
            {
              name: '年度总利润',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [600, 650, 720, 800, 1200]
            }
          ]
        },
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine: function(){
        //基于准本好的DOM，初始化echarts实例
        let chartmainbar = this.$echarts.init(document.getElementById("profitEach"));
        let profitTotal = this.$echarts.init(document.getElementById("profitTotal"));
        let profitYear = this.$echarts.init(document.getElementById("profitYear"));
        //绘制图表
        chartmainbar.setOption(this.optionbar);
        profitTotal.setOption(this.optionCake);
        profitYear.setOption(this.optionYear);
      }
    }
}
</script>

<style scoped>

</style>
