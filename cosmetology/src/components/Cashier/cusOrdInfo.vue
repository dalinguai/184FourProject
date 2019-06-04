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
          <template slot="prepend">产品编号：</template>
        </el-autocomplete>
        <el-button>快速添加</el-button>
      </div>
    </div>
    <div class="odrBalance">
      <span v-for="(item,index) in ordBalance">
          <span>{{item.item}}</span>
          <span>{{item.item_content}}</span>
      </span>
    </div>
    <div class="ordList">
      <el-table :data="newList" style="width: 100%;border:1px solid #EBEEF5" height="220">
        <el-table-column fixed prop="Commodity_name" label="产品名称" width="180">
        </el-table-column>
        <el-table-column prop="realSum" label="应收金额" width="80">
        </el-table-column>
        <el-table-column prop="sum" label="消费金额" width="80">
        </el-table-column>
        <el-table-column prop="commodity_shoppingTrolley_commodityAmoun" label="数量" width="80">
        </el-table-column>
        <el-table-column prop="unit_price" label="单价" width="80">
        </el-table-column>
        <el-table-column prop="vip_discount" label="折扣" width="80">
        </el-table-column>
        <el-table-column prop="操作" label="操作" width="150">
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
        proData: [],
        state2: '',
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
        newList: [],
        loadList: [],
      }
    },
    methods: {
      updatePage() {
        this.$router.push({path: '/cashier/ordModify'})
      },
      jumpToSettlement() {
        this.$router.push({path: '/cashier/ordSettlement'})
      },
      addProToCar() {
        this.$router.push({path: '/cashier/ordPurchasing'})
      },
      //请求数据
      getData() {
        this.$axios.get("http://5cee59d21c2baf00142cbdf5.mockapi.io/carInfo")
          .then((res) => {
            this.newList = res.data;
            this.dataCalc();
            this.sumDataCalc();
          }).catch((err) => {
          console.log(err);
        })
      },
      //计算出每列的值
      dataCalc() {
        this.newList.forEach(function (item) {
          item.sum = (parseFloat(item.unit_price) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)).toFixed(2);
          item.realSum = (parseFloat(item.unit_price) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)
            * (1 - parseFloat(item.vip_discount))).toFixed(2);
        });
      },
      //计算出总的值
      sumDataCalc() {
        this.newList.forEach((item) => {
          this.ordBalance[0].item_content = parseFloat(this.ordBalance[0].item_content) + parseFloat(item.realSum);
          this.ordBalance[1].item_content = parseFloat(this.ordBalance[1].item_content) + parseFloat(item.sum);
        });
        this.ordBalance[2].item_content = parseFloat(this.ordBalance[1].item_content) - parseFloat(this.ordBalance[0].item_content);
      },
      //删除
      deleteConfirm(index, row) {
        console.log(index, row);
        this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          //传对应行的商品ID
          // this.$axios.get('http://5cee59d21c2baf00142cbdf5.mockapi.io/carInfo', {'odrId'=row.id})
          this.$axios({
            method: "post",
            url: this.$api.cashierRight.searchLoading,
            data: {
              id: row.id,
            },
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [function (data) {
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
              }
              return ret;
            }],
          }).then((res) => {
            if (res.data) {//返回删除成功,进行删除 data.returncode == 200
              this.newList.some((item, index) => {
                if (item.id == row.id) {
                  this.newList.splice(index, 1);
                  return true;
                }
              });
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
        console.log(item);
      },
      querySearch(queryString, cb) {
        let proData = this.proData;
        let results = queryString ? proData.filter(this.createFilter(queryString)) : proData;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.loadList;
      },
      getLoading() {
        this.$axios({
          method: "post",
          url: this.$api.cashierRight.searchLoading,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          // data: {
          //   id: proId,
          // },
          // transformRequest: [function (data) {
          //   let ret = '';
          //   for (let it in data) {
          //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          //   }
          //   return ret;
          // }],
        }).then((res) => {
          if (res.statusText == 200) {
            this.loadList = res.data; // 获取服务器传来的模糊查询数据
          }
        }).catch(() => {

        });
      },
      vuexOperatingProId(id) {
        this.$store.state.proId = id;
      }
    },
    beforeMount() {
      this.getData();
      this.getLoading();

    },
    mounted() {
      this.proData = this.loadAll();
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
