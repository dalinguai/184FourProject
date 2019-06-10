<template>
    <el-pagination
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
        this.$axios.post(this.api,{pageNum:this.pageNum,currentPage:this.currentPage},this.$config).then((res)=>{
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].customer_sex = 0 ? "男" : "女";
            res.data.data[i].customer_LastTime=this.$parent.getLocalTime(res.data.data[i].customer_LastTime)
          }
          this.$emit("listenPage",res.data.data,this.pageNum,this.currentPage)
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
