<template>
  <div id="app">
    <span>员工工资</span>
    <el-button class="btnDeleteall" type="danger" @click="batchDelete(tableChecked)" style="float: right;margin-right: 40px">删除所选</el-button>
    <el-button class="btnDelete" type="success" @click="addFun()" style="float: right;margin-right: 10px">添加</el-button>
    <!--    //组件首页-->
    <div style="margin-bottom: 25px;margin-top: 20px">
      <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed label="序号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userType_name" label="员工类别" align="center">
        </el-table-column>
        <el-table-column prop="userType_baseSalary" label="基本工资" align="center">
        </el-table-column>
        <el-table-column prop="userType_commissionRate" label="提成金额" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delFun(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="updateFun(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--页码-->
    <div id="pageTab" style="position: absolute">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5,10,20,30]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!--    添加-->
    <div>
      <el-dialog :visible.sync="dialogVisible" width="60%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">员工类别</td>
              <td style="width: 210px;"><input type="text" v-model="userType_name"/></td>                                               
              <td style="width: 90px">基本工资</td>                           
              <td style="width: 210px"><input type="text" v-model="userType_baseSalary"/></td> 
            </tr>
            <tr>           
              <td style="width: 90px">工资提成</td>                     
              <td style="width:210px"><input type="text" v-model="userType_commissionRate"/></td>   
              <td style="width: 90px"></td>                     
              <td style="width:210px"><input type="text" /></td>             
            </tr>       
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button plain type="primary" @click="saveFun();open3()">保 存</el-button>
          </span>

      </el-dialog>
    </div>
    <!--          编辑-->
    <div>
      <el-dialog :visible.sync="editShow" width="60%" >
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job"> 
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">员工类别</td>
              <td style="width: 210px;"><input type="text" v-model="userType_name"/></td>     
              <td style="width: 90px">基本工资</td>                           
              <td style="width: 210px"><input type="text" v-model="userType_baseSalary"/></td> 
            </tr>                                 
            <tr>                                                   
              <td>工资提成</td>                     
              <td><input type="text" v-model="userType_commissionRate"/></td>   
              <td></td>                           
              <td><input type="text"/></td>             
            </tr>       
            </tbody>                 
          </table> 
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="editShow = false">取 消</el-button>
    <el-button plain type="primary" @click="editSave">保 存</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import  Vue from 'vue'
  export default {
    name: "staff",
    data() {
      return {
        value1: '',
        list: [],
        text: '',
        obj: [],
        isShow: false,
        dialogVisible: false,
        editShow:false,
        user_name: "",
        userType_name: "",
        userType_baseSalary: "",
        userType_commissionRate: "",
        userSalary_leaveDays:"",
        userSalary_absenteeismDays:"",
        userSalary_lateNumber:"",
        userSalary_leaveEarlyNumber:"",
        user_performance:"",
        userSalary_monthly:"",
        editList: {},
        pageNo: 1,//存储当前页码值
        pageSize: 5,//设置每页条数
        currentPage: 1,//总页码
        total:1,
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      getUser(){
        //向后台发起请求，获取数据
        this.$axios.post("http://172.17.1.235:8080/userType/all",{
          "currentPage":this.currentPage,"currentPageSize":this.pageSize},this.$config).then((res) => {
          console.log("成功");
          console.log(res.data);
          console.log(res.data.data.userTypeList);
          this.list=res.data.data.userTypeList;
          this.total=res.data.rowCount;
          // console.log(res)

        }).catch((err) => {
          console.log(err)
        })
      },
      //删除
      delFun(index,row) {
        index +=(this.pageNo -1)*this.pageSize;
        this.list.splice(index,1);
        console.log(row.userType_id);
        this.$axios.get("http://172.17.1.235:8080/userType/deleteUserType",{
          "userType_id":row.userType_id
        },this.$config).then((res)=>{
          this.getUser();

        }).catch((err)=>{
        })
      },
      open3() {
        this.$notify({
          title: '提示',
          message: '您成功添加了一条新员工信息',
          type: 'success',
        });
      },
      //添加
      addFun() {
        this.dialogVisible = true;
        this.text = '添加信息';
      },
      saveFun(event) {
        this.dialogVisible = false;
        this.editList.userType_name = this.userType_name;
        this.editList.userType_baseSalary = this.userType_baseSalary;
        this.editList.userType_commissionRate = this.userType_commissionRate;
        this.$axios.post("http://172.17.1.235:8080/userType/insertUserType",{
          "userType_name":this.editList.userType_name,
          "userType_baseSalary":this.editList.userType_baseSalary,
          "userType_commissionRate":this.editList.userType_commissionRate,
        },this.$config).then((res)=>{
          this.getUser();
        }).catch((err)=>{
        })
      },
      //编辑
      updateFun(index) {
        this.text = '编辑信息';
        this.selectedId = index;
        this.editShow = true;
        this.dialogVisible = false;
        var editList = this.list[index];
        this.userType_name = editList.userType_name;
        this.userType_baseSalary = editList.userType_baseSalary;
        this.userType_commissionRate = editList.userType_commissionRate;
        this.userType_id = editList.userType_id;
      },
      editSave(event){
        this.dialogVisible = false;
        this.editShow = false;
        this.list[this.selectedId].userType_name = this.userType_name;
        this.list[this.selectedId].userType_baseSalary = this.userType_baseSalary;
        this.list[this.selectedId].userType_commissionRate = this.userType_commissionRate;
        this.$axios.post("http://172.17.1.235:8080/userType/updateUser",{
          "userType_name": this.list[this.selectedId].userType_name,
          "userType_baseSalary":this.list[this.selectedId].userType_baseSalary,
          "userType_commissionRate":this.list[this.selectedId].userType_commissionRate,
          "userType_id":this.userType_id},this.$config).then((res) => {
          console.log(res);
          this.getUser();
          console.log(this.list);
          console.log(userType_baseSalary);
        }).catch((err) => {
          console.log(err)
        });
        this.userType_name="";
        this.userType_baseSalary="";
        this.userType_commissionRate=""
      },
      //切换页码
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUser()
      },
      //切换每页条数
      handleCurrentChange(val) {
        console.log(val);
        this.currentPage = val;
        this.pageNo = val;
        this.getUser()
      }
    },
    batchDelete(rows) {
      var _this = this;
      _this.ids = [];
      rows.forEach(element => {
        _this.ids.push(element.id)
      });
      _this.$confirm('是否确认此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(_this.ids)
        _this.ids.forEach(function (item, index) {
          // console.log(index+1)
          _this.list.splice(_this.ids.id, 1);//按下标删除
        });


        console.log(_this.list);
        console.log((this.listNewArr))
        this.$notify({
          title: '警告',
          message: '您删除了员工信息',
          type: 'warning'
        });
      }).catch(() => {
        this.$notify.info({
          title: '取消',
          message: '您取消了数据删除',
        });
      });
    },
  }
</script>

<style scoped>
  #app{
    align-content: center;
    margin-top: 25px;
  }
  .sp-grid-job {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #E1E6EB;
    border-left: none;
  }
  .sp-page-content p {
    height: 35px;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    top: 10px;
  }
  .sp-grid-job tbody td {
    text-align: center;
    height: 46px;
    font-size: 13px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    position: relative;
  }
  .sp-grid-job tbody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
    text-align: center;

  }
  .sp-grid-job tbody td select {
    outline: none;
    border: none;
    width: 96%;
    text-align: center;
    text-align-last: center;
  }
  .sp-page-content {
    width: 95%;
    margin: 0 auto;
  }
  #pageTab{
    text-align: center;
    padding: 20px 0;
  }
  span{
    font-size: 18px;
    margin-left: 10px;
  }
</style>
