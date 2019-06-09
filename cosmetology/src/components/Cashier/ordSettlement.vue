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
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号 #" prop="id" width="60">
        </el-table-column>
        <el-table-column label="商品名称" prop="commodityBrand_name" width="160">
        </el-table-column>
        <el-table-column label="数量" prop="commodity_shoppingTrolley_commodityAmoun" width="80">
        </el-table-column>
        <el-table-column label="商品单价" prop="commodityBatch_sale" width="80">
        </el-table-column>
        <el-table-column label="应付金额" prop="sum" width="120">
        </el-table-column>
        <el-table-column label="会员折扣" prop="vip_discount" width="80">
        </el-table-column>
        <el-table-column label="实付金额" prop="realSum" width="120">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="ordInfoData1">
        <div><span>{{ordBalance[0].item}}:</span><span>{{ordBalance[0].item_content}}</span></div>
        <div><span>银行卡:</span><span>{{ordBalance[0].item_content}}</span></div>
        <div><span>免单抹零:</span><span>{{ordBalance[0].item_content}}</span></div>

      </div>
      <div class="ordInfoData2">
        <!--会员类别-->
        <div><span>会员卡:</span><span>{{}}</span></div>
        <div>
          <div><span>卡内余额(消费前):</span><span>{{vipInfo.customer_balance}}</span></div>
          <div><span>卡内余额(消费后):</span><span>{{moneyLast}}</span></div>
          <div><span>卡内积分(消费前):</span><span>{{vipInfo.customer_vipIntegration}}</span></div>
          <div><span>卡内积分(消费后):</span><span>{{vipInfo.customer_vipIntegration}}</span></div>
        </div>
      </div>
    </div>
    <div>
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
        shoppingTrolley_id: "",//订单编号
        tableData: [],
        vipInfo: [],
        ordBalance: [
          {
            item: "应收金额",
            item_content: 0
          }, {
            item: "消费金额",
            item_content: 0,
          }, {
            item: "折扣金额",
            item_content: 0
          }
        ],
      }
    },
    methods: {
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
        // 订单ID 收银员ID  用户ID
        this.$axios.post(this.$api.cashierRight.carSettlement, {}, this.$config).then((res) => {
          if (res.data) {
            this.operationPromptProper("结算成功!");
          } else {
            this.operationPromptWarning("结算失败!");
          }
        }).catch((err) => {
          console.log(err);
        });
      },
    },
    filters: {},
    computed: {
      moneyLast() {
        this.tableData.forEach((item) => {
          this.ordBalance[0].item_content += parseFloat(item.sum);
          this.ordBalance[1].item_content += parseFloat(item.realSum);
        });
        this.ordBalance[0].item_content = (this.ordBalance[0].item_content).toFixed(2);
        this.ordBalance[1].item_content = (this.ordBalance[1].item_content).toFixed(2);
        this.ordBalance[2].item_content = (this.ordBalance[0].item_content - this.ordBalance[1].item_content).toFixed(2);
      }
    },
    beforeMount() {
      // this.$axios.get('http://5cee59d21c2baf00142cbdf5.mockapi.io/carInfo').then((res) => {
      //   this.tableData = res.data;
      //   this.dataCalc();//计算出每个订单的乘积数据
      //   this.sumDataCalc();//计算出总订单的信息
      // }).catch((err) => {
      //   this.operationPromptWarning(err);
      // });
      // this.$axios.get('http://5cee59d21c2baf00142cbdf5.mockapi.io/odrList').then((res) => {
      //   this.vipInfo = res.data[0];
      //   console.log(this.vipInfo);
      //
      // }).catch((err) => {
      //   this.operationPromptWarning(err);
      // });
      this.tableData = this.$store.state.carOrdList; //获取vuex的表格数据
      this.shoppingTrolley_id = this.$store.state.oderNumber; //获取vuex的订单号

    }
  }
</script>

<style scoped>
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
