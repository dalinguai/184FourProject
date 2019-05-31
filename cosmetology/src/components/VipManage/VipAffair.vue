<template>
  <div>
    <p style="float: left;padding: 10px 0 10px 10px">会员事务</p>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column fixed label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
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
          <el-button type="text" size="small" @click="affairDataMoneyAdd(scope.$index,scope.row)">余额充值</el-button>
          <el-button type="text" size="small" @click="affairDataComesAdd(scope.$index,scope.row)">疗程补增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--充值信息模态框-->
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
          <el-button @click.native="affairDataMoneyLose">取消</el-button>
          <el-button type="primary" @click.native="affairDataMoneySave" :plain="true">提交</el-button>
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
        tableData: [],//存储页面所有数据
        editFormVisible: false,//控制充值模态框隐藏
        editForm: {},//存储充值界面数据：点击充值填充对应行的数据
        affairDataSecIndex: -1,//存储所选充值行的下标
        pageNo: 1,//存储页码值
        pageSize: 6,//设置每页条数
        moneyAddVal: "",//存储充值额
        affairDataComes: [],//补增对象的数组
        affairSecId: -1//存储补增选中的用户id
      }
    },
    methods: {
      //显示充值模态框
      affairDataMoneyAdd(index, row) {
        this.editFormVisible = true;//显示模态框
        this.moneyAddVal = "";//清空充值额
        this.affairDataSecIndex = index;//修改所选充值行的下标
        this.editForm = Object.assign({}, row);//将点击的行的下标的数据填充到数组中
      },
      //限制充值金额输入框只能为数字
      moneyAddInput(e) {
        this.moneyAddVal = e.target.value.replace(/[^\d]/g, '');//充值额只能输入数字
      },
      //提交充值信息
      affairDataMoneySave() {
        this.editFormVisible = false;//隐藏模态框

        this.tableData[this.affairDataSecIndex].customer_balance += Number(this.moneyAddVal);//修改数组中的余额，post请求后台时删除该代码

        //传递充值的数据到后台
        // this.$axios.post(this.$api.vipManage.vipAffairSend,{vipRecharge_amount:this.moneyAddVal});

        //传参后重新请求并加载页面数据
        // this.$axios.get(this.$api.vipManage.vipAffair).then((res) => {
        //   this.tableData = res.data;
        // }).catch((err) => {
        //   console.log(err)
        // });
        console.log("提交成功");
        this.$message({
          message: '恭喜你，充值成功',
          type: 'success'
        });

      },
      affairDataMoneyLose(){
        this.editFormVisible = false;
        this.$message({
          showClose: true,
          message: '取消充值成功'
        });

      },
      //补增
      affairDataComesAdd(index, row) {
        this.affairDataComes = Object.assign({}, row);//将点击的行的下标的数据填充到数组中
        this.affairSecId = this.affairDataComes.customer_id;//修改补增选中的用户id
        console.log(this.affairSecId)
        this.$router.push({name: 'VipAffairComes', params: {customer_id: this.affairSecId}});
      }

    },
    //获取会员事务显示的所有数据
    beforeMount() {
      this.$axios.get(this.$api.vipManage.vipAffair).then((res) => {
        this.tableData = res.data;
        console.log(this.tableData)
      }).catch((err) => {
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
    outline: none;
  }
</style>
