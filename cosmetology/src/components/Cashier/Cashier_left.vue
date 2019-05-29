<template>
    <el-container class="left">
      <el-header>
        <el-row>
          <el-button class="button-left" round>刷卡</el-button>
          <el-button class="button-left" round>预约</el-button>
          <el-button class="button-right" round>添加客户</el-button>
        </el-row>
        <el-row>
          <div class="block">
            <span class="demonstration head-span">订单时间:</span>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="cashier">
            <p class="head-span">收银员:</p>
            <el-select v-model="value" placeholder="选择">          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </div>
        </el-row>
        <el-row>
          <span class="head-span">订单状态：</span>
          <el-radio-group v-model="radio">
            <el-radio :label="1">待支付</el-radio>
            <el-radio :label="2">已支付</el-radio>
            <el-radio :label="3">已作废</el-radio>
            <el-radio :label="4">全部</el-radio>
          </el-radio-group>
        </el-row>
      </el-header>
      <div></div>
      <el-divider></el-divider>
      <el-main>neirong</el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Cashier_left",
      data() {
        return {
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value1: '',
          value2: '',
          radio: 1,
          options: [{
            value: '选项1',
            label: '张三'
          }, {
            value: '选项2',
            label: '李四'
          }, {
            value: '选项3',
            label: '王五'
          }],
          value: ''
        };
      }
    }
</script>

<style scoped>
  .left{
    width: 490px;
    height: 100%;
    border: 2px solid black;
    float: left;
  }
  .el-row{
    margin: 15px 0;
    border: 1px solid red;
  }
  .button-left{
    float: left;
  }
  .button-right{
    float: right;
  }
  /*订单时间*/
  .block{
    float: left;
  }
  .block div:nth-child(2){
    width: 240px;
  }
  .head-span{
    font-size: 14px;
  }
  /*收银员*/
  .cashier{
    width: 80px;
    display: -webkit-box;
  }
  .cashier p{
    padding-left: 15px;
  }
  header{
    height: 170px;
  }
</style>
