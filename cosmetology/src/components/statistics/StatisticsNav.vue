
<template>
  <div id="leftNav">
    <!--左侧导航-->
    <!--<div class="el-icon-s-fold" @click="collapseFun"></div>-->
    <div :class="isCollapse?'menu-min':'menu'">
      <el-radio-group v-model="isCollapse">
        <!--<el-radio-button :label="false">展开</el-radio-button>-->
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
    name: "staffManaMav",
    data() {
      return {
        isCollapse: false,
        menuList:[
          {menu:"人数统计",path:"/indexCount",iconfont:'icon-renshutongji',incon:'iconfont'},
          {menu:"产品销售",path:"/Statistics/Product",iconfont:'icon-navicon-dpxstj',incon:'iconfont'},
          {menu:"产品利润",path:"/Statistics/Profit",iconfont:'icon-045zhuanqulirun',incon:'iconfont'},
        ]
      };
    },
    updated(){

    },
    methods: {
      collapseFun(){
        console.log('lo');
        this.isCollapse = !this.isCollapse
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        console.log(item.menu)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      jump(path){
        this.$router.push(path)
      }
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
      width: calc(100% - 53px);
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
