<template>
    <div>
      <h2>会员事务</h2>
      <el-table :data="tableData" border stripe style="width: 100%;" >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="40" align="center"></el-table-column>
        <el-table-column prop="vip_name" label="会员姓名" width="120" align="center"></el-table-column>
        <el-table-column prop="vip_sex" label="性别" width="60" align="center"></el-table-column>
        <el-table-column prop="vip_tel" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column prop="vip_kaState" label="会员卡状态" width="120" align="center"></el-table-column>
        <el-table-column prop="vip_kaMoney" label="会员卡余额" width="120" align="center"></el-table-column>
        <el-table-column prop="vip_lastDate" label="上次到店时间" width="120" align="center"></el-table-column>
        <el-table-column label="操作" header-align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="affairDataMoneyAdd(scope.$index,scope.row)">充值</el-button> 
            <el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">修改项</el-button> 
          </template>
        </el-table-column>
      </el-table>
      <!--充值信息-->
      <div v-if="editFormVisible">
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
          <el-form :model="editForm" label-width="80px" ref="editForm">
            <el-form-item label="会员名称" prop="name">
              <el-input v-model="editForm.vip_name" style="width: 150px" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员性别">
              <el-input-number v-model="editForm.vip_sex"></el-input-number>
            </el-form-item>
            <el-form-item label="会员等级">
              <el-input type="textarea" v-model="editForm.vip_level"></el-input>
            </el-form-item>
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
              "id": "1",
              "vip_name": "vip_name 1",
              "vip_sex": 85,
              "vip_tel": 18,
              "vip_level": 60,
              "vip_kaState": "vip_kaState 1",
              "vip_state": "vip_state 1",
              "vip_kaMoney": 92,
              "vip_lastDate": 1559115103
            },
            {
              "id": "2",
              "vip_name": "vip_name 2",
              "vip_sex": 47,
              "vip_tel": 81,
              "vip_level": 93,
              "vip_kaState": "vip_kaState 2",
              "vip_state": "vip_state 2",
              "vip_kaMoney": 91,
              "vip_lastDate": 1559115043
            },
            {
              "id": "3",
              "vip_name": "vip_name 3",
              "vip_sex": 55,
              "vip_tel": 60,
              "vip_level": 55,
              "vip_kaState": "vip_kaState 3",
              "vip_state": "vip_state 3",
              "vip_kaMoney": 3,
              "vip_lastDate": 1559114983
            },
            {
              "id": "4",
              "vip_name": "vip_name 4",
              "vip_sex": 3,
              "vip_tel": 62,
              "vip_level": 98,
              "vip_kaState": "vip_kaState 4",
              "vip_state": "vip_state 4",
              "vip_kaMoney": 31,
              "vip_lastDate": 1559114923
            },
            {
              "id": "5",
              "vip_name": "vip_name 5",
              "vip_sex": 79,
              "vip_tel": 5,
              "vip_level": 12,
              "vip_kaState": "vip_kaState 5",
              "vip_state": "vip_state 5",
              "vip_kaMoney": 16,
              "vip_lastDate": 1559114863
            },
            {
              "id": "6",
              "vip_name": "vip_name 6",
              "vip_sex": 68,
              "vip_tel": 36,
              "vip_level": 73,
              "vip_kaState": "vip_kaState 6",
              "vip_state": "vip_state 6",
              "vip_kaMoney": 37,
              "vip_lastDate": 1559114803
            },
            {
              "id": "7",
              "vip_name": "vip_name 7",
              "vip_sex": 64,
              "vip_tel": 60,
              "vip_level": 20,
              "vip_kaState": "vip_kaState 7",
              "vip_state": "vip_state 7",
              "vip_kaMoney": 2,
              "vip_lastDate": 1559114743
            },
            // {
            //   "id": "8",
            //   "vip_name": "vip_name 8",
            //   "vip_sex": 47,
            //   "vip_tel": 5,
            //   "vip_level": 86,
            //   "vip_kaState": "vip_kaState 8",
            //   "vip_state": "vip_state 8",
            //   "vip_kaMoney": 33,
            //   "vip_lastDate": 1559114683
            // },
            // {
            //   "id": "9",
            //   "vip_name": "vip_name 9",
            //   "vip_sex": 78,
            //   "vip_tel": 42,
            //   "vip_level": 48,
            //   "vip_kaState": "vip_kaState 9",
            //   "vip_state": "vip_state 9",
            //   "vip_kaMoney": 96,
            //   "vip_lastDate": 1559114623
            // },
            // {
            //   "id": "10",
            //   "vip_name": "vip_name 10",
            //   "vip_sex": 67,
            //   "vip_tel": 22,
            //   "vip_level": 97,
            //   "vip_kaState": "vip_kaState 10",
            //   "vip_state": "vip_state 10",
            //   "vip_kaMoney": 74,
            //   "vip_lastDate": 1559114563
            // },
            // {
            //   "id": "11",
            //   "vip_name": "vip_name 11",
            //   "vip_sex": 34,
            //   "vip_tel": 19,
            //   "vip_level": 41,
            //   "vip_kaState": "vip_kaState 11",
            //   "vip_state": "vip_state 11",
            //   "vip_kaMoney": 99,
            //   "vip_lastDate": 1559114503
            // },
            // {
            //   "id": "12",
            //   "vip_name": "vip_name 12",
            //   "vip_sex": 21,
            //   "vip_tel": 41,
            //   "vip_level": 76,
            //   "vip_kaState": "vip_kaState 12",
            //   "vip_state": "vip_state 12",
            //   "vip_kaMoney": 14,
            //   "vip_lastDate": 1559114443
            // },
            // {
            //   "id": "13",
            //   "vip_name": "vip_name 13",
            //   "vip_sex": 24,
            //   "vip_tel": 17,
            //   "vip_level": 5,
            //   "vip_kaState": "vip_kaState 13",
            //   "vip_state": "vip_state 13",
            //   "vip_kaMoney": 15,
            //   "vip_lastDate": 1559114383
            // }
          ],
          //编辑界面数据
          editForm: {
            id: 0,
            vip_name: '',
            vip_sex: 0,
            vip_tel: 11111111111,
            vip_level: 0,
            vip_kaState: '',
            vip_state: '',
            vip_kaMoney: 0,
          },
          editFormVisible:false
        }
      },
      methods: {
        affairDataMoneyAdd(index, row){

        },
        handleEdit(index, row) {
          this.editFormVisible = true;
          console.log(this.editFormVisible);
          this.editForm = Object.assign({}, row);
          console.log(this.editForm)
        },editSubmit(){
          console.log("提交成功")
        }
      }
    }
</script>

<style scoped>

</style>
