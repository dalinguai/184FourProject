<template>
  <div id="statisticalChart">
    <div id="hel">会员总数及等级分布</div>
    <el-select v-model="value" placeholder="选择年度" value="item.value" style="width: 130px;height: 30px">
      <el-option
        v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div id="chartMainVip"></div>
  </div>
</template>

<script>
  // let charA = 6000;
  let weatherIcons = {};
  export default({
    name:'vipCount',
    data(){
      return{
        charA:6000,
        dataA2012:['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
        dataA2013:[{Jan:440524},{Jan:340524},{Jan:240524},{Jan:540524},{Jan:440524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524},{Jan:540524}],
        optionVip: {
          title: {},
          tooltip : {
            trigger: 'item',
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['vip1', 'vip2','vip3','vip4','vip5']
          },
          series : [
            {
              type: 'pie',
              radius : '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data:[
                {
                  value:1548,
                  name: 'vip1',
                  label: {
                    normal: {
                      backgroundColor: '#eee',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                        title: {
                          color: '#eee',
                          align: 'center'
                        },
                        abg: {
                          backgroundColor: '#333',
                          width: '100%',
                          align: 'right',
                          height: 25,
                          borderRadius: [4, 4, 0, 0]
                        },

                        weatherHead: {
                          color: '#333',
                          height: 24,
                          align: 'left'
                        },
                        hr: {
                          borderColor: '#777',
                          width: '100%',
                          borderWidth: 0.5,
                          height: 0
                        },
                        value: {
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'left'
                        },
                        valueHead: {
                          color: '#333',
                          width: 20,
                          padding: [0, 20, 0, 30],
                          align: 'center'
                        },
                        rate: {
                          width: 40,
                          align: 'right',
                          padding: [0, 10, 0, 0]
                        },
                        rateHead: {
                          color: '#333',
                          width: 40,
                          align: 'center',
                          padding: [0, 10, 0, 0]
                        }
                      }
                    }
                  }
                },
                {value:535, name: 'vip2'},
                {value:510, name: 'vip3'},
                {value:634, name: 'vip4'},
                {value:735, name: 'vip5'}
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
        // selTwoVal: [{year:2012,allCount:5650},{year:2013,allCount:6630},{year:2014,allCount:7630},{year:2015,allCount:8520},{year:2016,allCount:10030},{year:2017,allCount:15030},{year:2018,allCount:25630}],
        value:null,
        options:[{value:1,label:2015},{value:2,label:2016},{value:3,label:2017},{value:4,label:2018},{value:5,label:2019}]
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine: function(){
        //基于准备好的DOM，初始化echarts实例
        let chartMainVip = this.$echarts.init(document.getElementById('chartMainVip'));
        //绘制图表
        chartMainVip.setOption(this.optionVip);
      },
      orderYear (a) {
        let wa = a.year;
        for ( let i = 0 ; i < this.selTwoVal.length ; i ++ ) {
          if (wa === this.selTwoVal[i].year) {
            this.charA = this.selTwoVal[i].allCount;
            this.optionVip.title.subtext=this.selTwoVal[i].allCount;
            this.optionVip.series[0].data[0].value=300;
            console.log(this.charA)
          }
        }

      }
    }
  })
</script>

<style scoped>
  #chartMainVip,#chartmainline{
    width: 100%;
    height: 400px;
  }
  #hel{
    margin-top: 25px;
    color: saddlebrown;
    font:500 25px/38px 宋体 serif;
  }
</style>
