<template>
  <el-card class="box-card" :class="{visibility:visFlag}" v-loading="loading" element-loading-text="数据加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="#fff">
    <div class="clearfix el-header">
      <span class="vipName" v-text="" v-cloak>{{vipInfo.customer_name}}</span>
      <div class="vipBalance">
        <ul class="clearfix">
          <li><span>卡内余额:</span><span v-cloak>{{vipInfo.customer_balance}}</span></li>
          <li><span>赠送余额:</span><span v-cloak>{{vipInfo.customer_balance}}</span></li>
          <li><span>欠款:</span><span v-cloak>{{vipInfo.customer_balance}}</span></li>
        </ul>
      </div>
    </div>
    <div class="vipInfTab">
      <table border="1" cellspacing="0">
        <tr>
          <td>会员级别:</td>
          <td v-cloak>{{vipInfo.vip_name}}</td>
          <td>累积消费:</td>
          <td v-cloak>{{vipInfo.customer_commodityTotalExpense + vipInfo.customer_courseTreatmentTotalExpense}}</td>
          <td>折扣:</td>
          <td v-cloak>{{vipInfo.vip_discount}}</td>
        </tr>
        <tr>
          <td>手机号码:</td>
          <td v-cloak>{{vipInfo.customer_phone}}</td>
          <td>来店次数:</td>
          <td v-cloak>{{vipInfo.customer_times}}</td>
          <td>总积分:</td>
          <td v-cloak>{{vipInfo.customer_vipIntegration}}</td>
        </tr>
        <tr>
          <td>会员卡号:</td>
          <td v-cloak>{{vipInfo.vip_id}}</td>
          <td>上次来访:</td>
          <td colspan="3" v-cloak>{{vipInfo.customer_lastTime}}</td>
        </tr>
        <tr>
          <td>备注:</td>
          <td colspan="5" class="remark" v-cloak>{{vipInfo.customer_remark}}</td>
        </tr>
      </table>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "VipInfo",
    data() {
      return {
        vipInfo: {},
        loading: true,
        visFlag: true,
      }
    },
    methods: {},
    filters: {
      dateFormat(date) {
        let t = new Date(date);
        let y = t.getFullYear();
        let m = t.getMonth() + 1;
        let d = t.getDate();
        let h = t.getHours();
        let min = t.getMinutes();
        let s = t.getSeconds();
        return `${y}-${m}-${d}  ${h}:${min}:${s}`;
      }
    },
    beforeMount() {
      this.$axios.get("http://5cee59d21c2baf00142cbdf5.mockapi.io/odrList").then((res) => {
        this.vipInfo = res.data[0];
        console.log(this.vipInfo);
        window.setTimeout(() => {
          this.loading = false;
          this.visFlag = true;
        }, 800);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
.el-header{
  margin-bottom: 10px;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 790px;
  }
  .vipName {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    background: #fff;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
    text-align: left;
    border-radius: 4px;
    float: left;
    font-size: 18px;
    font-weight: 700;
    border: 1px solid #f5f5f5;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .vipBalance {
    float: right;
    border: 1px solid #f5f5f5;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .vipBalance > ul > li {
    float: left;
    list-style: none;
    font-size: 0;
    height: 40px;
  }
  .vipBalance > ul > li >span{
    font-size: 14px;
    display: inline-block;
    padding: 0 15px;
  }
  /*.vipBalance > ul > li:nth-child(1){*/
    /*margin-left: 0;*/
  /*}*/
  /*.vipBalance > ul > li:last-child{*/
    /*margin-right: 0;*/
  /*}*/
  .vipBalance > ul > li > span:nth-child(1) {
    font-weight: bold;
    display: inline-block;
    background: #f5f5f5;
  }

  .vipBalance > ul {
    overflow: hidden;
    vertical-align: middle;
    line-height: 40px;
  }

  .vipInfTab > table > tr > td {
    width: calc(100% / 6);
    padding: 5px 0;
  }

  .vipInfTab {
    width: 100%;
    font-size: 14px;
    border-spacing: 0 !important;
    /*border: 1px solid #EBEEF5 !important;*/
  }

  .vipInfTab > table {
    /*border-color: grey;*/
    color: #606266  ;
    border: 1px solid #EBEEF5;
    box-sizing: border-box;

  }

  .vipInfTab > table > tr > td:nth-child(2n-1) {
    color: #909399;
    font-weight: 700;
  }

  .vipInfTab > table > tr > td:nth-child(2n) {
    padding: 10px 15px;
  }

  /*.vipInfTab > table > tr > td:nth-child(2n-1)::after {*/
  /*display: inline;*/
  /*content: ':';*/
  /*margin-left: 5px;*/
  /*}*/

  .remark {
    font-size: 12px;
  }
</style>
