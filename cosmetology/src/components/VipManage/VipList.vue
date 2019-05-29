<template>
  <div>
    <el-menu default-active="0" class="el-menu-demo" mode="horizontal">
      <el-menu-item :key="index" @click="jump(item.path)" v-for="(item,index) in menuList" :index="index.toString()">
        {{item.menu}}
      </el-menu-item>
      <el-autocomplete
        v-model="state"
        @keyup.enter.native="searchFun"
        clearable
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入姓名或手机号"
        @select="handleSelect"
      ></el-autocomplete>
    </el-menu>
    <el-table
      :data="vipList"
      border
      style="width: 100%">
      <el-table-column fixed label="序号" width="55" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1}} </span>
        </template>
      </el-table-column>
      <el-table-column v-for="(item,index) in tableHader" :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :width="item.width"
                       align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="vipDetail(scope.row.customer_id)">查看详情</el-button>
          <el-button type="text" size="small" @click="addLiaochen(scope.row.customer_id)">补增疗程</el-button> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "VipList",
    data() {
      return {
        tableHader: [
          {prop: "customer_name", label: "姓名", width: "100"},
          {prop: "customer_sex", label: "性别", width: "50"},
          {prop: "customer_phone", label: "手机号", width: "120"},
          {prop: "customer_balance", label: "卡内余额", width: "100"},
          {prop: "customer_vipIntegration", label: "积分", width: "100"},
          {prop: "vip_name", label: "会员级别", width: "150"},
          {prop: "customer_lastTime", label: "上次到店", width: "200"}
        ],
        vipList: [],
        menuList: [
          {menu: "会员列表", path: "/VipList"},
          {menu: "散客列表", path: "/VipList"},
          {menu: "新增会员", path: "/VipList"},
        ],
        state: '',
        timeout: null,
      }
    },
    created() {
      this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/VipList").then((res) => {
        this.vipList = res.data;
      }).catch((err) => {
        console.log(err);
      })
    },
    methods: {
      jump(path) {
        this.$router.push(path)
      },
      vipDetail(id) {
        console.log(id);
      },
      addLiaochen(id) {
        console.log(id);
      },
      querySearchAsync(queryString, cb) {
        this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/VipList").then((res) => {
          for(let i=0;i<res.data.length;i++){
            res.data[i].value=res.data[i].customer_name
          }
          let restaurants=res.data;
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
          return (state.customer_name.toLowerCase().indexOf(queryString.toLowerCase()) != -1)||
            (state.customer_phone.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      handleSelect(item) {
        this.vipList=[item];
      }
    },
    searchFun(){
      this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/VipList",{params:{value:this.state}}).then((res) => {
        this.state="";
        this.vipList = res.data;
      }).catch((err) => {
        console.log(err);
      })
    }
  };
</script>

<style scoped>
  .el-autocomplete {
    float: left;
    margin: 10px 0 0 30px;
  }
</style>
