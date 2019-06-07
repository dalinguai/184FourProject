<template>
  <div class="content_tatol">
    <div class="elPut">
      <div class="el_1"  >
        总消费：
        <el-input v-model="customer_totalconsumption_start" vinput="customer_totalconsumption_start"></el-input>
        -
        <el-input v-model="customer_totalconsumption_end"></el-input>
      </div>
      <div class="el_1">
        护理消费：
        <el-input v-model="customer_courseTreatmentTotalExpense_start"></el-input>
        -
        <el-input v-model="customer_courseTreatmentTotalExpense_end"></el-input>
      </div>
      <div class="el_1">
        产品消费：
        <el-input v-model="customer_commodityTotalExpense_start"></el-input>
        -
        <el-input v-model="customer_commodityTotalExpense_end"></el-input>
      </div>
      <div class="el_1">
        卡内余额：
        <el-input v-model="customer_balance_start"></el-input>
        -
        <el-input v-model="customer_balance_end"></el-input>
      </div>
      <div class="el_3">
        到店次数：
        <el-input v-model="customer_times_start"></el-input>
        -
        <el-input v-model="customer_times_end"></el-input>
      </div>
    </div>

    <div class="left">
      <div class="ss_left">
        <el-row class="demo-autocomplete">
          <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </div>
      <div class="ss_right">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <!-- 分类检索-->
    <div class="right">
      <span>排序：
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :tatol="item.total"
      @click.native="sayClick($event)"
    >
    </el-option>
  </el-select>
    </span>
      <span>
      <el-radio-group v-model="radio">
    <el-radio :label="3">由高到底</el-radio>
  </el-radio-group><el-button type="primary" icon="el-icon-search" @click="orderList" v-bind:vinput="this.customer_totalconsumption_start">快速排序</el-button></span>
    </div>
    <div class="content">
<!--      <TbPublic/>-->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="customer_number"
          label="编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customer_name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="customer_sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="customer_phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="customer_balance"
          label="余额">
        </el-table-column>
        <el-table-column
          prop="count"
          label="消费总额">
        </el-table-column>
        <el-table-column
          prop="customer_lastTime"
          label="上次到店">
        </el-table-column>

      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalCount">
      </el-pagination>
    </div>
  </div>


</template>

<script>
  // import TbPublic from './TbPublic'

  export default {
    components: {
      // TbPublic,
    },
    data() {
      return {
        restaurants: [],
        tableData: [],
        state1: '',
        state2: '',
        radio: 3,
        currentPage: 1,//当前页
        pageSize: 8,//每页显示数据
        totalCount: 0,//总条数
        strip:'',
        nlist: [],
        options: [{
          value: '选项1',
          label: '消费金额',
          total: 'customer_totalconsumption'
        }],
        value:'消费金额',
        customer_totalconsumption_start:'',
        customer_totalconsumption_end:'',
        customer_courseTreatmentTotalExpense_start:'',
        customer_courseTreatmentTotalExpense_end:'',
        customer_commodityTotalExpense_start:'',
        customer_commodityTotalExpense_end:'',
        customer_balance_start:'',
        customer_balance_end:'',
        customer_times_start:'',
        customer_times_end:''
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      search() {//获取input输入值
        // this.$store.commit("getData",this.state1)
        // console.log("aaaaaaa"+this.$store.state.data)
        // console.log(this.state1);

      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {//默认搜索提示数据
        return [
          {"value": "消费金额"},
          {"value": "余额"},
          {"value": "电话"},
        ]
      },
      handleSelect(item) {
        // console.log(item)
      },
      //获取排序字段
      sayClick(event) {//获取被点击的对象
        var slput = event.target.getAttribute('tatol')
      },
      //发起请求
      orderList() {
        this.tableData=[];
        this.postG();
      },
      postG(){
        this.$axios.post(this.$api.vipManage.VipConsume,{
          page:this.currentPage,//当前页
          strip:this.pageSize,//每页显示的条数
          customer_totalconsumption_start:this.customer_totalconsumption_start,
          customer_totalconsumption_end:this.customer_totalconsumption_end,
          customer_courseTreatmentTotalExpense_start:this.customer_courseTreatmentTotalExpense_start,
          customer_courseTreatmentTotalExpense_end:this.customer_courseTreatmentTotalExpense_end,
          customer_commodityTotalExpense_start:this.customer_commodityTotalExpense_start,
          customer_commodityTotalExpense_end:this.customer_commodityTotalExpense_end,
          customer_balance_start:this.customer_balance_start,
          customer_balance_end:this.customer_balance_end,
          customer_times_start:this.customer_times_start,
          customer_times_end:this.customer_times_end
        },this.$config).then((res)=>{
          this.totalCount=res.data.totalItem;
          this.tableData = res.data.data.customer;
          console.log(res.data)
        })
      },
      //分页
      handleSizeChange(currentPage,pageSize) {//每页显示多少条
        var newList = [];
        newList = this.nlist.slice(pageSize*(currentPage-1),pageSize*currentPage)
        this.tableData = newList;
      },
      handleCurrentChange(currentPage) {//当前页

        this.currentPage = currentPage;
        this.tableData = [];
        this.postG()
      },

    },
    mounted() {
      this.restaurants = this.loadAll()
    },
    created() {
      this.postG();
    },
  }
</script>

<style scoped>
  .elPut {
    width: 100%;
  }

  .el-input {
    width: 20%;
    padding: 0;
  }

  .el_1 {
    float: left;
    width: 20%;
  }
  .el_3{
    float: right;
    right: 0;
    width: 20%;
  }
  .el_3>>>.el-input:nth-child(1),.el_1>>>.el-input:nth-child(1){
    padding-left: 20px;
    width: 60px;
  }
  .el_3>>>.el-input,.el_1>>>.el-input{
    width: 60px;
  }
.el-input >>>.el-input__inner{
    padding: 0;
    height:35px;
  }
  .left {
    float: left;
    /*position: absolute;*/
    /*left:150px;*/
    /*top:110px;*/
  }

  .el-button {
    margin-left: 10px !important;
    background: #67C23A;
    border-color: #67C23A;
  }

  .content_tatol {
    width: 100%;
    margin-top: 6px;
  }

  .el-autocomplete {
    width: 200px;
  }

  .ss_left, .ss_right {
    float: left;
  }

  .right {
    float: right;
    /*margin-right:46px;*/
  }
</style>
