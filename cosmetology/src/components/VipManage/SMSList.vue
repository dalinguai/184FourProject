<template>
  <div class="content">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>-->
        <!--<el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>-->
        <el-breadcrumb-item style="padding-left: 0"><span>短信历史列表</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table">
      <el-table :data="tableData4.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%" >
      <el-table-column fixed prop="messageRecord_id" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="customer_name" label="姓名" align="center" width="80">
      </el-table-column>
        <el-table-column prop="customer_id" label="会员手机号" width="100" align="center">
        </el-table-column>
      <el-table-column prop="messageRecord_content" label="短信内容" align="center">
      </el-table-column>
      <el-table-column prop="messageRecord_startStatus" label="短信发送状态" width="130" align="center">
      </el-table-column>
      <el-table-column prop="messageRecord_startTime" label="短信发送时间" width="170" align="center">
      </el-table-column>
      <el-table-column  label="操作" width="80" align="center">
        <template slot-scope="scope">
        <el-button @click="detail(scope.$index,scope.row)" type="text" size="small">详情</el-button>
      </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData4.length">
      </el-pagination>
    </div>
    <div v-if="detailFormVisible">
      <el-dialog title="短信详情" :visible.sync="detailFormVisible" width="30%" :before-close="handleClose">
        <div>
          <h3>发送状态：</h3>{{object.messageRecord_startStatus}}
          <h3>号码列表：</h3>{{object.customer_id}}
          <h3>短信列表：</h3>{{object.messageRecord_content}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="detailFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="detailFormVisible = false">确 定</el-button>
        </span>  
      </el-dialog>
    </div>
  </div>
</template>
<script>
    export default {
        name: "SMSList",
        data(){
          return{
            tableData4: [],
            detailFormVisible:false,//控制模态框隐藏
            object:{},
            pageSizes:[7],
            pageSize: 7,
            currentPage: 1,   
          }
        },
        created(){
          this.$axios.get(this.$api.vipManage.VipsendHistory).then(
        (res)=>{
          console.log(res.data);
          this.tableData4 = res.data;
        }
      ).catch(
        (err)=>{
          console.log(err)
        }
      )
        },
        methods:{
          detail(index,row){
            this.detailFormVisible = true;//显示模态框
            this.object=row;
            console.log(this.object);
          },
          handleClose(done) {
        this.$confirm('确认关闭？')
          .then( ()=> {
            done();
          })
          .catch(_ => {});
      },
      handleSizeChange(val) {
         this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pageNo = val;
      },
    }
    }
</script>

<style scoped>
.bread{
  height: 49px;
  line-height: 49px;
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
.fenye{
  text-align: center;
  margin-top: 20px;
}
</style>
