<template>
    <div id="leftNav">
      <!--左侧导航-->
      <div :class="isCollapse?'menu-min':'menu'">
      <el-radio-group v-model="isCollapse">
        <!--<el-radio-button :label="!isCollapse">展开</el-radio-button>-->
        <!--<el-radio-button :label="true">收起</el-radio-button>-->
      </el-radio-group>
      <el-menu  :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
        <el-menu-item  @click="collapseFun"><i class="iconfont icon-gou">menu</i></el-menu-item>
        <el-menu-item  v-for="(item,index) in menuList" :key="index" :index="item.path">
          <i :class="[item.incon,item.iconfont]"></i>
          <span slot="title"> {{item.menu}}</span>
        </el-menu-item>
      </el-menu>
      </div>
      <!--右侧内容-->
      <div :class="isCollapse?'content':'content-min'">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
      name: "LeftNav",
      data() {
        return {
          isCollapse: false,
          //点击查看详细
          isChange:false,
          menuList:[
            {menu:"会员列表",path:"/VipList",iconfont:'icon-list-2-copy',incon:'iconfont'},
            {menu:"会员事务",path:"/VipAffair",iconfont:"icon-guanli",incon:'iconfont'},
            {menu:"客户预约",path:"/CustomersBooking",iconfont:"icon-yuyue1",incon:'iconfont'},
            {menu:"会员级别设置",path:"/VipLevel",iconfont:"icon-xingjibie",incon:'iconfont'},
            {menu:"会员消费排行",path:"/VipConsume",iconfont:"icon-paihang1",incon:'iconfont'},
            {menu:"短信发送平台",path:"/SMS",iconfont:"icon-duanxinpingtai",incon:'iconfont'},
            {menu:"短信历史列表",path:"/SMSList",iconfont:"icon-list-2-copy",incon:'iconfont'},
            {menu:"积分规则",path:"/Integral",iconfont:"icon-jifen",incon:'iconfont'},
          ]
        };
      },
      methods: {
        collapseFun(){
          console.log('lo');
          this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        changePath () {
          let newPath = this.$store.state.changePath;
          if ( newPath ) {

          }
          console.log(newPath);
        },
      }
    }
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  #leftNav{
    .menu{
      width: 150px;
    }
    .menu-min{
      width: 52px;
    }
    .content-min{
      width: calc(100% - 150px);
    }
    .content{
      width: calc(100% - 52px);
    }
    >div{
      float: left;
    }
  }
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
</style>
