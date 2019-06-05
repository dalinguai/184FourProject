
<template>
  <div id="leftNav">
    <div class="menu">
      <el-radio-group v-model="isCollapse">
        <!--<el-radio-button :label="false">展开</el-radio-button>-->
        <!--<el-radio-button :label="true">收起</el-radio-button>-->
      </el-radio-group>
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item  @click="collapseFun"><i class="iconfont icon-gou">menu</i></el-menu-item>
        <el-menu-item @click="jump(item.path)" v-for="(item,index) in menuList" :key="index" :index="(index+1).toString()">
          <i :class="[item.incon,item.iconfont]"></i>
          <span slot="title"> {{item.menu}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
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
          {menu:"员工信息",path:"/basicImformation",iconfont:'icon-iconyggl',incon:'iconfont'},
          {menu:"工资管理",path:"/staff",iconfont:'icon-baocun',incon:'iconfont'},
          {menu:"权限管理",path:"/role",iconfont:'icon-quanxianguanli',incon:'iconfont'}
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
    .content{
      width: calc(100% - 150px);
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
