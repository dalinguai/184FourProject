<template>
    <el-container class="left">
      <el-header style="height: 170px">
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
              :picker-options="pickerBeginDateBefore"
              end-placeholder="结束日期"
              size="small"
              class="margin-right-10">
            </el-date-picker>
          </div>
          <div class="cashier">
            <p class="head-span">收银员:</p>
            <el-select v-model="value" placeholder="选择">
              <el-option
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
          <el-radio-group v-model="radio" @change="stateChange">
            <el-radio :label="1">待支付</el-radio>
            <el-radio :label="2">已支付</el-radio>
            <el-radio :label="3">已作废</el-radio>
            <el-radio :label="4">全部</el-radio>
          </el-radio-group>
        </el-row>
      </el-header>
      <div></div>
      <el-divider></el-divider>
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="number"
            label="序号"
            width="50"
          align="center">
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="顾客姓名"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="state"
            label="订单状态"
            width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="time"
            label="订单生成时间">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Cashier_left",
      data() {
        return {
          //当前日期后面不可选择
          pickerBeginDateBefore:{
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },
          value1: '',
          value2: '',
          radio: 4,
          options: [],
          value: '',
          tollManList:["张三","李四","王五"],//收银员数据
          //  订单列表
          tableData: [],
          tableDataList:[],
        };
      },
      created(){
        //  默认日期设置
        let now = new Date();
        let startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
        let endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
        this.value1=[];
        this.value1.push(startDate);
        this.value1.push(endDate);
      },
      beforeMount() {
          //收银员数据更新
          for (let i = 0;i < this.tollManList.length;i ++){
            this.options.push({value:this.tollManList[i],label:this.tollManList[i]});
          }
          //订单列表更新
          this.tableDataGet();
      },
      methods:{
          tableDataGet:function () {
            this.tableData = [];
            this.$axios.get("/static/ly.json",{name:"张三"}).then((res)=>{//发送请求
              this.tableDataList = res.data;
              for (let i = 0;i < this.tableDataList.length;i ++){
                let obj = {};
                obj.number = this.tableDataList[i].id;
                obj.name = this.tableDataList[i].name;
                obj.state = this.tableDataList[i].state;
                obj.time = this.tableDataList[i].time;
                this.tableData.push(obj);
              }
            }).catch((err)=>{
              console.log(err)
            });
          },
          stateChange:function () {
            this.tableDataGet();
          }
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
    line-height: 40px;
    text-align: left;
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
    /*float: left;*/
  }
  /*收银员*/
  .cashier{
    width: 80px;
    display: -webkit-box;
  }
  .cashier p{
    padding-left: 15px;
  }
  /*#head{*/
    /*height: 170px;*/
  /*}*/
</style>
