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
      <div>
        <span>是否完结:</span>
        <el-radio-group v-model="treatmentRecord2">
          <el-radio :label="-1">全部</el-radio>
          <el-radio :label="0">未完结</el-radio>
          <el-radio :label="1">已完结</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-button @click="execyteQueryBtn">查询</el-button>
      </div>
    </div>
    <div class="conTable">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            {{1 + scope.$index}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @mouseover="disTable(scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="所属门店">
        </el-table-column>
        <el-table-column prop="address" label="疗程类型">
        </el-table-column>
        <el-table-column prop="address" label="疗程名称">
        </el-table-column>
        <el-table-column prop="address" label="剩余次数">
        </el-table-column>
        <el-table-column prop="address" label="疗程耗价">
        </el-table-column>
        <el-table-column prop="address" label="疗程次数">
        </el-table-column>
        <el-table-column prop="address" label="销售询问">
        </el-table-column>
        <el-table-column prop="address" label="是否次数限制">
        </el-table-column>
        <el-table-column prop="address" label="有效期">
        </el-table-column>
        <el-table-column prop="address" label="起始日期">
        </el-table-column>
        <el-table-column prop="address" label="到期日期">
        </el-table-column>
        <el-table-column prop="address" label="日否有效">
        </el-table-column>
      </el-table>
    </div>
    <div class="conPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage2"
        :page-sizes="[5, 10, 15, 2]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=totalPages>
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    name: "conDetailsTreatment",
    data() {
      return {
        //单选框的绑定
        treatmentRecord1: 0,
        treatmentRecord2: 0,
        currentPage2: 0,//当前页
        tableData: [],//表格数据
        totalPages: 5,//总页数
        pageSize: 0,//当前页面大小
        totalCount: 2,//总条数
        currentID:this.$store.state.conDetailsID,
        api:this.$api.vipManage.ViewTreatmentRecord,
      }
    }, methods: {
      //分页的点击事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      execyteQueryBtn(index, row) {
        if (this.treatmentRecord2 == -1) {
          this.executeQuery({
            "customer_id": this.currentID,
            "startIndex": this.currentPage2,
            "pageCount": this.pageSize,
          });
        }else{
          this.executeQuery({
            "customer_id": this.currentID,
            "startIndex": this.currentPage2,
            "pageCount": this.pageSize,
            "personIntegrationRule_state": this.treatmentRecord2,
          });
        }
      },
      //搜索的条件查询
      executeQuery(obj) {
        this.$axios.post(this.api, obj, this.$config
        ).then((res) => {
          if (res.data.returnCode == "200") {
            this.tableData = res.data.data;
            this.totalCount = res.data.totalCount;
          } else if (res.data.returnCode == "-1") {
            console.log("系统错误");
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    beforeMount() {
      this.executeQuery({
        "customer_id": this.currentID,
        "startIndex": this.currentPage2,
        "pageCount": this.pageSize,
        // "personIntegrationRule_state":this.treatmentRecord2,
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
</style>
