<template>
  <el-card class="box-card" :class="{visibility:visFlag}"
           v-loading="loading"
           :element-loading-text="loadingText[loadingState].text"
           :element-loading-spinner="loadingText[loadingState].icon"
           element-loading-background="#fff">
    <div class="clearfix el-header">
      <span class="vipName" v-text="" v-cloak>{{vipInfo.customer_name}}</span>
      <div class="vipBalance">
        <ul class="clearfix">
          <li><span>卡内余额:</span><span v-cloak>{{vipInfo.customer_balance | toFix}}</span></li>
        </ul>
      </div>
    </div>
    <div class="vipInfTab" :class="[{vipInfoFlag:vipInfoFlag}]">
      <table border="1" cellspacing="0">
        <tr>
          <td>会员卡号:</td>
          <td v-cloak>{{vipInfo.vip_id}}</td>
          <td>累积消费:</td>
          <td v-cloak>{{vipInfo.customer_commodityTotalExpense + vipInfo.customer_courseTreatmentTotalExpense | toFix}}</td>
          <td>疗程消费:</td>
          <td v-cloak>{{vipInfo.customer_courseTreatmentTotalExpense | toFix}}</td>
        </tr>
        <tr>
          <td>商品消费:</td>
          <td v-cloak>{{vipInfo.customer_commodityTotalExpense | toFix}}</td>
          <td>来店次数:</td>
          <td v-cloak>{{vipInfo.customer_times}}</td>
          <td>总积分:</td>
          <td v-cloak>{{vipInfo.customer_vipIntegration}}</td>
        </tr>
        <tr>
          <td>手机号码:</td>
          <td v-cloak>{{vipInfo.customer_phone}}</td>
          <td>上次来访:</td>
          <td colspan="3" v-cloak>{{vipInfo.customer_lastTime | dateFormat}}</td>
        </tr>
        <tr>
          <td>备注:</td>
          <td colspan="5" class="remark" v-cloak>{{vipInfo.customer_remark | getMark}}</td>
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
        vipInfo: {
          customer_id: null,
          customer_number: null,
          customer_name:null,
          customer_phone: null,
          customer_birthday:null,
          customer_address: null,
          customer_idCard:null,
          customer_totalAmount:null,
          customer_balance: null,
          customer_times:null,
          customer_courseTreatmentTotalExpense: null,
          customer_commodityTotalExpense:null,
          customer_lastTime: null,
          vip_id: null,
          customer_firstVip: null,
          customer_vipIntegration:null,
          customer_remark: null,
          customer_status:null,
          customer_dataStatus: null
        },
        loading: true,
        visFlag: true,
        vipInfoFlag: false,
        loadingState:0,
        loadingText:[{
          text:"暂无会员数据",
          icon:"el-icon-warning"
        },{
          text:"等待数据加载",
          icon:"el-icon-loading"
        }]
      }
    },
    methods: {
    },
    filters: {
      toFix(data){
        return parseFloat(data).toFixed(2);
      },
      getMark(data){
        return data==null?"无":data;
      },
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
    computed: {
      myState() {
        return this.$store.state.vipInfo;
      },
    },
    watch: {
      //监听用户刷卡行为
      myState() {
        if (this.$store.state.vipInfo != null) {
          this.vipInfo = this.$store.state.vipInfo;
          this.loading = false;
        }else {
          this.vipInfo = null;
          this.loading = true;
        }
      }
    },
    beforeMount() {
      //页面初始化数据
      if (this.$store.state.vipInfo != null) {
        this.vipInfo = this.$store.state.vipInfo;
        this.loading = false;
      } else {
        //如果没有VIP 的手机号   就采用空白渲染
      }
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }

  .el-header {
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

  .vipBalance > ul > li > span {
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
    padding: 0 0 0 20px;

    /*text-align: center;*/
  }

  .vipInfTab {
    width: 100%;
    font-size: 14px;
    border-spacing: 0 !important;
    /*border: 1px solid #EBEEF5 !important;*/
  }

  .vipInfTab > table {
    /*border-color: grey;*/
    color: #606266;
    border: 1px solid #EBEEF5;
    box-sizing: border-box;

  }

  .vipInfTab > table > tr > td:nth-child(2n-1) {
    color: #909399;
    font-weight: 700;
    letter-spacing: 3px;
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
