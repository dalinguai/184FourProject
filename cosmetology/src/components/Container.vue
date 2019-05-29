<template>
  <el-container>
    <NavTop/>
    <router-view></router-view>
  </el-container>
</template>
<script>
  import leftNav from "./leftNav";
  import NavTop from './NavTop'
  export default {
    name: "Container",
    components: {
      leftNav,
      NavTop
    }
  }
</script>

<style lang="less" scoped>


  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    width: auto !important;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

