<template>
  <div class="conTab">
    <div class="conSelect">
      <!--<div>-->
      <!--<span>疗程类型:</span>-->
      <!--<el-radio-group v-model="treatmentRecord1">-->
      <!--<el-radio :label="0">全部</el-radio>-->
      <!--<el-radio :label="1">护理疗程</el-radio>-->
      <!--<el-radio :label="2">仪器设备</el-radio>-->
      <!--</el-radio-group>-->
      <!--</div>-->
      <div class="top">
        <span>是否有效:</span>
        <el-radio-group v-model="treatmentRecord2">
          <el-radio :label="-1">全部</el-radio>
          <el-radio :label="0">有效</el-radio>
          <el-radio :label="1">无效</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="conTable">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="50" align="center">
          <template slot-scope="scope">
            {{1 + scope.$index}}
          </template>
        </el-table-column>
        <el-table-column width="90" label="所属门店" align="center">
          <template slot-scope="scope">
            {{"魅力女人"}}
          </template>
        </el-table-column>
        <el-table-column prop="courseTreatmentType_name" width="110" label="疗程类型" align="center">
        </el-table-column>
        <el-table-column prop="courseTreatment_name" label="疗程名称" align="center">
        </el-table-column>
        <el-table-column prop="personIntegrationRule_surplusTimes" width="78" label="剩余次数" align="center">
        </el-table-column>
        <el-table-column prop="courseTreatmentAmount" width="78" label="疗程耗价" align="center">
        </el-table-column>
        <el-table-column prop="personIntegrationRule_totalTimes" width="78" label="疗程次数" align="center">
        </el-table-column>
        <el-table-column label="起始日期" align="center">
          <template slot-scope="scope">
            {{scope.row.personIntegrationRule_startTime | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label="到期日期" align="center">
          <template slot-scope="scope">
            {{scope.row.personIntegrationRule_lastTime | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="personIntegrationRule_valid" width="78" label="是否有效" align="center">
        </el-table-column>
        <el-table-column prop="name" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="disTable(scope.row)">查看详情</el-button>
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
    name: "conDetailsTreatment",
    components: {
      Pagination
    },
    data() {
      return {
        //单选框的绑定
        treatmentRecord1: 0,
        treatmentRecord2: -1,
        currentPage2: 1,//当前页
        tableData: [],//表格数据
        totalPages: 5,//总页数
        pageSize: 5,//当前页面大小
        totalCount: 2,//总条数
        currentID: this.$store.state.user_id,
        api: this.$api.vipManage.ViewTreatmentRecord,
      }
    },
    methods: {
      getCustomerList(data, pageNum) {
        this.pageNum = pageNum;
        this.tableData = data;
      },
      //分页的点击事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      execyteQueryBtn(index, row) {
        if (this.treatmentRecord2 == "-1") {
          this.executeQuery({
            "customer_id": this.currentID,
            "pageNum": this.pageSize,
            "currentPage": this.currentPage2,
          });
        } else {
          this.executeQuery({
            "customer_id": this.currentID,
            "pageNum": this.pageSize,
            "currentPage": this.currentPage2,
            "personIntegrationRule_state": this.treatmentRecord2,
          });
        }
      },
      //搜索的条件查询
      executeQuery(obj) {
        this.$axios.post(this.api, obj, this.$config).then((res) => {
          if (res.data.returnCode == "200") {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].personIntegrationRule_valid = 0 ? "无效" : "有效"
            }
            this.tableData = res.data.data;
            this.totalCount = res.data.totalItem;
          } else if (res.data.returnCode == "-1") {
            console.log("系统错误");
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      disTable(id) {
        console.log(id);
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
      this.executeQuery({
        "customer_id": this.currentID,
        "pageNum": this.pageSize,
        "currentPage": this.currentPage2,
      })
    }
  }
</script>

<style scoped>
  .conSelect {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .top {
    margin-bottom: 15px;
  }
</style>
