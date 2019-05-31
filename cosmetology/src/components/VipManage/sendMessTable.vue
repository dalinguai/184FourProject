<template>
<div class="content">
    <div class="search">
          <el-button class="send" type="success" @click="detail">发送</el-button>
        <el-input class="selectname" placeholder="请输入客户名称" prefix-icon="el-icon-edit-outline" v-model="input1">
        </el-input>
        <el-input class="selectnumber" placeholder="请输入电话号码" prefix-icon="el-icon-phone-outline" v-model="input2">
        </el-input>
        <el-button type="warning" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData3" border stripe  style="width:100%" height="450" @selection-change="handleSelectionChange"> 
      <el-table-column fixed type="selection" @click="toggleSelection" width="50px">
      </el-table-column>
      <el-table-column  prop="id" label="序号" vwidth="50px">
      </el-table-column>
      <el-table-column prop="shop" label="店名">
      </el-table-column>
      <el-table-column prop="cardid" label="卡号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="tender" label="性别">
      </el-table-column>
      <el-table-column prop="phone" label="电话号码">
      </el-table-column>
      <el-table-column prop="birthday" label="生日">
      </el-table-column>
      <el-table-column prop="level" label="会员级别">
      </el-table-column>
      <el-table-column prop="cardsum" label="卡内余额">
      </el-table-column>
      <el-table-column prop="givesum" label="赠送余额">
      </el-table-column>
      <el-table-column prop="lasttime" label="上一次消费">
      </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
      </el-pagination>
    </div>
    <div v-if="dialogVisible">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="selected">
          <span>已选会员：</span><span class="selectedname" v-for="item in multipleSelection">{{item.name}}</span> 
        </div>
        <div class="messagearea">
          <span>短信内容：</span>
          <el-input type="textarea" :rows="2" placeholder="请输入短信内容" v-model="textarea">
          </el-input>
        </div>    
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelinput">取 消</el-button>
        <el-button type="primary" @click="closewindow()">确 定</el-button>
      </span>
</el-dialog>

    </div>
</div>
</template>
<script>
export default {
    name:"sendMessTable",
    data() {
      return {
        tableData3: [],
        multipleSelection: [],
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 3,
        currentPage4: 4,
         input1: '',
            input2: '',
            input3: '',
        dialogVisible : false, //模态框隐藏
        textarea:"",
        sendname:"",
        sendid:"",
        sendmoney:"",
        sendnumber:""    
      }
    },
    created(){
      this.$axios.get(this.$api.vipManage.VipsendMessage).then(
        (res)=>{
          console.log(res.data);
          this.tableData3 = res.data
        }
      ).catch(
        (err)=>{
          console.log(err)
        }
      )
    },
    methods: {
      cancelinput(){
        this.textarea = "";
        this.dialogVisible = false;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      selectname(row){
        console.log(row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        for(let i=0; i<val.length; i++){
          this.sendid = val[i].id;
          this.sendname = val[i].name;
          this.sendmoney = val[i].cardsum;
          this.sendnumber = val[i].phone;
          console.log(this.sendnumber);
        }
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      detail(){
        this.dialogVisible = true;//显示模态框
      },
      closewindow(){
        this.dialogVisible  = false;
        this.$notify({
          title: '成功',
          message: '发送成功！',
          type: 'success',
        });
        this.$axios.post
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
    }
</script>
<style scoped>
.content{
  background-color: white;
  width: 95%;
  margin-left: 20px;
}
.search{
  height: 70px;
}
.fenye{
  margin-top: 10px;
}
.send{
  margin-left: 2%;
  margin-right: 60%;
  margin-top: 15px;
}
.selectname{
    height: 20px;
    width: 150px;
}
.selectnumber{
    height: 20px;
    width: 150px;
}
.selectcard{
    height: 20px;
    width: 150px;
}
.selectedname{
  padding: 10px;
}
.selected{
  padding: 10px;
}
.messagearea{
  margin-top: 20px;
  padding: 10px;
}
</style>


