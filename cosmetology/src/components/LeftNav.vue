<template>
    <div id="leftNav">
      <el-radio-group v-model="isCollapse" >
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu v-for="(item,index) in menuList" :key="index" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <router-link :to="item.path" tag="span">
        <el-menu-item  :index="(index+1)+''">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.menu}}</span>
        </el-menu-item></router-link>
      </el-menu>
    </div>
</template>

<script>
    export default {
      name: "LeftNav",
      data() {
        return {
          isCollapse: false,
          current:0,
          menuList:[
            {menu:"会员列表",path:"/VipList"},
            {menu:"会员事务",path:"/VipAffair"},
            {menu:"客户预约",path:"/CustomersBooking"},
            {menu:"会员级别设置",path:"/VipLevel"},
            {menu:"会员消费排行",path:"/VipConsume"},
            {menu:"短信发送平台",path:"/SMS"},
            {menu:"短信历史列表",path:"/SMSList"},
            {menu:"积分规则",path:"/Integral"},
          ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        changeIndex(index){
          this.current=index;
        }
      }
    }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  .el-menu--collapse{
    width: 52px;
  }
  .el-radio-group{
    position: absolute;
    top: 0;
    left: 0;
  }
  .el-menu{
    text-align: left;
  }
  .el-menu-item{
    padding: 0 14px!important;
  }
  .el-menu-item>i{
    margin-right: 9px;
  }
  .el-menu @{deep} .el-tooltip{
    padding:0 14px!important;
  }
  .active{
    color: #409eff;
  }
</style>
