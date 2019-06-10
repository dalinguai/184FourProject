<template>
    <div class="three">
      <div id="nel">总利润季度分布</div>
      <div id="optionQuarterlyDetailsA"></div>
    </div>
</template>

<script>
    export default {
        name: "QuarterlyDetails",
   data(){
     return{
       optionJdu: {
         tooltip: {
           trigger: 'item',
           formatter: "{a} <br/>{b}: {c} ({d}%)"
         },
         legend: {
           orient: 'vertical',
           x: 'left',
           data:['春季','夏季','秋季','冬季']
         },
         series: [
           {
             name:'访问来源',
             type:'pie',
             selectedMode: 'single',
             radius: [0, '30%'],

             label: {
               normal: {
                 position: 'inner'
               }
             },
             labelLine: {
               normal: {
                 show: false
               }
             },

           },
           {
             name:'各季度利润及占比',
             type:'pie',
             radius: ['40%', '55%'],
             label: {
               normal: {
                 formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                 backgroundColor: '#eee',
                 borderColor: '#aaa',
                 borderWidth: 1,
                 borderRadius: 4,
                 // shadowBlur:3,
                 // shadowOffsetX: 2,
                 // shadowOffsetY: 2,
                 // shadowColor: '#999',
                 // padding: [0, 7],
                 rich: {
                   a: {
                     color: '#999',
                     lineHeight: 22,
                     align: 'center'
                   },
                   // abg: {
                   //     backgroundColor: '#333',
                   //     width: '100%',
                   //     align: 'right',
                   //     height: 22,
                   //     borderRadius: [4, 4, 0, 0]
                   // },
                   hr: {
                     borderColor: '#aaa',
                     width: '100%',
                     borderWidth: 0.5,
                     height: 0
                   },
                   b: {
                     fontSize: 16,
                     lineHeight: 33
                   },
                   per: {
                     color: '#eee',
                     backgroundColor: '#334455',
                     padding: [2, 4],
                     borderRadius: 2
                   }
                 }
               }
             },
             data:[
               {value:335, name:'春季'},
               {value:310, name:'夏季'},
               {value:234, name:'秋季'},
               {value:135, name:'冬季'},
             ]
           }
         ]
       },
     }
   },
      mounted() {
        // this.getDataA();
        this.drawLine()
      },
      methods: {
        drawLine: function(){
          //基于准备好的DOM，初始化echarts实例
          let chartmainline = this.$echarts.init(document.getElementById("optionQuarterlyDetailsA"));
          //绘制图表
          chartmainline.setOption(this.optionJdu);
        },
      }
    }
</script>

<style scoped>
  .three{
    margin-left: 20px;
  }
  #nel{
    margin-top: 25px;
    color: saddlebrown;
    font:500 25px/38px 宋体 serif;
  }
 #optionQuarterlyDetailsA{
  width: 100%;
  height: 700px;
}
</style>
