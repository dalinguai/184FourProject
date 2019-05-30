<template>
  <div class="content">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span>短信历史列表</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table">
      <el-table :data="tableData3" border stripe style="width: 100%" height="450">
      <el-table-column fixed prop="messageRecord_id" label="序号">
      </el-table-column>
      <el-table-column prop="customer_id" label="会员卡号">
      </el-table-column>
      <el-table-column prop="customer_name" label="姓名">
      </el-table-column>
      <el-table-column prop="messageRecord_content" label="短信内容">
      </el-table-column>
      <el-table-column prop="messageRecord_startStatus" label="短信发送状态">
      </el-table-column>
      <el-table-column prop="messageRecord_startTime" label="短信发送时间">
      </el-table-column>
      <el-table-column fix="right" label="操作">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
   /*  import sendHistoryNav from "./sendHistoryNav";
    import sendHistoryTable from "./sendHistoryTable"; */
    export default {
        name: "SMSList",
        data(){
          return{
            tableData:[]
          }
        },
        create(){
          this.$axios.get("/static/sendHistory.json").then(
        (res)=>{
          console.log(res.data);
          this.tableData = res.data
        }
      ).catch(
        (err)=>{
          console.log(err)
        }
      )
        }
    }
</script>

<style scoped>
.bread{
  height: 50px;
}
span{
  margin-top: 15px;
  font-size: 15px;
  color: gray;
}
span:nth-child(1){
  margin-left: 20px;
}
.table{
  margin-left: 20px;
}
</style>
