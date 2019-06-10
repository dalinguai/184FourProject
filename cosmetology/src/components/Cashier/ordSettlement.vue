<template>
  <el-card class="box-card">
    <div class="box-tittle clearfix">
      <span>结算</span>
      <span>
       <span>订单编号:</span>
       <span>{{shoppingTrolley_id}}</span>
      </span>
    </div>
    <br/><br/>
    <div class="balanceBox vipBalance">
      <ul class="cleatfix">
        <li v-for="item in ordBalance"><span>{{item.item}}</span><span>{{item.item_content}}</span></li>
      </ul>
    </div>
    <div class="ordTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="名称" width="240">
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodity_name,scope.row.courseTreatment_name)}}
          </template>
        </el-table-column>
        <el-table-column prop="commodity_shoppingTrolley_commodityAmount" label="数量" width="80">
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodity_shoppingTrolley_commodityAmoun,scope.row.commodity_shoppingTrolley_courseTreatmentTimes)}}
          </template>
        </el-table-column>
        <el-table-column prop="commodityBatch_sale" label="单价">
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodityBatch_sale,scope.row.courseTreatmentAmount) | toFix}}
          </template>
        </el-table-column>
        <el-table-column label="应付金额" prop="sum" width="120">
        </el-table-column>
        <!--<el-table-column label="会员折扣" prop="vip_discount" width="80">-->
        <!--</el-table-column>-->
        <!--<el-table-column label="实付金额" prop="realSum" width="120">-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <div class="integral">
      <div>
        <el-checkbox v-model="rule.integralChecked">是否抵扣积分</el-checkbox>
      </div>

      <div v-show="rule.integralChecked">
        <div>
          <span>抵扣的积分数量</span>
          <el-input v-model="rule.integralNumber" style="width: 100px"
                    size="mini" :blur="getData()"></el-input>
        </div>
        <div>
          <span>选择积分规则(或抵扣活动)</span>
          <el-select v-model="rule.method" placeholder="请选择" id="integral" size="mini" :change="getData()">
            <el-option
              v-for="item in integralRule"
              :key="item.integrationRule_id"
              :label="item.text"
              :value="item.integrationRule_id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <span>支付方式</span>
        <el-select v-model="rule.payType" placeholder="请选择支付方式" size="mini" :change="getData()">
          <el-option
            v-for="item in payType"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单备注</span>
        <el-input v-model="rule.remake" placeholder="请输入订单备注" size="mini" style="width: 200px"></el-input>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button @click="settlement">结算</el-button>
      <el-button @click="backMain">取消</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "ordSettlement",
    data() {
      return {
        payType: [
          {
            value: "0",
            text: "现金支付"
          },
          {
            value: "1",
            text: "支付宝支付"
          },
          {
            value: "2",
            text: "微信支付"
          },
          {
            value: "3",
            text: "卡内余额支付"
          }],
        integral: 0,
        shoppingTrolley_id: "",//订单编号
        tableData: [],
        vipInfo: [],
        ordBalance: [
          {
            item: "商品总计",
            item_content: 0
          }, {
            item: "疗程总计",
            item_content: 0,
          }, {
            item: "全部总计",
            item_content: 0
          }
        ],
        integralRule: [],//积分规则
        resCarData: null,//保存服务器计算的数据
        rule: {
          payType: "0",//支付方式
          integralChecked: false,//是否抵扣积分
          method: 1,//积分规则
          integralNumber: 0,//抵扣的积分
          remake: "",
        }
      }
    },
    methods: {
      //获取有效数据
      getUsefulData(pro, tre) {
        return (pro ? pro : tre);
      },
      backMain() {
        this.$router.push({path: '/cashier/right'});
      },
      //操作正确提示
      operationPromptProper(text = "") {
        this.$notify({
          title: '成功',
          message: text == "" ? "修改成功" : text,
          type: 'success',
        });
      },
      //取消操作提示
      operationPromptCancel(text) {
        this.$notify.info({
          title: '取消',
          message: text == "" ? "取消操作" : text,
        });
      },
      //操作警告提示
      operationPromptWarning(err) {
        this.$notify.error({
          title: '错误',
          message: '系统错误:' + err,
        });
      },

      // //计算出每列的值
      // dataCalc() {
      //   this.tableData.forEach(function (item) {
      //     item.sum = (parseFloat(item.commodity_number) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)).toFixed(2);
      //     item.realSum = (parseFloat(item.commodity_number) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)
      //       * (1 - parseFloat(item.vip_discount))).toFixed(2);
      //   });
      // },
      // //计算出总的值
      // sumDataCalc() {
      //   this.tableData.forEach((item) => {
      //     this.ordBalance[0].item_content = (parseFloat(this.ordBalance[0].item_content) + parseFloat(item.realSum)).toFixed(2);
      //     this.ordBalance[1].item_content = (parseFloat(this.ordBalance[1].item_content) + parseFloat(item.sum)).toFixed(2);
      //   });
      //   this.ordBalance[2].item_content = (this.ordBalance[1].item_content - this.ordBalance[0].item_content).toFixed(2);
      // },

      //订单结算
      settlement() {
        this.$axios.post(this.$api.cashierRight.makeAOrd, {
          customer_id: this.$store.state.vipInfo.customer_id,
          shoppingTrolley_id: this.$store.state.oderNumber,
          user_id: this.$store.state.cashierId,
          order_deductionIntegral: this.rule.integralNumber,
          integrationRule_id: this.rule.method,
          order_remark: ""
        }, this.$config).then((res) => {
          if (res.data.returnCode === "200") {
            this.$axios.post(this.$api.cashierRight.carGetOrd, {
              order_id: this.$store.state.oderNumber,
              payType: this.rule.payType
            }, this.$config).then((res) => {
              console.log(res.data);
              if (res.data.returnCode === "200") {
                this.operationPromptProper("结算成功!");
                this.backMain();
              } else {
                this.operationPromptWarning("结算失败!");
              }
            }).catch((err) => {
              console.log(err);
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      getData() {
        this.$axios.post(this.$api.cashierRight.carCalcRule, {
          shoppingTrolley_id: this.$store.state.oderNumber,
          order_deductionIntegral: this.rule.integralNumber,
          integrationRule_id: this.rule.method,
          payType: this.rule.payType
        }, this.$config).then((res) => {
          console.log(res.data);
          if (res.data.returnCode == "200") {
            this.resCarData = res.data.data;
            this.integralRule = res.data.data.IntegrationRule;//保存积分规则
            this.rule.method = this.integralRule[0].integrationRule_id;//默认双向绑定的数据
            this.integralRule.forEach((item) => {
              item.text = "每" + item.integrationRule_consumeIntegration + "积分,可抵扣" + item.integrationRule_deductionMoney + "元"
            })
          }
        }).catch((err) => {
          console.log(err);
        });
      },
    },
    filters: {
      toFix(data) {
        return parseFloat(data).toFixed(2);
      },
    },
    computed: {
      // moneyLast() {
      //   this.tableData.forEach((item) => {
      //     this.ordBalance[0].item_content += parseFloat(item.sum);
      //     this.ordBalance[1].item_content += parseFloat(item.realSum);
      //   });
      //   this.ordBalance[0].item_content = (this.ordBalance[0].item_content).toFixed(2);
      //   this.ordBalance[1].item_content = (this.ordBalance[1].item_content).toFixed(2);
      //   this.ordBalance[2].item_content = (this.ordBalance[0].item_content - this.ordBalance[1].item_content).toFixed(2);
      // }
    },
    beforeMount() {
      this.getData();
      this.tableData = this.$store.state.orderCar; //获取vuex的表格数据
      console.log("settle数据");
      console.log(this.tableData);
      this.shoppingTrolley_id = this.$store.state.oderNumber; //获取vuex的订单号
      this.ordBalance = this.$store.state.carOrdList;
    }
  }
</script>

<style scoped>
  .bottom-btn {
    display: flex;
    justify-content: center;
  }

  .integral {
    margin: 20px 0;
  }

  .ordInfoData1 {
    margin: 20px 0;
  }

  .ordInfoData1, .ordInfoData2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .ordInfoData2 {
    border: 1px solid #eee;
    margin: 20px 0;
  }

  .ordInfoData2 > div > div {
    margin: 10px 40px;
  }

  .ordInfoData2 > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .ordInfoData2 > div:nth-child(2) {
    width: 50%;
  }

  .box-card {
    width: 790px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .box-tittle {
    float: left;
    vertical-align: baseline;
  }

  .box-tittle > span:nth-child(1) {
    font-size: 28px;
    font-weight: 700;
    margin-right: 20px;
  }

  .box-tittle > span:nth-child(2) {
    font-size: 14px;
  }

  .box-tittle > span:nth-child(2) > span:nth-child(1) {
    font-weight: 700;
  }

  .clearfix::after {
    clear: both;
  }

  .balanceBox {
    margin: 20px 0;
  }

  .balanceBox > ul > li {
    float: left;
    list-style: none;
    margin: 0 10px;
  }

  .balanceBox > ul > li {
    margin-left: 0 !important;
  }

  .balanceBox > ul > li > span:nth-child(1) {
    margin-right: 2px;
    font-weight: 700;
  }

  .balanceBox > ul {
    overflow: hidden;
    vertical-align: middle;
    line-height: 40px;
  }

  .clearfix::before,
  .clearfix::after {
    display: table;
    content: "";
  }

  .btnSubmit * {
    float: right;
  }

  .vipBalance {
    float: left;
    border: 1px solid #f5f5f5;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .vipBalance > ul > li {
    float: left;
    list-style: none;
    font-size: 0;
    height: 40px;
  }

  .vipBalance > ul > li > span {
    font-size: 14px;
    display: inline-block;
    padding: 0 15px;
  }

  /*.vipBalance > ul > li:nth-child(1){*/
  /*margin-left: 0;*/
  /*}*/
  /*.vipBalance > ul > li:last-child{*/
  /*margin-right: 0;*/
  /*}*/
  .vipBalance > ul > li > span:nth-child(1) {
    font-weight: bold;
    display: inline-block;
    background: #f5f5f5;
  }

  .vipBalance > ul {
    overflow: hidden;
    vertical-align: middle;
    line-height: 40px;
  }
</style>
