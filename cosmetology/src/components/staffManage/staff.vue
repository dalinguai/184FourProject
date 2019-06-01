<template>
  <div id="app">
    <el-button class="btnDelete" type="success" @click="addFun()">添加</el-button>
    <el-button type="danger">删除所选</el-button>
    <!--    //组件首页-->
    <div >
      <el-table :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%" stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed label="序号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="userType_name" label="员工类别" align="center">
        </el-table-column>
        <el-table-column prop="userType_baseSalary" label="基本工资" align="center">
        </el-table-column>
        <el-table-column prop="userType_commissionRate" label="提成金额" align="center">
        </el-table-column>
        <el-table-column prop="userType_commissionRate" label="月薪金额" align="center">
        </el-table-column>
        <el-table-column label="更多" align="center">
          <template slot-scope="scope ">
            <el-button type="text" size="small" @click="btnDetails(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delFun(scope.$index)">删除</el-button>
            <el-button type="text" size="small" @click="updateFun(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--页码-->
    <div id="pageTab">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="list.length">
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
              <td style="width: 90px;">姓 名</td>       
              <td style="width: 210px;"><input type="text" v-model="user_name"/></td>
              <td style="width: 90px;">员工类别</td>
              <td style="width: 210px;"><input type="text" v-model="userType_name"/></td>     
            </tr>                                 
            <tr>                                           
              <td>基本工资</td>                           
              <td><input type="text" v-model="userType_baseSalary"/></td>             
              <td>工资提成</td>                     
              <td><input type="text" v-model="userType_commissionRate"/></td>                 
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
            <el-dialog :visible.sync="editShow" width="70%" >
              <div class="sp-page-content">
                <p v-model="text">{{text}}</p>    
                <table class="sp-grid-job"> 
                  <tbody>                                     
                  <tr>                                           
                    <td style="width: 90px;">姓 名</td>       
                    <td style="width: 210px;"><input type="text" v-model="user_name"/></td>
                    <td style="width: 90px;">员工类别</td>
                    <td style="width: 210px;"><input type="text" v-model="userType_name"/></td>     
                  </tr>                                 
                  <tr>                                           
                    <td>基本工资</td>                           
                    <td><input type="text" v-model="userType_baseSalary"/></td>             
                    <td>工资提成</td>                     
                    <td><input type="text" v-model="userType_commissionRate"/></td>                 
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
<!--    详情-->
    <div class="basic" v-show="isShow" v-for="item in obj">
      <el-dialog :visible.sync="isShow" width="70%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                     
            <tr>                                           
              <td style="width: 90px;">姓 名</td>                   
              <td style="width: 210px;">{{item.user_name}}</td>
              <td style="width: 90px;">员工类别</td>                   
              <td style="width: 210px;">{{item.userType_name}}</td>                                          
            </tr>
                   
            <tr>
              <td style="width: 90px;">请假天数</td>
              <td style="width: 210px;">{{item.userSalary_leaveDays}}</td>
              <td style="width: 90px;">旷工天数</td>
              <td style="width: 210px;">{{item.userSalary_absenteeismDays}}</td>
            </tr>    
               
            <tr>
              <td style="width: 90px;">迟到次数</td>
              <td style="width: 210px;">{{item.userSalary_lateNumber}}</td>
              <td style="width: 90px;">早退次数</td>
              <td style="width: 210px;">{{item.userSalary_leaveEarlyNumber}}</td>
            </tr>  
            <tr>
              <td style="width: 90px;">业绩金额</td>
              <td style="width: 210px;">{{item.user_performance}}</td>
              <td style="width: 90px;">提成金额</td>
              <td style="width: 210px;">{{item.userSalary_monthly}}</td>
            </tr>               
            </tbody>        
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">关 闭</el-button>
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
        editList: [],
        pageNo: 1,//存储当前页码值
        pageSize: 7,//设置每页条数
        currentPage: 1,//总页码
        pageSizes:[7],//当前页选择显示条数
      }
    },
    beforeMount() {

      //向后台发起请求，获取数据
      this.$axios.get(this.$api.staffManage.staffMoney).then((res) => {
        this.list = res.data;
      }).catch((err) => {
        console.log(err)
      })

      // this.$axios.get("/static/staff.json").then((res) => {
      //   console.log(res.data);
      //   this.list = res.data
      // }).catch((err) => {
      //   console.log(err);
      // })
    },
    methods: {
      //删除
      delFun: function (index) {
        this.list.splice(index, 1);
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
      saveFun() {
        this.dialogVisible = false;
        this.editList.user_name = this.user_name;
        this.editList.userType_name = this.userType_name;
        this.editList.userType_baseSalary = this.userType_baseSalary;
        this.editList.userType_commissionRate = this.userType_commissionRate;
        this.list.push(this.editList);
      },
      //编辑
      updateFun(index) {
        this.text = '编辑信息';
        this.selectedId = index;
        this.editShow = true;
        this.dialogVisible = false;
        var editList = this.list[index];
        this.user_name = editList.user_name;
        this.userType_name = editList.userType_name;
        this.userType_baseSalary = editList.userType_baseSalary;
        this.userType_commissionRate = editList.userType_commissionRate;

      },
      editSave(){
        this.dialogVisible = false;
        this.editShow = false;
        this.list[this.selectedId].user_name = this.user_name;
        this.list[this.selectedId].userType_name = this.userType_name;
        this.list[this.selectedId].userType_baseSalary = this.userType_baseSalary;
        this.list[this.selectedId].userType_commissionRate = this.userType_commissionRate;
        this.user_name="";
        this.userType_name="";
        this.userType_baseSalary="";
        this.userType_commissionRate=""
      },
      //详情
      btnDetails(index) {
        this.isShow = true;
        this.text = '更多详情';
        Vue.set(this.obj, 0, this.list[index]);
        console.log(index);
        console.log(this.obj);
      },
      //切换页码
      handleSizeChange(val) {
        this.pageSize = val;
      },
      //切换每页条数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pageNo = val
      }
    }
  }
</script>

<style scoped>
  #app{
    align-content: center;
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
</style>
