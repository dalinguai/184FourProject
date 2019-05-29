<template>
  <div>
    <el-table
      :data="vipList"
      border
      style="width: 100%">
      <el-table-column v-for="(item,index) in tableHader" :key="index"
        :prop="item.prop"
        :label="item.label"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "VipList",
      data() {
        return {
          tableHader:[
            {prop:"name",label:"姓名"},
            {prop:"sex",label:"性别"},
            {prop:"tel",label:"手机号"},
            {prop:"balance",label:"卡内余额"},
            {prop:"integer",label:"积分"},
            {prop:"vipLevel",label:"会员级别"},
            {prop:"lastVisit",label:"上次访问"}
          ],
          vipList: []
        }
      },
    beforeMount() {
      this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/VipList").then((res)=>{
        this.vipList=res.data
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
</script>

<style scoped>

</style>
