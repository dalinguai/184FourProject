<template>
      <div class="grid-content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>-->
        <!--<el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>-->
        <el-breadcrumb-item><span>短信发送平台</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
</template>

<script>
    export default {
        name: "sendMessNav"
    }
</script>

<style scoped>
.grid-content{
  height: 50px;
}
span{
  margin-top: 15px;
  font-size: 15px;
  color: gray;
}
span:nth-child(1){
  margin-left: 20px;
}
</style>
