<template>
  <div class="conTab">
    <div class="conSelect">
      <div class="block">
        <span class="demonstration">消费时间:</span>
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button @click="tabSearch1">查询</el-button>
      </div>
    </div>
    <div class="conTable">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            {{1 + scope.$index}}
          </template>
        </el-table-column>
        <el-table-column prop="order_id" label="订单编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="" label="消费时间" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.consumeRecorder_consumeTime | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label="所属门店" width="90" align="center">
          <template slot-scope="scope">
            {{"魅力女人"}}
          </template>
        </el-table-column>
        <el-table-column prop="customer_vipIntegration" label="会员积分" align="center">
        </el-table-column>
        <el-table-column prop="consumeRecorder_consumeTotalAmount" label="消费总金额" align="center">
        </el-table-column>
        <el-table-column prop="customer_balance" label="会员卡余额" align="center">
        </el-table-column>
        <el-table-column prop="consumeRecorder_commodityConsume" label="产品消费金额" align="center">
        </el-table-column>
        <el-table-column prop="consumeRecorder_courseTreatmentConsume" label="疗程消费金额" align="center">
        </el-table-column>
        <el-table-column prop="" label="其他金额" align="center">
        </el-table-column>
        <el-table-column prop="name" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="disTable(scope.row.order_id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="conPagination">
      <Pagination v-show="tableData.length>0" :total="totalCount"
                  ref="page" :api="api" @listenPage="getCustomerList" :page-size="[5,6,7,8]"/>
    </div>
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  export default {
    name: "conDetailsConsumption",
    components:{
      Pagination
    },
    data() {
      return {
        pickerOptions2: {
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
        },//日期选择配置
        searchDate: [new Date(946656000000), new Date()],//绑定日期选择
        tableData: [],//表格数据
        currentPage2: 1,//当前页
        totalPages: 5,//总页数
        pageNum: 5,//当前页面大小
        totalCount: 0,//总条数
        api: this.$api.vipManage.ViewConsumptionRecords,//包存页面的API接口
      }
    },
    methods: {
      getCustomerList(data, pageNum) {
        console.log(555,data, pageNum);
        this.pageNum = pageNum;
        this.tableData = data;
      },
      disTable(order_id){
        console.log(order_id);
      },
      //分页的点击事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 查询按钮
      tabSearch1() {
        let startTime = this.timeFormat(this.searchDate[0]);
        let endTime = this.timeFormat(this.searchDate[1]);
        console.log(this.currentPage2);
        console.log(this.pageNum);
        this.$axios.post(this.api,
          {
            customer_id: this.$store.state.user_id,
            currentPage: this.currentPage2,
            pageNum: this.pageNum,
            stratTime: startTime,
            endTime: endTime,
          },
          this.$config).then((res) => {
          if (res.data.returnCode == "200") {
            this.tableData = res.data.data;
            console.log(res.data);
            this.totalCount = res.data.totalItem;
          } else if (res.data.returnCode == -1) {
            console.log("请求错误");
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      timeFormat(data){
          let t = new Date(data);
          let y = t.getFullYear();
          let m = (t.getMonth() + 1).toString().padStart(2,"0");
          let d = (t.getDate()).toString().padStart(2,"0");
          let h = t.getHours();
          let min = t.getMinutes();
          let s = t.getSeconds();
        console.log(`${y}-${m}-${d}`);
        return `${y}-${m}-${d}`;
        }
    },
    filters: {
      dataFormat(data) {
        let t = new Date(data);
        let y = t.getFullYear();
        let m = t.getMonth() + 1;
        let d = t.getDate();
        let h = t.getHours();
        let min = t.getMinutes();
        let s = t.getSeconds();
        return `${y}-${m}-${d}  ${h}:${min}:${s}`;
      }
    },
    beforeMount() {
      //挂载之前申请数据
      this.tabSearch1();
    }
  }
</script>

<style scoped>
.block{
  margin-bottom: 15px;
}
</style>
