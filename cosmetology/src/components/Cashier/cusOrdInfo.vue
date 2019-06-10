<template>
  <el-card class="box-card cusOrdInfo clearfix">
    <div class="c-topBar">
      <div>
        <el-button class="Settlement" @click="jumpToSettlement">结算&ensp;+</el-button>
        <el-button @click="addProToCar">添加购买</el-button>
      </div>
      <div>
        <el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容"
                         :trigger-on-focus="false"
                         @select="handleSelect">
          <template slot="prepend">产品名称：</template>
        </el-autocomplete>
        <el-button @click="quicklyAdd">快速添加</el-button>
      </div>
    </div>
    <div class="odrBalance">
      <span v-for="(item,index) in ordBalance">
          <span>{{item.item}}</span>
          <span>{{item.item_content | toFix()}}</span>
      </span>
    </div>
    <div class="ordList">
      <el-table :data="newList" style="width: 100%;" border height="290">
        <el-table-column   label="名称" width="180">
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodity_name,scope.row.courseTreatment_name)}}
          </template>
        </el-table-column>
        <el-table-column prop="commodity_shoppingTrolley_commodityAmount" label="数量" width="80">
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodity_shoppingTrolley_commodityAmount,scope.row.commodity_shoppingTrolley_courseTreatmentTimes)}}
          </template>
        </el-table-column>
        <el-table-column prop="commodityBatch_sale" label="单价" >
          <template slot-scope="scope">
            {{getUsefulData(scope.row.commodityBatch_sale,scope.row.courseTreatmentAmount) | toFix}}
          </template>
        </el-table-column>
        <el-table-column prop="sum" label="小计" >
        </el-table-column>
        <el-table-column prop="user_name" label="销售人员">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="updatePage();vuexOperatingProId(scope.row.id)">修改</el-button>
            <el-button size="small" @click="deleteConfirm(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "cusOrdInfo",
    data() {
      return {
        restaurants: [],//保存搜索框的内容
        state2: '',//搜索框value
        ordBalance: [
          {
            item: "商品总计",
            item_content: 0,
          },
          {
            item: "疗程总计",
            item_content: 0,
          },
          {
            item: "全部总计",
            item_content: 0,
          },
        ],
        newList: [],//购物车信息
      }
    },
    methods: {
      updatePage() {
        this.$router.push({path: '/cashier/ordModify'})
      },
      jumpToSettlement() {
        // console.log("订单编号:" + this.$store.state.oderNumber);
        if (this.$store.state.oderNumber) {
          this.$router.push({path: '/cashier/ordSettlement'})
        }
      },
      addProToCar() {
        // console.log("订单编号:" + this.$store.state.oderNumber);
        if (this.$store.state.oderNumber) {
          this.$router.push({path: '/cashier/ordPurchasing'})
        }
      },
      //请求数据
      getData() {
        //根据订单号查询数据
        this.$axios.post(this.$api.cashierRight.carData, {
          order_id: this.$store.state.oderNumber
        }, this.$config).then((res) => {
          console.log(res.data);
          this.newList = res.data.data.Commodity_shoppingTrolley;
          this.ordBalance[0].item_content = res.data.data.shoppingTrolley.shoppingTrolley_commodityPrice;
          this.ordBalance[1].item_content = res.data.data.shoppingTrolley.shoppingTrolley_courseTreatmentPrice;
          this.ordBalance[2].item_content = parseFloat(this.ordBalance[0].item_content) + parseFloat(this.ordBalance[1].item_content);
          this.dataCalc();
          // this.sumDataCalc();
          this.$store.state.orderCar =  this.newList;
          this.$store.state.carOrdList = this.ordBalance;
        }).catch((err) => {
          console.log(err);
        });
      },
      // //计算出每列的值
      dataCalc() {
        this.newList.forEach((item) => {
          item.sum = (parseFloat(this.getUsefulData(item.commodity_shoppingTrolley_commodityAmount,item.commodity_shoppingTrolley_courseTreatmentTimes)) *
            parseFloat(this.getUsefulData(item.commodityBatch_sale,item.courseTreatmentAmount))).toFixed(2);
          // item.realSum = (parseFloat(item.commodityBatch_sale) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)
          //   * (1 - parseFloat(item.vip_discount))).toFixed(2);
        });
      },
      // //计算出总的值
      // sumDataCalc() {
      //   this.newList.forEach((item) => {
      //     this.ordBalance[0].item_content = (parseFloat(this.ordBalance[0].item_content) + parseFloat(item.sum)).toFixed(2);
      //     this.ordBalance[1].item_content = (parseFloat(this.ordBalance[1].item_content) + parseFloat(item.sum)).toFixed(2);
      //   });
      //   this.ordBalance[2].item_content = (parseFloat(this.ordBalance[1].item_content) - parseFloat(this.ordBalance[0].item_content)).toFixed(2);
      // },
      //删除
      getNumber(number){
        return (number?number:1);
      },
      deleteConfirm(index, row) {
        // console.log(index, row);
        console.log(row);
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //传对应行的商品ID
          this.$axios.post(this.$api.cashierRight.carDelete, {
            "commodity_shoppingTrolley_id": row.commodity_shoppingTrolley_id,
            "shoppingTrolley_id": this.$store.state.oderNumber,
            }, this.$config).then((res) => {
            if (res.data) {//返回删除成功,进行删除 data.returncode == 200
              this.getData();
              this.operationPromptProper();
            }
          }).catch((err) => {
            this.operationPromptWarning(err);
          });
        }).catch(() => {
          this.operationPromptCancel();
        });
      },
      //操作正确提示
      operationPromptProper() {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
        });
      },
      //取消操作提示
      operationPromptCancel() {
        this.$notify.info({
          title: '取消',
          message: '取消操作',
        });
      },
      //操作警告提示
      operationPromptWarning(err) {
        this.$notify.error({
          title: '错误',
          message: '系统错误:' + err,
        });
      },
      handleSelect(item) {
        // console.log(item);
        this.$axios.post(this.$api.cashierRight.carInsertAdd, {
          "shoppingTrolley_id": this.$store.state.oderNumber,
          "commodityBatch_id": item.commodityBatch_id,
          "commodityAmount": item.commodity_shoppingTrolley_commodityAmount,
          "user_id": item.user_id,
          "courseTreatment_id": "",
          "courseTreatmentTimes": ""
        },this.$config).then((res) => {
          console.log(res.data);
          if (true) {
            this.operationPromptProper("提交成功");
            // this.backMain();
          } else {
            this.operationPromptWarning("添加失败");
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      vuexOperatingProId(id) {
        this.$store.state.proId = id;
      },
      quicklyAdd() {
        this.$axios.post(this.$api.cashierRight.carInsert, {namelike: this.state2},//向服务器传送搜索的文字,服务器返回文字
          this.$config).then((res) => {
          // console.log("数据来了");
          this.proData = res.data.data;//搜索出的内容保存到本地
        }).catch((err) => {
          console.log(err);
        })
      },
      //获取有效数据
      getUsefulData(pro,tre){
        return (pro?pro:tre);
      },
      //积分请求
      getIntegralData(){
        this.$axios.post(this.$api.cashierRight.integralRule).then((res)=>{
          // console.log(res.data);
        }).catch((err)=>{
        console.log(err);
        });
      }
    },
    filters: {
      toFix(data) {
        return parseFloat(data).toFixed(2);
      }
    },
    beforeMount() {
      this.getData();//挂载前请求数据
      this.getIntegralData();//获取积分规则
    },
    computed: {
      //监听订单编号
      getCarNumber() {
        return this.$store.state.oderNumber;
      },
      getCarOrdList() {
        return this.$store.state.carOrdList;
      },
    },
    watch: {
      getCarNumber() {
        // console.log("订单号改变");
        // console.log(this.$store.state.oderNumber);
        this.getData();
      }
    }
  }
</script>

<style scoped>
  .cusOrdInfo {
    text-align: unset !important;
    width: 790px;
    margin-top: 10px;
  }

  .c-topBar {
    border-bottom: 3px solid #eee;
    overflow: hidden;
    padding-bottom: 20px;
  }

  .c-topBar > button {
    font-weight: bold !important;
    vertical-align: bottom;
  }

  .Settlement {
    font-size: 16px;
    padding: 12px 26px;
  }

  .c-topBar > div:nth-child(2) {
    width: 450px !important;
    float: right;
  }

  .c-topBar > div:nth-child(1) {
    float: left;
  }

  .input-with-select {
    background-color: #fff;
    width: 300px;
  }

  .odrBalance {
    float: left;
    margin: 10px 0;
  }

  .odrBalance {
    border: 1px solid #f5f5f5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .odrBalance > span > span {
    padding: 5px 15px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    vertical-align: middle;
  }

  .odrBalance > span > span:nth-child(2n-1) {
    background: #f5f5f5;
    font-weight: 700;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .ordList td {
    text-align: center;

  }
</style>
