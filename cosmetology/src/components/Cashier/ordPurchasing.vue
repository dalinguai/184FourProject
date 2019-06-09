<template>
  <el-card class="box-card">
    <div class="topTitle clearfix">
      <h2>购买列表</h2>
      <div>
        <div v-for="item in tablePurInfo"></div>
      </div>
      <div class="t-btn">
        <el-button @click="backMain">返回</el-button>
      </div>
    </div>
    <div>
      <!--<div class="proTittle" v-for="item in proSort"></div>-->
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加产品" name="first">
            <div class="midBar">
              <div>
                <div>
                  <span>所属类别:</span>
                  <el-select v-model="valueBrand1" placeholder="请选择">
                    <el-option
                      v-for="item in optionsBrand"
                      :key="item.commodityBrand_id"
                      :label="item.commodityBrand_name"
                      :value="item.commodityBrand_id">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>所属系列:</span>
                  <el-select v-model="valueSeries1" placeholder="请选择">
                    <el-option
                      v-for="item in optionsSeries"
                      :key="item.commoditySeries_id"
                      :label="item.commoditySeries_name"
                      :value="item.commoditySeries_id">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-button @click="doSearch1">Go</el-button>
                </div>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData1" border
                style="width: 100%"
                fit
              >
                <!--<el-table-column label="序号" width="50">-->
                <!--<template slot-scope="scope">-->
                <!--{{scope.$index + 1 }}-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="产品编号" prop="commodity_id" width="100">
                </el-table-column>
                <el-table-column label="产品名称" prop="commodity_name" width="100">
                </el-table-column>
                <el-table-column label="产品批次号" width="120">
                  <template slot-scope="scope">
                    <div>
                      <el-select v-model="formData[scope.$index].batchNumber" placeholder="请选择">
                        <el-option
                          v-for="item in  tableProductBatch[scope.commodity_id]"
                          :key="item.commodityBatch_id"
                          :label="item.commodityBatch_number"
                          :value="item.commodityBatch_id">
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="价格" width="100">
                  <template slot-scope="scope">
                    <div v-text="getSale(scope.$index,scope.commodity_id)"></div>
                  </template>
                </el-table-column>
                <el-table-column label="销售人员" width="120">
                  <template slot-scope="scope">
                    <div>
                      <el-select v-model="formData[scope.$index].salesperson" placeholder="请选择">
                        <el-option
                          v-for="item in tableProductSalesperson"
                          :key="item.user_id"
                          :label="item.user_name"
                          :value="item.user_id">
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <div>
                      <el-input-number :step="1"
                                       v-model="formData[scope.$index].number"
                                       :min="0" :max="100000" label="输入数量" id="number1"></el-input-number>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottomBlock">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="pagination1.currentPage"
                :page-sizes="size"
                :page-size="pagination1.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination1.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="添加护理" name="second">
            <div class="midBar">
              <span>所属系列:</span>
              <el-select v-model="valueSeries2" placeholder="请选择">
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-for="item in treatmentSeries">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-button @click="">Go</el-button>
            </div>
            <div>
              <el-table
                :data="tableData" border="true"
                style="width: 100%">
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
                <el-table-column label="序号" prop="id">
                </el-table-column>
                <el-table-column label="产品编号" prop="name">
                </el-table-column>
                <el-table-column label="产品名称" prop="desc">
                </el-table-column>
                <el-table-column label="标价" prop="id">
                </el-table-column>
                <el-table-column label="是否打折" prop="id">
                </el-table-column>
                <el-table-column label="折扣" prop="id">
                </el-table-column>
                <el-table-column label="售卖数量" prop="id">
                </el-table-column>
              </el-table>
            </div>
            <div class="bottomBlock">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="pagination2.currentPage"
                :page-sizes="size"
                :page-size="pagination2.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination2.total">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "ordPurchasing",
    data() {
      return {
        formData: [
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          },
          {
            batchNumber: 1,
            salesperson: "",
            number: ""
          }
        ],
        valueBrand1: "-1",//品牌下拉框双向绑定
        valueSeries1: "-1",//品牌下拉框双向绑定
        valueSeries2: "-1",//疗程下拉框双向绑定
        tablePurInfo: [],//当前已选中的商品
        activeName: 'first',//tab的切换绑定
        optionsBrand: [],//商品添加的所属类别下拉框
        optionsSeries: [],//商品添加的所属类别下拉框
        treatmentSeries:[],//疗程添加的搜索下拉框
        tableData1: [],//商品添加的表格信息
        tableData2: [],//疗程添加的表格信息
        // 商品添加的详细表格信息批次信息
        tableProductBatch: {},//商品的系列信息
        tableProductSalesperson: [],//商品添加的详细表格信息销售人员
        tableProductNumber: [],//商品添加的详细表格信息数量
        size: [4, 6, 8, 10],//分页规格
        //分页1
        pagination1: {
          total: null,
          pageSize: 4,
          currentPage: 1,
        },
        //分页2
        pagination2: {
          total: null,
          pageSize: 4,
          currentPage: 1,
        }
      }
    },
    methods: {
      handleSizeChange1(val) {
        this.pagination1.pageSize1 = val;
        this.doSearch1();
      },
      handleCurrentChange1(val) {
        this.pagination1.currentPage = val;
        this.doSearch1();
      },
      handleSizeChange2(val) {
        this.pagination2.pageSize2 = val;
      },
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      backMain() {
        this.$router.push({path: '/cashier/right'});
      },
      doSearch1() {
        console.log(this.pagination1.currentPage);
        let obj = {
          "startIndex": this.pagination1.currentPage,
          "pageCount": this.pagination1.pageSize,
        };
        if (this.valueBrand1 != "-1") {
          obj.commodityBrand_id = this.valueBrand1;
        }
        if (this.valueSeries1 != "-1") {
          obj.commoditySeries_id = this.valueSeries1;
        }
        this.$axios.post(this.$api.cashierRight.carAddBrandOrSeries, obj, this.$config).then((res) => {
          console.log(res.data);
          this.tableData1 = res.data.data;
          //分页配置
          this.pagination1.total = res.data.rowCount;
          //请求到数据后,渲染表格
          this.doSearch1Detail();//获取每一项商品的具体数据
          this.doSearch1DetailStuff();//获取员工
        }).catch((err) => {
          console.log(err);
        });
      },
      doSearch1Detail() {
        console.log(this.tableData1);
        this.tableData1.forEach((item) => {
          this.$axios.post(this.$api.cashierRight.carAddBrandBatch, {"commodity_id": item.commodity_id}, this.$config).then((res) => {
            //批次
            this.tableProductBatch[item.commodity_id] = res.data.data;
            console.log(this.tableProductBatch);
          }).then(() => {

          }).catch((err) => {
            console.log(err);
          });
        });
      },
      doSearch1DetailStuff() {
        this.$axios.post(this.$api.cashierRight.carAddBrandStaff).then((res) => {
          //员工
          console.log("员工");
          console.log(res.data.data);
          this.tableProductSalesperson = res.data.data;
        }).catch((err) => {
          console.log(err);
        });
      },
      doSearch2() {
        let obj = {
          "startIndex": this.pagination2.currentPage,
          "pageCount": this.pagination2.pageSize,
        };
        if (this.valueSeries2 != "-1") {
          obj.commoditySeries_id = this.valueSeries2;
        }
        this.$axios.post(this.$api.cashierRight.carAddBrandOrSeries, obj, this.$config).then((res) => {
          this.tableData1 = res.data.data;
        }).catch((err) => {
          console.log(err);
        });

      },
    },
    filters: {},
    computed: {
      getSale(index, id) {
        //data代表当前商品的的批次号数组
        let batch = this.form[index];
        let data = this.tableProductBatch[id];
        console.log(batch);
        console.log(data);
        console.log(typeof data);
        if (data == null)
          return 0;
        data.forEach((item) => {
          if (item.commodityBatch_id == batch) {
            return item.commodityBatch_sale;
          }
        });
      },
    },
    beforeMount() {
      //请求品牌
      this.$axios.post(this.$api.cashierRight.brandName).then((res) => {
        console.log(res.data);
        this.optionsBrand = res.data.data;
        this.optionsBrand.unshift({"commodityBrand_name": "全部", "commodityBrand_id": "-1"})
      }).catch((err) => {
        console.log(err);
      });
      this.$axios.post(this.$api.cashierRight.seriesName).then((res) => {
        console.log(res.data);
        this.optionsSeries = res.data.data;
        this.optionsSeries.unshift({"commoditySeries_name": "全部", "commoditySeries_id": "-1"})
      }).catch((err) => {
        console.log(err);
      });
      this.doSearch1();//获取表单后提交数据

      //请求疗程
      // this.$axios.post(this.$api.cashierRight.seriesName).then((res) => {
      //   console.log(res.data);
      //   this.optionsSeries = res.data.data;
      //   this.optionsSeries.unshift({"commoditySeries_name": "全部", "commoditySeries_id": "-1"})
      // }).catch((err) => {
      //   console.log(err);
      // });

    }
  }
</script>

<style scoped>
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

  .clearfix::after,
  .clearfix::before {
    display: table;
    content: "";
  }

  .clearfix::after {
    clear: both;
  }

  .box-card {
    width: 790px;
  }

  .topTitle {

  }

  .topTitle > h2 {
    float: left;
  }

  .topTitle .t-btn {
    float: right;
  }

  .midBar > div:nth-child(1) {
    display: flex;
    justify-content: flex-start;
  }

  .midBar > div:nth-child(1) > div {
    margin-right: 20px;
  }

  .midBar > div:nth-child(1) {
    margin: 10px 0;
  }

  .midBar > div:nth-child(2) {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .midBar > div:nth-child(2) > div {
    margin: 0 10px;
  }

  .bottomBlock {
    margin: 20px 0;
  }
</style>
