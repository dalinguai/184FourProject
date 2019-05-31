<template>
  <div>
    <!--添加-->
    <el-button size="small" @click="dialogFormVisible = true" v-if="isShow" class="addBtn" type="success">新增会员</el-button>
    <!--远程搜索-->
    <el-autocomplete v-if="isShow" prefix-icon="el-icon-search" ref="input" v-model="state" @keyup.enter.native="searchFun"
                     clearable :fetch-suggestions="querySearchAsync" placeholder="请输入姓名或手机号" @select="handleSelect">
    </el-autocomplete>
    <!--tabs-->
    <el-tabs @tab-click="handleClick" type="border-card">
      <!--会员列表-->
      <el-tab-pane label="会员列表">
        <!--表格-->
        <el-table :data="vipList" stripe border style="width: 100%">
          <el-table-column fixed label="序号" width="55" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}} </span>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in vipHader" :key="index" :prop="item.prop" :label="item.label"
                           :width="item.width" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="vipDetail(scope.row.customer_id)">查看详情</el-button>
              <el-button type="text" size="small" @click="addLiaochen(scope.row.customer_id)">补增疗程</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--弹出层-->
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="radio" label="0">男</el-radio>
              <el-radio v-model="radio" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <!--散客列表-->
      <el-tab-pane label="散客列表">
        <!--表格-->
        <el-table :data="customerList" stripe border style="width: 100%">
          <el-table-column fixed label="序号" width="55" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}} </span>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in customerHader" :key="index" :prop="item.prop" :label="item.label"
                           :width="item.width" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="vipDetail(scope.row.customer_id)">消费详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    name: "VipList",
    data() {
      return {
        vipHader: [
          {prop: "customer_name", label: "姓名", width: "100"},
          {prop: "customer_sex", label: "性别", width: "50"},
          {prop: "customer_phone", label: "手机号", width: "120"},
          {prop: "customer_balance", label: "卡内余额", width: "100"},
          {prop: "customer_vipIntegration", label: "积分", width: "100"},
          {prop: "vip_name", label: "会员级别", width: "150"},
          {prop: "customer_lastTime", label: "上次到店", width: "200"}
        ],
        vipList: [],
        customerHader:  [
          {prop: "customer_number", label: "散客编号", width: "100"},
          {prop: "customer_name", label: "散客名称", width: "100"},
          {prop: "customer_sex", label: "性别", width: "50"},
          {prop: "customer_lastTime", label: "上次到店", width: "200"}
        ],
        customerList: [],
        state: '',
        isShow:true,
        timeout: null,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '50px',
        radio: '0'
      }
    },
    created() {
      this.$axios.get(this.$api.vipManage.vipList).then((res) => {
        this.vipList = res.data;
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      handleClick(tab){
        if(tab.index==0){
          this.isShow=true;
          this.state="";
          this.$axios.get(this.$api.vipManage.vipList).then((res) => {
            this.vipList = res.data;
          }).catch((err) => {
            console.log(err);
          })
        }else {
          this.isShow=false;
          this.$axios.get(this.$api.vipManage.customerList).then((res) => {
            this.customerList = res.data;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      vipDetail(id) {
        console.log(id);
      },
      addLiaochen(id) {
        console.log(id);
      },
      searchFun() {
        this.$axios.get(this.$api.vipManage.vipList, {params: {value: this.state}}).then((res) => {
          this.vipList = res.data;
          this.$refs.input.activated = false;//关闭下拉
          this.$refs.input.$el.querySelector('input').blur()//失去焦点
        }).catch((err) => {
          console.log(err);
        })
      },
      querySearchAsync(queryString, cb) {
        this.$axios.get(this.$api.vipManage.vipList).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].value = res.data[i].customer_name
          }
          let restaurants = res.data;
          let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.customer_name.toLowerCase().indexOf(queryString.toLowerCase()) != -1) ||
            (state.customer_phone.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      handleSelect(item) {
        this.vipList = [item];
      }
    }
  };
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .el-autocomplete {
    position: absolute;
    top: 61px;
    left: 490px;
    z-index: 3;
    @{deep} .el-input__prefix {
      font-size: 20px;
      top: -2px;
    }
  }
  .addBtn{
    position: absolute;
    top: 62px;
    left: 365px;
    z-index: 3;
  }
  @{deep} .el-input--prefix .el-input__inner {
    padding-left: 36px;
    height: 35px;
    line-height: 35px;
    padding-right: 0;
  }
  .el-tabs {
    @{deep} .el-tabs__item {
      height: 50px;
      line-height: 50px;
    }
  }
</style>
