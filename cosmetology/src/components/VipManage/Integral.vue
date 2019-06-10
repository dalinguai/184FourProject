<template>
  <div id="content">
    <span id="titleBody">积分规则</span>
    <el-button class="btnDelete" type="success" @click="addFun()">新增积分规则</el-button>
    <!--      组件首页-->
    <div>
      <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column type="selection" align="center" style="width: 55px"></el-table-column>
        <el-table-column fixed label="序号" width="50" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="积分规则"align="center">
        </el-table-column>
        <el-table-column label="操作"  align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delFun(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="updateFun(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--      分页-->
    <div id="pageTab" v-if="list.length>0">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[7,10,20,30]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!--      添加-->
    <div>
      <el-dialog :visible.sync="dialogVisible" width="60%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">消费</td>       
              <td style="width: 90px;"><input type="text" v-model="integrationRule_rechargeMoney"/></td>
              <td>元</td>
              <td style="width: 90px;">兑换</td>
              <td style="width: 90px;"><input type="text" v-model="integrationRule_exchangeIntegration"/></td>
              <td style="width:90px" >积分</td>                                                 
            </tr>
            <tr>
              <td style="width:90px">每</td>                           
              <td style="width:90px"><input type="text" v-model="integrationRule_consumeIntegration"/></td>             
              <td style="width:90px">积分</td>
              <td style="width:90px">抵扣</td>                     
              <td style="width:90px"><input type="text" v-model="integrationRule_deductionMoney"/></td>   
              <td style="width:90px">元</td>             
            </tr>       
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false;">取 消</el-button>
    <el-button plain type="primary" @click="saveFun($event);open3()">保 存</el-button>
          </span>

      </el-dialog>
    </div>
    <!--      编辑-->
    <div>
      <el-dialog :visible.sync="editShow" width="70%" >
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job"> 
            <tbody>                                     
            <tr>                                           
              <td style="width:90px" >消费</td>       
              <td style="width:90px"><input type="text" v-model="integrationRule_rechargeMoney"/></td>
              <td style="width:90px">元</td>
              <td style="width:90px">兑换</td>
              <td style="width:90px"><input type="text" v-model="integrationRule_exchangeIntegration"/></td> 
              <td style="width: 90px">积分</td>
            </tr>
            <tr>                                               
              <td style="width:90px">每</td>                           
              <td style="width:90px"><input type="text" v-model="integrationRule_consumeIntegration"/></td>             
              <td style="width:90px">积分</td> 
              <td style="width:90px">抵扣</td>                   
              <td style="width:90px"><input type="text" v-model="integrationRule_deductionMoney"/></td>   
              <td style="width:90px">元</td>             
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

  export default {
    name: "Integral",
    data() {
      return {
        value1: '',
        // totalItem:'',//总条数
        list: [],
        text: '',
        obj: [],
        isShow: false,
        dialogVisible: false,
        editShow:false,
        integrationRule_rechargeMoney:"",
        integrationRule_exchangeIntegration:"",
        integrationRule_consumeIntegration:"",
        integrationRule_deductionMoney:"",
        integrationRule_id:"",
        editList: {},
        pageNo: 1,//存储当前页码值
        pageSize: 7,//设置每页条数
        currentPage: 1,//当前页
        total:1,
        // pageSizes:[],//当前页选择显示条数
      }
    },
    created() {
      this.getUser();
    },
    methods:{
      getUser(){
        //向后台发起请求，获取数据
        console.log(this.currentPage)
        console.log(this.pageSize);
        this.$axios.post("http://172.17.1.237:8080/integral/select",{
          "page":this.currentPage,"row":this.pageSize
        },this.$config).then((res) => {
          console.log(res.data);
          this.list=res.data.data.integrationrule;
          this.total=res.data.rowCount;
          this.list.forEach((item)=> {
            item.text = `消费${item.integrationRule_rechargeMoney}元兑换${item.integrationRule_exchangeIntegration}个积分，每${item.integrationRule_consumeIntegration}积分抵扣${item.integrationRule_deductionMoney}元`
          });
        }).catch((err) => {
          console.log(err)
        })
      },
      //删除
      delFun(index,row) {
        index +=(this.pageNo -1)*this.pageSize;
        this.list.splice(index,1);
        console.log(row.integrationRule_id);
        this.$axios.post("http://172.17.1.237:8080/integral/delete",{
          "integrationRule_id":row.integrationRule_id
        },this.$config).then((res)=>{
          this.getUser();
        }).catch((err)=>{

        })
      },
      open3(){
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
        this.editList.integrationRule_rechargeMoney = this.integrationRule_rechargeMoney;
        this.editList.integrationRule_exchangeIntegration=this.integrationRule_exchangeIntegration;
        this.editList.integrationRule_consumeIntegration=this.integrationRule_consumeIntegration;
        this.editList.integrationRule_deductionMoney=this.integrationRule_deductionMoney;
        this.$axios.post("http://172.17.1.237:8080/integral/insert",{
            "integrationRule_rechargeMoney":this.editList.integrationRule_rechargeMoney,
            "integrationRule_exchangeIntegration":this.editList.integrationRule_exchangeIntegration,
            "integrationRule_consumeIntegration":this.editList.integrationRule_consumeIntegration,
            "integrationRule_deductionMoney":this.editList.integrationRule_deductionMoney
        },this.$config).then((res) => {
          this.getUser();
          this.list.forEach(function (item) {
            item.text = `消费${item.integrationRule_rechargeMoney}元兑换${item.integrationRule_exchangeIntegration}个积分，每${item.integrationRule_consumeIntegration}积分抵扣${item.integrationRule_deductionMoney}元`
          });
          console.log("数据"+this.list);

        }).catch((err) => {
          console.log(err)
        })
      },
      //  编辑
      updateFun(index) {
        this.text = '编辑信息';
        this.selectedId = index;
        this.editShow = true;
        this.dialogVisible = false;
        var editList = this.list[index];
        this.integrationRule_rechargeMoney = editList.integrationRule_rechargeMoney;
        this.integrationRule_exchangeIntegration = editList.integrationRule_exchangeIntegration;
        this.integrationRule_consumeIntegration = editList.integrationRule_consumeIntegration;
        this.integrationRule_deductionMoney = editList.integrationRule_deductionMoney;
        this.integrationRule_id = editList.integrationRule_id;   //获取id
      },
      editSave(event){
        console.log("保存编辑");
        this.dialogVisible = false;
        this.editShow = false;
        this.list[this.selectedId].integrationRule_rechargeMoney = this.integrationRule_rechargeMoney;
        this.list[this.selectedId].integrationRule_exchangeIntegration = this.integrationRule_exchangeIntegration;
        this.list[this.selectedId].integrationRule_consumeIntegration = this.integrationRule_consumeIntegration;
        this.list[this.selectedId].integrationRule_deductionMoney = this.integrationRule_deductionMoney;
        this.$axios.post("http://172.17.1.237:8080/integral/update",{
            "integrationRule_rechargeMoney": this.list[this.selectedId].integrationRule_rechargeMoney,
            "integrationRule_exchangeIntegration":this.list[this.selectedId].integrationRule_exchangeIntegration ,
            "integrationRule_consumeIntegration":this.list[this.selectedId].integrationRule_consumeIntegration,
            "integrationRule_deductionMoney":this.list[this.selectedId].integrationRule_deductionMoney,
            "integrationRule_id":this.integrationRule_id},this.$config).then((res) => {
          console.log(res)
          this.getUser();
          console.log(this.list);
        }).catch((err) => {
          console.log(err)
        })
        this.integrationRule_rechargeMoney="";
        this.integrationRule_exchangeIntegration="";
        this.integrationRule_consumeIntegration="";
        this.integrationRule_deductionMoney="";
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getUser();
      },
      //切换每页条数
      handleCurrentChange(val) {
        this.currentPage = val;
        this.pageNo = val;
        this.getUser();
      }
    }
  }
</script>

<style scoped>
  #content{
    align-content: center;
    padding-left: 20px ;
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
    padding-top: 20px;
  }
  span{
    font-size: 18px;
    margin-left: 10px;
  }
  #titleBody {
     height: 49px;
     line-height: 49px;
     font-size: 14px;
     color:#808080;
   }
  .btnDelete{
    height: 35px;
    padding-top: 0;
    line-height: 35px;
    margin-left: 20px;
  }
</style>
