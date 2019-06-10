<template>
  <div class="content">
    <div class="search" >
      <span style="color:#808080;font-size: 14px;">短信发送平台</span>
      <el-button class="send" type="success" @click="detail">发送</el-button>
      <Search class="search2"
              :api-search="$api.vipManage.VipsendMessage"
              :api-all="$api.vipManage.VipsendMessage"
              @listen="searchList"
              view-name="name"
              condition-add="phone"/>
    </div>
    <div class="table">
      <el-table :data="tableData3.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width:100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" @click="toggleSelection" width="50px" align="center">
        </el-table-column>
        <el-table-column prop="id" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column prop="shop" label="店名" align="center">
        </el-table-column>
        <!--<el-table-column prop="cardid" label="卡号">-->
        <!--</el-table-column>-->
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="tender" label="性别" width="70" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="140" align="center">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" align="center">
        </el-table-column>
        <el-table-column prop="level" label="会员级别" align="center">
        </el-table-column>
        <el-table-column prop="cardsum" label="卡内余额" align="center">
        </el-table-column>
        <el-table-column prop="givesum" label="赠送余额" align="center">
        </el-table-column>
        <el-table-column prop="lasttime" label="上一次消费时间" width="200" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData3.length">
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
  import Search from "../Search";

  export default {
    name: "sendMessTable",
    components: {
      Search,
    },
    data() {
      return {
        tableData3: [],
        multipleSelection: [],
        currentPage: 1,
        input1: '',
        input2: '',
        input3: '',
        dialogVisible: false, //模态框隐藏
        textarea: "尊敬的xxx会员，您在本店消费xx元，卡内余额xxx元。",//需要发送的短信内容
        sendname: "",//需要发送的会员名字
        sendid: "",//需啊发送的会员id
        sendmoney: "",//需要发送的会员卡内余额
        sendnumber: "",//需要发送的会员手机号
        pageSizes: [7],
        pageSize: 7
      }
    },
    created() {
      this.$axios.get(this.$api.vipManage.VipsendMessage).then(
        (res) => {
          console.log(res.data);
          this.tableData3 = res.data
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
    },
    methods: {
      cancelinput() {
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
      selectname(row) {
        console.log(row);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        for (let i = 0; i < val.length; i++) {
          this.sendid = val[i].id;
          this.sendname = val[i].name;
          this.sendmoney = val[i].cardsum;
          this.sendnumber = val[i].phone;
          console.log(this.sendnumber);
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pageNo = val;
      },
      detail() {
        this.dialogVisible = true;//显示模态框
      },
      closewindow() {
        this.dialogVisible = false;
        this.$notify({
          title: '成功',
          message: '发送成功！',
          type: 'success',
        });
        this.$axios.post(this.$api.vipManage.sendMessageToVip, {
          customer_id: this.sendid,
          messageRecord_content: this.textarea
        }, this.$config).then(function (resp) {
          console.log(resp);
        }).catch(function (err) {
          console.log(err);
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    searchList(data) {
      console.log(data);
      this.tableData3 = data
    },
  }
</script>
<style scoped>
  .content {
    background-color: #FDFDFD;
    width: 95%;
    margin-left: 20px;
  }

  .fenye {
    margin-top: 10px;
  }

  .send {
    margin-left: 2%;
    height: 35px;
    padding-top: 10px;
  }

  .selectname {
    height: 20px;
    width: 150px;
  }

  .selectnumber {
    height: 20px;
    width: 150px;
  }

  .selectcard {
    height: 20px;
    width: 150px;
  }

  .selectedname {
    padding: 10px;
  }

  .selected {
    padding: 10px;
  }

  .messagearea {
    margin-top: 20px;
    padding: 10px;
  }

  .fenye {
    margin-left: 30%
  }

  .search {
    height: 49px;
    line-height: 49px;
  }

  .search2 {
    position: absolute;
    top: 53px;
    left: 380px;
    z-index: 4;
  }
</style>


