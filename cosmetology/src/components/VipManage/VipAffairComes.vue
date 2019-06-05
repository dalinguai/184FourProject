<template>
  <div>
    <p style="float: left;padding: 10px 0 10px 10px">会员事务 / 疗程补增</p>
    <!--页面信息显示区-->
    <el-table :data="vipAffairComesData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe style="width: 100%">
      <el-table-column fixed label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="customer_name" label="会员姓名" align="center"></el-table-column>
      <el-table-column prop="courseTreatmentType_name" label="疗程类型" align="center"></el-table-column>
      <el-table-column prop="courseTreatment_name" label="疗程名称" align="center"></el-table-column>
      <el-table-column prop="personIntegrationRule_totalTimes" label="疗程次数" align="center"></el-table-column>
      <el-table-column prop="personIntegrationRule_surplusTimes" label="疗程剩余次数" align="center"></el-table-column>
      <el-table-column prop="personIntegrationRule_valid" label="是否有效" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="affairDataComesUp(scope.$index,scope.row)">补增</el-button>
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
                     :total="vipAffairComesData.length">
      </el-pagination>
    </div>
    <!--补增信息-->
    <div v-if="editFormVisible">
      <el-dialog :title="editFormTitle" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <table id="tBody">
            <tbody>
            <tr>
              <td class="tdTitle">疗程分类</td>
              <td class="tdTitle">疗程价格</td>
              <td class="tdTitle">疗程次数</td>
              <td class="tdTitle">会员折扣</td>
              <td class="tdTitle">折扣价格</td>
              <td class="tdTitle">账户余额</td>
              <td class="tdTitle tdNum">请输入购买次数</td>
              <td class="tdTitle">总价</td>
            </tr>
            <tr>
              <td><input type="text" :value="editForm.courseTreatment.courseTreatmentType_name" readonly="true"/></td>
              <td><input class="inputMoney" type="text" :value="'￥'+editForm.courseTreatment.courseTreatmentAmount" readonly="true"/>
              </td>
              <td><input type="text" :value="1" readonly="true"/></td><!--疗程次数默认1次-->
              <td><input type="text" :value="editForm.customer.vip_discount" readonly="true"/></td>
              <td><input class="inputMoney" type="text" :value="'￥'+editForm.courseTreatment.courseTreatmentAmount*editForm.customer.vip_discount" readonly="true"/></td>
              <td><input class="inputMoney" type="text" :value="'￥'+editForm.customer.customer_balance" readonly="true"/></td>
              <td><input id="numAdd" type="tel" @input="numAddValFun($event)" v-model="numAddVal"/></td>
              <td><input class="inputMoney" type="text" :value="'￥'+moneyCount" readonly="true"/></td>
            </tr>
            </tbody>
          </table>
          <div></div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="affairDataMoneyLose">取消</el-button>
          <el-button type="primary" @click.native="affairDataMoneySave">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "VipAffairComes",
    data() {
      return {
        vipAffairComesData: [],//存储当前会员已有的疗程事务
        editFormVisible: false,//控制补增模态框隐藏
        editForm: {},//存储补增模态框界面数据：点击补增填充对应行的数据,
        editFormTitle: "",//存储模态框标题
        customer_Id:"",//个人id
        affairComesDataSecId: -1,//存储所选补增行的个人疗程id
        numAddVal: "",//存储补增次数
        moneyCount:"0",//存储购买总价
        pageNo: 1,//存储当前页码值
        pageSize: 7,//设置每页条数
        currentPage: 1,//总页码
        pageSizes:[7],//当前页选择显示条数
        personIntegrationRule_totalTimes:"",////传入的疗程总次数
        personIntegrationRule_surplusTimes:'',////传入的疗程剩余次数
      }
    },
    beforeMount() {
      console.log('所有疗程');
      this.customer_Id = this.$route.params.customer_Id;//储存传入的个人id
      //向后台发起请求，获取会员事务=>补增显示的所有数据
      this.$axios.post(this.$api.vipManage.vipAffairComes,{customer_id:this.customer_Id,startIndex:this.pageSize,pageCount:1},this.$config).then((res) => {
        console.log("成功返回数据");
        console.log(res.data.data);
        this.vipAffairComesData = res.data.data;
        this.affairComesDataSecId = res.data.data[0].personIntegrationRule_id
      }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      //点击补增按钮，显示模态框并加载数据
      affairDataComesUp(index, row) {
        console.log(row);
        this.personIntegrationRule_totalTimes = row.personIntegrationRule_totalTimes;//传入的疗程总次数
        this.personIntegrationRule_surplusTimes = row.personIntegrationRule_surplusTimes;//传入的疗程剩余次数
        let courseTreatment_id = row.courseTreatment_id;
        this.editFormVisible = true;//显示模态框
        this.customer_Id = this.vipAffairComesData[index].courseTreatment_id;//获取点击行的下标对应的个人疗程id
        this.numAddVal = "";//清空补增值
        //向后台发送请求，将个人id和对应的需要不增的疗程id对应的疗程数据填充到数组中
        this.$axios.post(this.$api.vipManage.vipAffairComesAdd,{customer_id:this.customer_Id,courseTreatment_id:courseTreatment_id},this.$config).then((res) => {
          console.log(res.data.data);
          this.editForm = res.data.data;
          this.editFormTitle = "【" + this.editForm.courseTreatment.courseTreatment_name + "】价目信息表";//修改模态框标题
        }).catch((err) => {
          console.log(err)
        });
        //重新将总次数和剩余次数置玮空
        // this.personIntegrationRule_totalTimes = '';
        // this.personIntegrationRule_surplusTimes = '';
      },
      //限制补增次数输入框只能为数字
      numAddValFun(e) {
        this.numAddVal = e.target.value.replace(/[^\d]/g, '');//限制输入格式
        this.moneyCount = this.numAddVal * this.editForm.courseTreatment.courseTreatmentAmount * this.editForm.customer.vip_discount;//根据输入的次数计算总价
      },
      //点击提交按钮，保存数据并传递给后台
      affairDataMoneySave() {
        console.log(this.vipAffairComesData);
        console.log("原疗程总次数"+this.personIntegrationRule_totalTimes);
        console.log("原疗程剩余次数"+this.personIntegrationRule_surplusTimes);
        console.log("个人疗程id"+this.affairComesDataSecId);
        console.log('花费实际金额'+this.moneyCount);
        console.log("当前余额"+this.editForm.customer.customer_balance);
        console.log("保存");
        console.log(this.vipAffairComesData);
        this.editFormVisible = false;//隐藏模态框
        // 遍历当前会员已有的疗程事务的数组，找到补增对应的数据，判断余额是否充足，
        // 是则向后台发送请求，增加剩余次数，并重新请求数据刷新页面，并扣除余额，否则提示余额不足
        let that = this;
        if(this.editForm.customer.customer_balance>=this.moneyCount && this.moneyCount!=0){
          console.log("进入2");
          // item.personIntegrationRule_surplusTimes = item.personIntegrationRule_surplusTimes + Number(that.numAddVal);//增加次数
          this.editForm.customer.customer_balance = this.editForm.customer.customer_balance - that.moneyCount;//扣除金额
          this.$axios.post(this.$api.vipManage.insertTreatment,{
            personIntegrationRule_id:this.affairComesDataSecId,
            personIntegrationRule_totalTimes:parseInt(this.personIntegrationRule_totalTimes)+parseInt(this.numAddVal),
            personIntegrationRule_surplusTimes:parseInt(this.personIntegrationRule_surplusTimes)+parseInt(this.numAddVal),
            Spending_money:this.moneyCount
          },this.$config).then((res)=>{
            if (res.data.returnCode === "200"){
              console.log("上传成功");
            }
            that.$notify({
              title: '提示',
              message: '补增成功！',
              type: 'success'
            });
          }).catch((err)=>{
            console.log(err)
          })
        }
        else if(this.editForm.customer.customer_balance<that.moneyCount){
          console.log('余额不足');
          that.$notify.error({
            title: '账户余额不足',
            message: '请提醒会员用户充值或重购次数！'
          });
        }
        // let that = this;
        // that.vipAffairComesData.forEach(function (item,index) {
        //   console.log("进入");
        //   if(item.courseTreatment_id==that.customer_Id){
        //     console.log("进入1");
        //     if(item.customer_balance>=that.moneyCount){
        //       console.log("进入2");
        //       item.personIntegrationRule_surplusTimes = item.personIntegrationRule_surplusTimes + Number(that.numAddVal);//增加次数
        //       item.customer_balance = item.customer_balance - that.moneyCount;//扣除金额
        //       that.$notify({
        //         title: '提示',
        //         message: '补增成功！',
        //         type: 'success'
        //       });
        //     }
        //     else if(item.customer_balance<that.moneyCount){
        //       console.log('余额不足');
        //       that.$notify.error({
        //         title: '账户余额不足',
        //         message: '请提醒会员用户充值或重购次数！'
        //       });
        //     }
        //   }
        // });
      },
      //点击取消按钮，提示信息
      affairDataMoneyLose(){
        this.editFormVisible = false;
        this.$notify.info({
          title: '提示',
          message: '取消补增成功！'
        });
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
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    width: 88px;
    text-align: center;
    padding: 0 10px;
  }

  #tBody .tdNum {
    width: 120px;
  }

  #tBody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
    text-align: center;
  }

  #tBody td .inputMoney {
    color: red;
  }

  #tBody td #numAdd {
    border: none;
    width: 80px;
    font-size: 18px;
    outline: none;
    text-align: center;
  }
  #pageTab{
    text-align: center;
    padding: 20px 0;
  }
</style>
