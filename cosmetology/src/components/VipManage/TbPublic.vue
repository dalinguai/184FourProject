<template>
  <div>
<el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="customer_number"
              label="编码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="customer_name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="customer_sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="customer_phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="customer_balance"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="customer_totalconsumption"
              label="消费总额">
            </el-table-column>
            <el-table-column
              prop="customer_lastTime"
              label="上次到店">
            </el-table-column>

          </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6,12,18,24,32]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.totalCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // currentPage1: 5,
        // currentPage2: 5,
        // currentPage3: 5,
        currentPage: 1,//当前页
        pageSize: 6,//每页显示数据
        totalCount: 0,//总条数
        tableData: [],
        nlist: [],
      }
    },
    created() {
      this.$axios.get("/static/VipConsume.json").then((res) => {
        this.totalCount = res.data.length;
        this.nlist = res.data
        this.handleSizeChange(this.currentPage,this.pageSize);

      }).catch((err) => {
        console.log(err)
      })
    },
    beforeUpdate(){
      console.log(this.$store.state1)
    },
    methods: {

      //分页
      handleSizeChange(currentPage,pageSize) {//每页显示多少条
        var newList = [];
        newList = this.nlist.slice(pageSize*(currentPage-1),pageSize*currentPage)
        this.tableData = newList;
        console.log(newList)
      },
      handleCurrentChange(currentPage) {//当前页
        this.currentPage = currentPage;
        this.tableData = [];
        this.handleSizeChange(this.currentPage,this.pageSize);
      },
    }
  }
</script>


<style scoped>

</style>
