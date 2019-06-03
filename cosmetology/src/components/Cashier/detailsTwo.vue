<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        :prop="item"
        :label="titleName[index]"
        width=""  v-for="(item,index) in Object.keys(tableTitle[0])" :key="index">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "detailsTwo",
      data(){
          return {
            titleName:["产品名称","实付金额","消费金额","数量","单价","折扣","赠品类型","疗程次数","赠送次数","是否本次消费","服务房间"],
            tableTitle:[{commodity_name:"产品名称",order_realityMoney:"实付金额",monetary:"消费金额",commodity_quantity:"数量"
              ,commodity_unitPrice:"单价",vip_discount:"折扣",giveaway:"赠品类型",frequency:"疗程次数",
              giveCount:"赠送次数",sure:"是否本次消费",service_room:"服务房间"}],
            tableData:[{commodity_name:"产品名称1",order_realityMoney:100,monetary:100,commodity_quantity:2,
              commodity_unitPrice:10,vip_discount:8.6,giveaway:"无",frequency:10,
              giveCount:10,sure:"否",service_room:"1"},
              {commodity_name:"产品名称2",order_realityMoney:100,monetary:100,commodity_quantity:2,
                commodity_unitPrice:10,vip_discount:8.6,giveaway:"无",frequency:10,
                giveCount:10,sure:"否",service_room:"1"}]
          }
      }
    }
</script>

<style scoped>

</style>
