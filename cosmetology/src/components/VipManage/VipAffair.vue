<template>
  <div>
    <p style="float: left;padding: 10px 0 10px 10px">会员事务</p>
    <!--页面信息显示区-->
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%">
      <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column fixed label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_Name" label="会员姓名" align="center"></el-table-column>
      <el-table-column prop="customer_sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="customer_Phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="customer_status" label="在线状态" align="center"></el-table-column>
      <el-table-column prop="customer_Balance" label="会员卡余额" align="center"></el-table-column>
      <el-table-column prop="customer_LastTime" label="上次到店时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="affairDataMoneyAdd(scope.$index,scope.row)">余额充值</el-button>
          <el-button type="text" size="small" @click="affairDataComesAdd(scope.$index,scope.row)">疗程补增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--页码-->
    <div id="pageTab">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
      :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>
    </div>
    <!--充值信息模态框-->
    <div v-if="editFormVisible">
      <el-dialog title="会员卡充值" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <table id="tBody">
            <tbody>
            <tr>
              <td class="tdTitle">会员姓名</td>
              <td><input type="text" :value="editForm.customer_Name" readonly="true"/></td>
              <td class="tdTitle">会员性别</td>
              <td><input type="text" :value="editForm.customer_sex" readonly="true"/></td>
              <td class="tdTitle">会员卡号</td>
              <td><input type="text" :value="editForm.customer_Phone" readonly="true"/></td>
            </tr>
            <tr>
              <td class="tdTitle">会员类型</td>
              <td><input type="text" :value="editForm.vip_name" readonly="true"/></td>
              <td class="tdTitle">会员折扣</td>
              <td><input type="text" :value="editForm.vip_discount" readonly="true"/></td>
              <td class="tdTitle">会员卡余额</td>
              <td><input class="inputMoney" type="text" :value="'￥'+editForm.customer_Balance" readonly="true"/></td>
            </tr>
            </tbody>
          </table>
          <div id="moneyAdd">
            <span>请输入充值金额：</span>
            <input type="tel" @input="moneyAddInput($event)" v-model="moneyAddVal"/>
            <span>积分规则：</span>
            <!--积分规则下拉列表-->
            <el-select v-model="value" placeholder="请选择" @change="valueChangeFun">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
        //积分规则下拉数据
        options: [],
        value: '',
        tableData: [],//存储页面所有数据
        editFormVisible: false,//控制充值模态框隐藏
        editForm: {},//存储充值界面数据：点击充值填充对应行的数据
        affairDataSecIndex: -1,//存储所选充值行的下标
        moneyAddVal: "",//存储充值额
        affairDataComes: [],//存储补增对象数据
        affairSecId: -1,//存储补增选中的用户id
        pageNo: 1,//存储当前页码值
        pageSize: 7,//设置每页条数
        currentPage: 1,//总页码
        pageSizes:[7],//当前页选择显示条数
        api:this.$api.vipManage.vipListPage,//分页
      //  会员充值成功后的会员id
        afterId:'',
      //  会员充值积分规则id
        integrationRule_id:'',
      }
    },
    // 挂载前，
    beforeMount() {
      //向后台发起请求，获取会员事务显示的所有数据
      this.$axios.post(this.api,{pageNum:this.pageSize,currentPage:1},this.$config).then((res) => {
        console.log("请求成功");
        this.tableData = res.data.data;
        console.log(this.tableData);
      }).catch((err) => {
        console.log(err)
      })
    },
    // 方法
    methods: {
      //显示充值模态框
      affairDataMoneyAdd(index, row) {
        console.log(index);
        console.log(row);
        this.afterId = row.customer_Id;
        console.log("点击充值");
        this.options = [];
        this.$axios.post(this.$api.vipManage.VipIntegral,{page:'',row:''},this.$config).then((res)=>{
          console.log("请求成功");
          let arry = res.data.data.integrationrule;
          console.log(arry);
          arry.forEach((item,index)=>{
            let label="充值"+item.integrationRule_rechargeMoney+"金额，兑换积分"+item.integrationRule_exchangeIntegration+"积分";
            let id = item.integrationRule_id;
            this.options.push({value:id,label:label})
          });
          // this.
        }).catch((err)=>{
          console.log(err);
        });
        this.editFormVisible = true;//显示模态框
        this.moneyAddVal = "";//清空充值额
        this.affairDataSecIndex = index;//修改所选充值行的下标
        this.editForm = Object.assign({}, row);//将点击的行的下标的数据填充到数组中
      },
      //限制充值金额输入框只能为数字
      moneyAddInput(e) {
        this.moneyAddVal = e.target.value.replace(/[^\d]/g, '');//充值额只能输入数字
      },
      valueChangeFun(){
        console.log('值');
        console.log(this.value);
        this.afterId = this.value;
      },
      //点击提交，向后台发送请求，根据返回数据，提示充值结果成功与否
      affairDataMoneySave() {
        this.editFormVisible = false;//隐藏模态框
        // this.tableData[this.affairDataSecIndex].customer_balance += Number(this.moneyAddVal);//修改数组中的余额，post请求后台时删除该代码
        //传递充值的数据到后台
        console.log("规则id"+this.value);
        console.log('会员id'+this.afterId);
        console.log('会员充值金额'+this.moneyAddVal);
        this.$axios.post(this.$api.vipManage.VipRecharge,{
          customer_id:this.afterId,
          integrationRule_id:this.afterId,
          vipRecharge_amount:this.moneyAddVal},this.$config)
          .then((res)=>{
          console.log('提交成功');
            console.log(res.data);
          if (res.data.returnCode==="200"){
            this.$notify({
              title: '提示',
              message: '会员账户充值成功！',
              type: 'success'
            });
          }else {
            this.$notify.error({
              title: '提示',
              message: res.data.msg
            });
          }
        }).catch((err)=>{
          console.log(err);
        });
        //传参后重新请求并加载页面数据
        // this.$axios.get(this.$api.vipManage.vipAffair).then((res) => {
        //   this.tableData = res.data;
        // }).catch((err) => {
        //   console.log(err)
        // });
        // 成功提示
      },
      //取消充值
      affairDataMoneyLose(){
        this.editFormVisible = false;
        this.$notify.info({
          title: '提示',
          message: '取消充值成功！'
        });
      },
      //点击疗程补增按钮，获取所选行的会员Id并传参跳转到补增疗程页面
      affairDataComesAdd(index, row) {
        this.affairDataComes = Object.assign({}, row);//将点击的行的下标的数据填充到数组中
        this.affairSecId = this.affairDataComes.customer_Id;//修改补增选中的会员id
        this.$router.push({name: 'VipAffairComes', params: {customer_Id: this.affairSecId}});//传递会员Id并跳转到补增页面
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
  #pageTab{
    text-align: center;
    padding: 20px 0;
  }
</style>
