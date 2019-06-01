<template>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
  export default {
    name: "Pagination",
    props:["api","pageSize","total"],
    data() {
      return {
        currentPage: 1,
        pageNum:5
      };
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageNum=val;
        this.getList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.getList()
      },
      getList(){
        this.$axios.get(this.api,{params:{pageNum:this.pageNum,currentPage:this.currentPage}}).then((res)=>{
          this.$emit("listenPage",res.data,this.pageNum)
        }).catch((err)=>{
          console.log(err);
        })
      },
      currentInit(){
        this.currentPage=1
      }
    },
  }
</script>

<style scoped>
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>
