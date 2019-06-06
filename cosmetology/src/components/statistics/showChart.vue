<template>
  <div>
    <div id="nel">总利润季度分布</div>
    <el-select v-model="valueJdu" placeholder="选择年度" value="item.value" style="width: 130px;height: 30px">
      <el-option
        v-for="item in optionsJdu" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
      <div id="chartmainAAA"></div>

  </div>
  </template>

<script>
    export default {
        name: "showChart",
      data(){
          return{
            optionVipA: {
              title: {},
              tooltip : {
                trigger: 'item',
              },
              legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['vip1', 'vip2','vip3','vip4']
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
                      name: '春季',
                      label: {
                        normal: {
                          // backgroundColor: '#eee',
                          // borderWidth: 1,
                          // borderRadius: 4,
                          fontSize:15,
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
                    {value:535, name: '夏季',label: {
                        normal: {
                          // backgroundColor: '#eee',
                          // borderWidth: 1,
                          // borderRadius: 4,
                          fontSize:15,
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
                      }},
                    {value:510, name: '秋季',label: {
                        normal: {
                          // backgroundColor: '#eee',
                          // borderWidth: 1,
                          // borderRadius: 4,
                          fontSize:15,
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
                      }},
                    {value:5555, name: '冬季',label: {
                        normal: {
                          // backgroundColor: '#eee',
                          // borderWidth: 1,
                          // borderRadius: 4,
                          fontSize:15,
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
                      }},
                  ],
                  itemStyle: {
                    // emphasis: {
                    //   // shadowBlur: 10,
                    //   shadowOffsetX: 0,
                    //   shadowColor: 'rgba(0, 0, 0, 0.5)'
                    // }
                  }
                }
              ]
            },
            valueJdu:null,
            optionsJdu:[{value:1,label:2015},{value:2,label:2016},{value:3,label:2017},{value:4,label:2018},{value:5,label:2019}]
          }
      },
      mounted() {
        // this.getDataA();
        this.drawLine()
      },
      methods: {
        drawLine: function(){
          //基于准备好的DOM，初始化echarts实例
          let chartmainline = this.$echarts.init(document.getElementById("chartmainAAA"));
          //绘制图表
          chartmainline.setOption(this.optionVipA);
        },
        getDataA :function () {
          let api = 'http://5cec9881b779120014b4974f.mockapi.io/demo/lxy';
          this.$axios.get(api).then(function (res) {
            console.log('hahah');
            console.log(res.data)
          }).catch(error=>{
            console.log('ERROR',error.message);
          });
        },

      }
    }
</script>

<style scoped>
  #nel{
    margin-top: 25px;
    color: saddlebrown;
    font:500 25px/38px 宋体 serif;
  }
  #chartmainAAA{
    width: 100%;
    height: 400px;
    /*font:500 58px/54px 宋体 Serif;*/
  }
</style>
