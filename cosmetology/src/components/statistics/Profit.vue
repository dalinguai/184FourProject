<template>
  <div class="profit">
    <Public/>
    <div id="profitQtr"></div>
  </div>
</template>

<script>
  import Public from './Public'
  export default {
    name: 'Profit',
    components:{
      Public,
    },
    data(){
      return{
        optionbar:{
          tooltip:{},//鼠标悬停时标题
          legend:{
            data:['用户来源']
          },
          title:{
            text:'各产品利润表',
            left:"center",
            subtext: '数据来源于cosmetology',
          },
          xAxis:{
            data:[],
            axisLabel: {
              formatter(value){//x轴字数太长得解决方法
                var str = "";
                var num = 6; //每行显示字数
                var valLength = value.length; //该项x轴字数
                var rowNum = Math.ceil(valLength / num); // 行数，ceil向上取整

                if(rowNum > 1) {
                  for(var i = 0; i < rowNum; i++) {
                    var temp = "";
                    var start = i * num;
                    var end = start + num;

                    temp = value.substring(start, end) + "\n";
                    str += temp;
                  }
                  return str;
                } else {
                  return value;
                }
              }
            }
          },
          yAxis:{

          },
          color:["#1ABC9c"],

          series:[{
            name:'利润',
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
        optionline:{
          tooltip:{},
          legend:{
            data:['用户来源']
          },
          title:{
            text:'产品月度利润表',
            left:"center",
            subtext: '数据来源于cosmetology',
          },
          xAxis:{
            data:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
          },
          yAxis:{

          },
          color:["#1ABC9c"],

          series:[{
            name:'利润',
            type:'line', //设置图表主题
            data:[500,200,360,100,300,500,600,200]
          }]
        },
        optionCake:{
          title : {
            text: '季度利润表',
            subtext: '数据来源于cosmetology',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
            {
              name: '访问来源',
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
            text:'年度利润报表',
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
              data: [1200,1500,1600,500,800],
            }],

        }
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {

      drawLine: function(){
        //基于准本好的DOM，初始化echarts实例
        this.$axios.get("/static/Profit.json").then((res) => {
          var newList = [];
          for(var i = 0;i<res.data.length;i++){
            newList.push(res.data[i].commodity_name);
          }
          this.optionbar.xAxis.data = newList;
          let profitBar = this.$echarts.init(document.getElementById("profitEach"));
          console.log(this.optionbar)
          profitBar.setOption(this.optionbar);
        }).catch((err) => {
          console.log(err)
        })
        let profitLine = this.$echarts.init(document.getElementById("profitQtr"));
        let profitTotal = this.$echarts.init(document.getElementById("profitTotal"));
        let profitYear = this.$echarts.init(document.getElementById("profitYear"));
        //绘制图表
        profitLine.setOption(this.optionline);
        profitTotal.setOption(this.optionCake);
        profitYear.setOption(this.optionYear);
      }
    }}
</script>

<style scoped>
  .profit{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: center;
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
