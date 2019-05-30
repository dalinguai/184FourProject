<template>
  <div>
    <p style="float: left;padding: 10px 0 10px 10px">会员疗程补增</p>
    <el-table :data="vipAffairComesData" border stripe style="width: 100%">
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
    <!--补增信息-->
    <div v-if="editFormVisible">
      <el-dialog :title="editFormTitle" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <table id="tBody">
            <tbody>
            <tr>
              <td class="tdTitle">疗程类型</td>
              <td><input type="text" :value="editForm.courseTreatmentType_name" readonly="true"/></td>
              <td class="tdTitle">疗程价格</td>
              <td><input type="text" :value="'￥'+editForm.courseTreatmentAmount" readonly="true"/></td>
              <td class="tdTitle">疗程次数</td>
              <td><input type="text" :value="editForm.personIntegrationRule_totalTimes" readonly="true"/></td>
            </tr>
            <tr>
              <td class="tdTitle">折扣</td>
              <td><input type="text" :value="editForm.vip_discount" readonly="true"/></td>
              <td class="tdTitle">折扣价</td>
              <td><input type="text" :value="'￥'+editForm.discountprice" readonly="true"/></td>
              <td class="tdTitle">会员卡余额</td>
              <td><input class="inputMoney" type="text" :value="'￥'+editForm.customer_balance" readonly="true"/></td>
            </tr>
            </tbody>
          </table>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="affairDataMoneySave">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VipAffairComes",
    data() {
      return {
        vipAffairComesData: [],//存储当前会员已有的疗程事务
        pageNo: 1,//存储页码值
        pageSize: 6,//设置每页条数
        editFormVisible: false,//控制补增模态框隐藏
        editFormOld: {},//临时补增模态框界面数据数组
        editForm: {},//存储补增模态框界面数据：点击补增填充对应行的数据,
        editFormTitle: "",//存储模态框标题
        affairComesDataSecId: -1,//存储所选补增行的id
      }
    },
    methods: {
      affairDataComesUp(index, row) {
        this.editFormVisible = true;//显示模态框
        this.affairComesDataSecId = this.vipAffairComesData[index].courseTreatment_id;//获取点击行的下标对应的个人疗程id

        //将个人疗程id对应的疗程数据填充到数组中
        this.$axios.get(this.$api.vipManage.vipAffairComesAdd).then((res) => {
          this.editForm = res.data[0];
          console.log(this.editForm)
        }).catch((err) => {
          console.log(err)
        });
        //改变模态框标题
        this.editFormTitle = "【" + this.editForm.courseTreatment_name + "】价目信息表";//修改模态框标题
      }
    },
    //获取会员事务=>补增显示的所有数据
    beforeMount() {
      this.$axios.get(this.$api.vipManage.vipAffairComes).then((res) => {
        this.vipAffairComesData = res.data;
        console.log(this.vipAffairComesData)
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
    width: 70px;
  }

  #tBody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
  }
</style>
