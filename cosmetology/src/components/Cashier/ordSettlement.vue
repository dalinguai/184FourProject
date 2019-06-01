<template>
  <el-card class="box-card">
    <div>
      <span>结算</span>
      <span>订单编号:</span>
      <span></span>
    </div>
    <div>
      <ul>
        <li><span>应收:</span><span></span></li>
        <li><span>已收:</span><span></span></li>
        <li><span>收银差额:</span><span></span></li>
      </ul>
    </div>
    <div>
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
        <el-table-column label="序号 #" prop="id" width="80">
        </el-table-column>
        <el-table-column label="商品名称" prop="commodityBrand_name" width="200">
        </el-table-column>
        <el-table-column label="数量" prop="commodity_number" width="80">
        </el-table-column>
        <el-table-column label="商品单价" prop="unit_price" width="80">
        </el-table-column>
        <el-table-column label="应付金额" prop="sum" width="100">
        </el-table-column>
        <el-table-column label="会员折扣" prop="vip_discount" width="80">
        </el-table-column>
        <el-table-column label="实付金额" prop="realSum" width="80">
        </el-table-column>
      </el-table>
    </div>
    <div></div>
  </el-card>
</template>

<script>
  export default {
    name: "ordSettlement",
    data() {
      return {
        tableData: [],
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
      //计算出每列的值
      dataCalc() {
        this.tableData.forEach(function (item) {
            item.sum = (parseFloat(item.unit_price) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)).toFixed(2);
          item.realSum = (parseFloat(item.unit_price) * parseFloat(item.commodity_shoppingTrolley_commodityAmoun)
            * (1 - parseFloat(item.vip_discount))).toFixed(2);
        });
      },
      //计算出总的值
      sumDataCalc() {
        this.tableData.forEach((item) => {
          this.ordBalance[0].item_content = this.ordBalance[0].item_content + parseInt(item.realSum);
          this.ordBalance[1].item_content = this.ordBalance[1].item_content + parseInt(item.sum);
        });
        this.ordBalance[2].item_content = this.ordBalance[1].item_content - this.ordBalance[0].item_content;
      },
    },
    filters: {},
    computed: {},
    beforeMount() {
      this.$axios.get('http://5cee59d21c2baf00142cbdf5.mockapi.io/carInfo').then((res) => {
        this.tableData = res.data;
        this.dataCalc();//计算出每个订单的乘积数据
        this.sumDataCalc();//计算出总订单的信息
      }).catch((err) => {
        this.operationPromptWarning(err);
      });
    }
  }
</script>

<style scoped>
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
</style>
