<template>
  <el-container class="left">
    <el-header style="height: 170px">
      <el-row>
        <!--<&#45;&#45;刷卡功能-->
        <el-button @click="open" class="button-left" round>刷卡</el-button>
        <!--预约功能-->
        <!--<el-button class="button-left" round>预约</el-button>-->
        <!--添加客户-->
        <el-button class="button-right" round @click="customerShow">添加客户</el-button>
      </el-row>
      <el-row>
        <div class="block">
          <span class="demonstration head-span">订单时间:</span>
          <el-date-picker
            @change="stateChange"
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
          <el-select v-model="value" @change="personChange">
            <el-option
              v-for="item in options"
              :key="item.value_id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-row>
      <!--订单状态-->
      <el-row>
        <span class="head-span">订单状态：</span>
        <el-radio-group v-model="radio" @change="stateChange">
          <el-radio :label="0">待支付</el-radio>
          <el-radio :label="1">已支付</el-radio>
          <el-radio :label="2">已作废</el-radio>
          <el-radio :label="5">全部</el-radio>
        </el-radio-group>
      </el-row>
    </el-header>
    <div></div>
    <el-divider></el-divider>
    <!--订单列表-->
    <el-main>
      <el-table :data="tableData" border style="width: 100%" row-key="id" :expand-row-keys="expands"
                @row-click="rowClick">
        <el-table-column style="width: 0" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编号:">
                <span>{{ props.row.oderNumber }}</span>
              </el-form-item>
              <el-form-item label="">
                <!--订单作废弹框-->
                <el-popover
                  placement="top"
                  width="160"
                  v-model="visible">
                  <p class="red">删除操作将不可恢复，确定要将该订单【<span>{{ props.row.oderNumber }}</span>】删除吗?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="[visible = false,delFun()]">确定</el-button>
                  </div>
                  <el-button style="border:none" slot="reference">订单作废</el-button>
                </el-popover>
              </el-form-item>
              <el-form-item label="订单详情" @click.native="orderDetails(props.row.name)">
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
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
          label="订单生成时间">
          <template slot-scope="scope">
            {{scope.row.time}}
          </template>
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
        visible: false,//订单作废
        expands: [],
        //当前日期后面不可选择
        pickerBeginDateBefore: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        value_id: '',
        radio: 0,
        options: [],
        value: '国鹏',
        name_id: '',
        // tollManList: ["张三", "李四", "王五"],//收银员数据
        tollManList: [],//收银员数据
        //  订单列表
        tableData: [],
        tableDataList: [],
        //  订单编号
        orderId: '',
        oldState:''//原订单状态，数字
      };
    },
    created() {
      //  默认日期设置
      let now = new Date();
      let startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
      let endDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000);
      // let startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
      // let endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10);
      this.value1 = [];
      this.value1.push(startDate);
      this.value1.push(endDate);
    },
    beforeMount() {
      console.log('收银员');
      this.$axios.post("http://172.17.1.237:8080/user/idAndName",this.$config).
        then((res)=>{
        // console.log("员工");
        this.tollManList = res.data.data;
        this.$store.state.cashierId = this.tollManList[0].user_id;
        // console.log(this.tollManList);
        //收银员数据更新
        for (let i = 0; i < this.tollManList.length; i++) {
          this.options.push({
            value: this.tollManList[i].user_id,
            label: this.tollManList[i].user_name,
            key: this.tollManList[i].user_id
          });
        }
        this.value = this.tollManList[0].user_name;
        this.value_id = this.tollManList[0].user_id;
        //订单列表更新
        this.tableDataGet();
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      GMTToStr(time) {
        let date = new Date(time)
        let Str = date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + ' ' +
          date.getHours() + ':' +
          date.getMinutes() + ':' +
          date.getSeconds()
        return Str;
      },
      delFun() {
        console.log("id"+this.orderId);
        console.log("状态"+this.oldState);
        this.$axios.post('http://172.17.1.237:8080/order/updateOrderStatus', {order_id:this.orderId,order_status:2}, this.$config).
        then((res) => {
          // console.log(res.data);
        }).catch((err) => {
          console.log(err);
        })
      },
      tableDataGet: function () {
        let start = new Date(this.value1[0]);
        let end = new Date(this.value1[1]);
        end = new Date(end.setHours(23, 59, 59));
        let name_id = 2;
        let state = this.radio;
        if (state === 5) {
          state = "";
        }
        this.tableData = [];

        this.$axios.post("http://172.17.1.237:8080/order/selectByCondition", {
          date1: this.GMTToStr(start),
          date2: this.GMTToStr(end),
          user_id: name_id,
          order_status: state,
          startIndex: 1,
          pageCount: 6,
        }, this.$config).then((res) => {//发送请求
          // console.log('列表显示');
          this.tableDataList = res.data.data;
          // console.log(this.tableDataList);
          if(this.tableDataList != null){
            for (let i = 0; i < this.tableDataList.length; i++) {
              let obj = {};
              obj.id = i+1;
              obj.name = this.tableDataList[i].customer_name;
              obj.oldState = this.tableDataList[i].order_status;
              if (obj.oldState === 0){
                obj.state = "待支付";
              }else if (obj.oldState === 1){
                obj.state = "已支付";
              }else if (obj.oldState === ''){
                obj.state = "全部";
              }
              obj.time = this.GMTToStr(this.tableDataList[i].order_time);
              obj.oderNumber = this.tableDataList[i].order_id;
              this.tableData.push(obj);
            }
          }
        }).catch((err) => {
          console.log(err)
        });
      },
      //日期点击
      stateChange: function () {
        // console.log("点击");
        // this.name_id = event;
        this.tableDataGet();
      },
      // 收银员选择
      personChange(event) {
        // console.log(event);
        this.value_id = event;
        this.$store.state.cashierId = event;
        this.tableDataGet();
      },
      //鼠标点击展开订单详情
      rowClick(row, event, column) {
        // console.log('展开');
        // console.log(row);
        this.oldState = row.oldState;
        this.orderId = row.oderNumber;
        this.$store.commit("getOderNumber", row.oderNumber);
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row.id) < 0) {
          this.expands = [];
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }
      },
      open() {
        this.$prompt('请输入手机号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
          inputErrorMessage: '手机格式不正确'
        }).then(({value}) => {
          this.$store.commit("getPhone", value);//提交数据到vuex store
          this.$axios.post(this.$api.cashierRight.cusInfo, {
            phone: value
          }, this.$config).then((res) => {
            console.log(res.data);
            this.$store.commit("getOderNumber", res.data.data.shoppingTrolley.shoppingTrolley_id);//保存订单号
            // console.log(res.data.data.shoppingTrolley.shoppingTrolley_id);
            this.$store.commit("getVipInfo", res.data.data.customer);//保存会员数据
            this.$store.state.orderCar = res.data.data.Commodity_shoppingTrolley;//获取购物车信息
            this.$message({
              type: 'success',
              message: '手机号是: ' + value,
            });
          }).catch((err) => {
            console.log(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      customerShow() {
        // this.$router.push({path:'/customerShow'});
        this.$store.commit("addCustomer");
      },
      orderDetails(name) {
        this.$store.commit("getOrderId", this.orderId);
        this.$router.push({name: 'OrderDetails', params: {customer: name}})
      }
    }
  }
</script>

<style scoped>
  .left {
    width: 490px;
    height: 100%;
    border: 2px solid #EEE;
    border-radius: 6px;
    float: left;
    overflow: hidden;
    margin-right: 20px;
  }

  .el-row {
    margin: 15px 0;
    /*border: 1px solid red;*/
    line-height: 40px;
    text-align: left;
  }

  .button-left {
    float: left;
  }

  .button-right {
    float: right;
  }

  /*订单时间*/
  .block {
    float: left;
  }

  .block div:nth-child(2) {
    width: 240px;
  }

  .head-span {
    font-size: 14px;
    /*float: left;*/
  }

  /*收银员*/
  .cashier {
    width: 80px;
    display: -webkit-box;
  }

  .cashier p {
    padding-left: 15px;
  }

  /*#head{*/
  /*height: 170px;*/
  /*}*/
  .el-table__expanded-cell {
    border: 1px solid red;
    padding-bottom: 0;
    padding-top: 0;
  }

  .el-table__expanded-cell > form {
    height: 40px;
  }

  .red {
    color: red;
  }
</style>
