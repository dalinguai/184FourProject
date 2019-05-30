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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="affairDataMoneyAdd(scope.$index,scope.row)">充值</el-button>
           
          <el-button type="text" size="small" @click="affairDataComesAdd(scope.$index,scope.row)">补增</el-button>
           
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
        tableData: [],//页面所有数据
        editForm: {},//充值界面数据：点击充值填充对应行的数据
        editFormVisible: false,//充值模态框隐藏
        pageNo: 1,//页码初始值
        pageSize: 6,//每页条数
        moneyAddVal: ""//初始充值额
      }
    },
    methods: {
      //显示充值模态框
      affairDataMoneyAdd(index, row) {
        this.editFormVisible = true;//显示模态框
        this.moneyAddVal = "";//清空充值额
        this.editForm = Object.assign({}, row);//将点击的行的下标的数据填充到数组中
        console.log(this.editForm)
      },
      moneyAddInput(e) {
        this.moneyAddVal = e.target.value.replace(/[^\d]/g, '');//充值额只能输入数字
      },
      editSubmit() {
        this.editFormVisible = false;//隐藏模态框
        console.log(this.moneyAddVal);
        this.$axios.post(this.$api.vipManage.vipAffairSend,{vipRecharge_amount:this.moneyAddVal});
        console.log("提交成功")
      },
      affairDataComesAdd(index, row) {

      },

    },
    beforeMount() {
      this.$axios.get(this.$api.vipManage.vipAffair).then((res)=>{
        this.tableData = res.data;
        console.log(this.tableData)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  #tBody {
    border-collapse: collapse;
    border: 1px solid #E1E6EB;
  }

  #tBody td {
    height: 46px;
    padding: 0 12px;
    font-size: 13px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    width: 100px;
  }

  #tBody .tdTitle {
    width: 80px;
  }

  #tBody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
  }

  #tBody td .inputMoney {
    color: red;
  }

  #moneyAdd {
    margin-top: 20px;
    font-size: 16px;
  }

  #moneyAdd input {
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
    width: 100px;
    font-size: 18px;
    padding: 0 8px;
  }
</style>
