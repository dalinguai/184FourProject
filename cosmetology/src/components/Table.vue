<template>
  <el-table :data="tableList" stripe border style="width: 100%">
    <slot name="headerSlot"> </slot>
    <el-table-column v-for="(item,index) in tableHader" :key="index" :prop="item.prop" :label="item.label"
                     :width="item.width" align="center">
    </el-table-column>
    <slot name="footerSlot"> </slot>
  </el-table>
</template>

<script>
  export default {
    name: "Table",
    props:["tableHader","tableList"]
  }
</script>

<style scoped>

</style>
