<template>
  <div>
  <div style="width:1180px;">
    <el-table :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              border style="width: 100%" stripe >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column fixed label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="user_number" label="工号" width="120">
      </el-table-column>
      <el-table-column width="120" prop="user_birthday" label="年龄">
      </el-table-column>
      <el-table-column prop="user_Idcard" label="身份证号">
      </el-table-column>
      <el-table-column prop="user_phone" label="联系电话">
      </el-table-column>
      <el-table-column prop="user_dateOnBoard" label="入职日期">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="shanchu(scope.$index)">删除</el-button>
          <el-button type="text" @click="updateFun(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
  </div>
</template>

<script>
    export default {
        name: "workAttend",
      data(){
          return{
            list:[],
            total: 1,
            pageNo: 1,
            pageSize: 5,
            currentPage: 1,

          }
      },
      methods:{

      },
        created() {
        this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/staffManagement")
          .then((res) => {
            this.list = res.data;
          }).catch((err) => {
          console.log(err);
        });
        // this.handleUserList();
        // this.couponSelected = this.sexOptions[0].name;
      },
    }

</script>

<style scoped>

</style>
