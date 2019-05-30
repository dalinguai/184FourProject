<template>
    <div>
      <h2>会员事务</h2>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed label="序号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="customer_name" label="会员姓名" align="center"></el-table-column>
        <el-table-column prop="customer_sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="customer_phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="customer_status" label="在线状态" align="center"></el-table-column>
        <el-table-column prop="customer_balance" label="会员卡余额" align="center"></el-table-column>
        <el-table-column prop="customer_lastTime" label="上次到店时间" align="center"></el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="affairDataMoneyAdd(scope.$index,scope.row)">充值</el-button> 
            <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">补增</el-button> 
          </template>
        </el-table-column>
      </el-table>
      <!--充值信息-->
      <div v-if="editFormVisible">
        <el-dialog title="会员卡充值" :visible.sync="editFormVisible" :append-to-body="true">
          <el-form :model="editForm" label-width="80px" ref="editForm">
            <table id="tBody">
              <tbody>
              <tr>
                <td class="tdTitle">会员姓名</td>
                <td><input type="text" :value="editForm.customer_name" readonly="true"/></td>
                <td class="tdTitle">会员性别</td>
                <td><input type="text" :value="editForm.customer_sex" readonly="true"/></td>
                <td class="tdTitle">会员卡号</td>
                <td><input type="text" :value="editForm.customer_phone" readonly="true"/></td>
              </tr>
              <tr>
                <td class="tdTitle">会员类型</td>
                <td><input type="text" :value="editForm.vip_name" readonly="true"/></td>
                <td class="tdTitle">会员折扣</td>
                <td><input type="text" :value="editForm.vip_discount" readonly="true"/></td>
                <td class="tdTitle">会员卡余额</td>
                <td><input class="inputMoney" type="text" :value="'￥'+editForm.customer_balance" readonly="true"/></td>
              </tr>
              </tbody>
            </table>
            <div id="moneyAdd">
              <span>请输入充值金额：</span>
              <input type="tel" @input="moneyAddInput($event)" v-model="moneyAddVal"/>
              <!--:value="moneyAddVal" <el-input v-model="gasLevelForm.multiple" type="text" maxlength="3" "this.value=this.value.replace(/\D/g,'')" style="width:200px;"/>-->
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
</template>

<script>
    export default {
        name: "VipAffair",
      data() {
        return {
          //页面所有数据
          tableData: [
            {
              "customer_id": "1",
              "customer_name": "vip_name 1",
              "customer_sex": 1,
              "customer_phone": 88888888888,
              "vip_name": "白金会员",
              "customer_status": "当前在线",
              "customer_balance": 92,
              "customer_lastTime": 1559115103,
              "vip_discount":0.8
            },
            {
              "customer_id": "2",
              "customer_name": "vip_name 2",
              "customer_sex": 0,
              "customer_phone": 15145678910,
              "vip_name": "黄金会员",
              "customer_status": "当前离线",
              "customer_balance": 91,
              "customer_lastTime": 1559115043,
              "vip_discount":0.9
            },
            {
              "customer_id": "3",
              "customer_name": "vip_name 3",
              "customer_sex": 1,
              "customer_phone": 18211111111,
              "vip_name": "白金会员",
              "customer_status": "当前离线",
              "customer_balance": 3,
              "customer_lastTime": 1559114983,
              "vip_discount":0.8
            }
          ],
          //编辑界面数据
          editForm: {
            customer_id: 0,
            customer_name: '',
            customer_sex: 0,
            vip_name: "0",
            customer_status: '',
            customer_balance: 0,
            customer_lastTime:20190501
          },
          editFormVisible:false,
          pageNo:1,
          pageSize:6,
          moneyAddVal:0
        }
      },
      methods: {
        affairDataMoneyAdd(index, row){
          this.editFormVisible = true;
          this.editForm = Object.assign({}, row);
          console.log(this.editForm)
        },
        moneyAddInput(e){
          this.moneyAddVal=e.target.value.replace(/[^\d]/g,'');
        },
        handleEdit(index, row) {
          // this.editFormVisible = true;
          // this.editForm = Object.assign({}, row);
          // console.log(this.editForm)
        },editSubmit(){
          console.log("提交成功")
        }
      }
    }
</script>

<style scoped>
  #tBody{
    border-collapse: collapse;
    border: 1px solid #E1E6EB;
  }
  #tBody td{
    height: 46px;
    padding: 0 12px;
    font-size: 13px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    width: 100px;
  }
  #tBody .tdTitle{
    width: 80px;
  }
  #tBody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
  }
  #tBody td .inputMoney{
    color: red;
  }
  #moneyAdd{
    margin-top: 20px;
    font-size: 16px;
  }
  #moneyAdd input{
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
    width: 100px;
    font-size: 18px;
    padding: 0 8px;
  }
</style>
