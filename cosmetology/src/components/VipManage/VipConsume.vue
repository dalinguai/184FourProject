<template>
  <div class="content_tatol">
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
      <el-select v-model="value" placeholder="请选择" >
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
    <el-radio :label="3">默认</el-radio>
    <el-radio :label="6">由低到高</el-radio>
    <el-radio :label="9">由高到底</el-radio>
  </el-radio-group><el-button type="primary" icon="el-icon-search" @click="orderList">快速排序</el-button></span>
    </div>
    <div class="content">
      <TbPublic/>
    </div>

  </div>


</template>

<script>
  import TbPublic from './TbPublic'
  export default {
    components:{
      TbPublic,
    },
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        radio: 3,
        options: [{
          value: '选项1',
          label: '消费金额',
          total:'customer_totalconsumption'
        }, {
          value: '选项2',
          label: '余额',
          total:'customer_name'
        }],
        value: '',

      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      search(){//获取input输入值
        console.log(this.state1);
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
        console.log(item)
      },
      //获取排序字段
      sayClick(event){//获取被点击的对象
        var slput = event.target.getAttribute('tatol')
      },
      //发起请求
      orderList(){
        sayClick();
      },

    },
    beforeCreate(){

    },
    mounted() {
      this.restaurants = this.loadAll()
    },
  }
</script>

<style scoped>
  .left{
    float:left;
    position: absolute;
    left:150px;
  }
  .el-button{
    margin-left: 16px !important;
    background: #67C23A;
    border-color: #67C23A;
  }
  .content_tatol {
    width: 100%;
    margin-top: 6px;
  }

  .el-autocomplete {
    width: 200px;
    margin-right: 10px;
  }

  .ss_left, .ss_right {
    float: left;
  }

  .right {
    float: right;
    margin-right:100px;
  }
</style>
