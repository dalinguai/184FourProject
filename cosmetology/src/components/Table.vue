<template>
  <div>
    <el-table :data="tableList" stripe border style="width: 100%">
      <slot name="headerSlot"></slot>
      <el-table-column v-for="(item,index) in tableHader" :key="index" :prop="item.prop" :label="item.label"
                       :width="item.width" align="center">
      </el-table-column>
      <slot name="footerSlot"></slot>
    </el-table>
  </div>
</template>

<script>
  import Pagination from "./Pagination"
  export default {
    name: "Table",
    components:{
      Pagination
    },
    props: ["tableHader", "tableList"],
    data() {
      return {
        currentPage: 1,
        pageSize:[5, 6, 7, 8],
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style scoped>

</style>
