<template>
<div>
  <el-row class="tac" >
    <el-col :span="12" >
<!--      <h5>默认颜色</h5>-->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose" style="width:150px">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item-group>
            <router-link to="/basicImformation">
<!--            <router-link to="/imfor">-->
              <el-menu-item index="1-1">基本信息</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>考勤管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">考勤统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">工资管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  /*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
  /*  width: 200px;*/
  /*  min-height: 400px;*/
  /*}*/
  *{
    margin: 0;
    padding: 0;
  }
</style>
