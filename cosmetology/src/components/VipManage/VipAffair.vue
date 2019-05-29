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
            <!--<el-form-item label="会员名称" prop="name">-->
              <!--<el-input v-model="editForm.customer_name" style="width: 150px" auto-complete="off"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="会员卡余额">-->
              <!--<el-input-number v-model="editForm.customer_balance"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="会员类型">-->
              <!--<el-input type="textarea" v-model="editForm.vip_name"></el-input>-->
            <!--</el-form-item>-->
            <table>
              <tbody>
              <tr>
                <td>会员姓名</td>
                <td><input type="text" :value="editForm.customer_name" readonly="true" style="width: 120px"/></td>
                <td>会员电话</td>
                <td><input type="text" :value="editForm.customer_phone" readonly="true" style="width: 120px"/></td>
                <td>会员类型</td>
                <td><input type="text" :value="editForm.vip_name" readonly="true" style="width: 120px"/></td>
              </tr>
              <tr>
                <td>卡余额</td>
                <td><input type="text" :value="'￥ '+editForm.customer_balance" readonly="true" style="width: 120px"/></td>
                <td>充值金额</td>
                <td><input type="text" :value="0" style="width: 120px"/></td>
              </tr>
              </tbody>
            </table>
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
              "customer_phone": 13445698701,
              "vip_name": "60",
              "customer_status": "当前在线",
              "customer_balance": 92,
              "customer_lastTime": 1559115103
            },
            {
              "customer_id": "2",
              "customer_name": "vip_name 2",
              "customer_sex": 0,
              "customer_phone": 15145678910,
              "vip_name": "93",
              "customer_status": "当前离线",
              "customer_balance": 91,
              "customer_lastTime": 1559115043
            },
            {
              "customer_id": "3",
              "customer_name": "vip_name 3",
              "customer_sex": 1,
              "customer_phone": 18211111111,
              "vip_name": "55",
              "customer_status": "当前离线",
              "customer_balance": 3,
              "customer_lastTime": 1559114983
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
          pageSize:8
        }
      },
      methods: {
        affairDataMoneyAdd(index, row){
          this.editFormVisible = true;
          this.editForm = Object.assign({}, row);
          console.log(this.editForm)
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

</style>
