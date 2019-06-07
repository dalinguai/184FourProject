<template>
  <div class="conDetails">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消费记录" name="first">
        <consumption></consumption>
      </el-tab-pane>
      <el-tab-pane label="疗程记录" name="second">
        <treatment></treatment>
      </el-tab-pane>
      <!--<el-tab-pane label="退货记录" name="third">-->
        <!--<returnRecord></returnRecord>-->
      <!--</el-tab-pane>-->
    </el-tabs>

  </div>
</template>
<script>
  import consumption from "./conDetailsConsumption";
  import treatment from "./conDetailsTreatment";
  export default {
    name: "VipList",
    components:{
      consumption,
      treatment,
    },
    data() {
      return {
        activeName: "first",
      }
    },
    methods: {
      backMain() {
        //返回用户页面 this.$router.
      },
      //tab的点击事件
      handleClick(tab, event) {
      //   console.log(tab, event);
      },
    },
    filters: {},
    computed: {},
    beforeMount() {
    }
  }


</script>

<style lang="less" scoped>
  .conDetails{
    padding: 20px;
  }
  .conTab {
    .conSelect {
      display: flex;
      justify-content: flex-start;
      margin: 10px 0 20px 0;
    }

    >div:nth-child(1) {
      margin-right: 20px;
    }
    .conPagination{
      margin: 20px 0 ;
    }
  }

</style>
