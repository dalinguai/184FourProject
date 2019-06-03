<!-- @Description: 人数统计 -->
 <!-- @author lxy -->
<!-- @date 2019/05/28 15:12:09  -->

<template>
    <div class="hel">
      <div>
        <span>用户总数</span><br/>
        <span class="shuzi">{{countFun()}}</span><br/>
        <span class="compare">比上周增加 <i>{{moreCountFun() | number}}%</i></span>
      </div>
      <div>
        <span>会员数量</span><br/>
        <span  class="shuzi">{{vipCountFun()}}</span><br/>
        <span class="compare">比上周增加 <i>{{moreVipFun() | number}}%</i></span>
      </div>

      <div>
        <span>大众会员数量</span><br/>
        <span  class="shuzi">{{NonVipCountFun()}}</span><br/>
        <span class="compare">比上周增加 <i>{{moreNVipCountFun() | number}}%</i></span>
      </div>
      <div>
        <span>总女性用户数量</span><br/>
        <span  class="shuzi">{{allLadyCountFun()}}</span><br/>
        <span class="compare">比上周增加 <i>{{moreLadyCountFun() | number}}%</i></span>
      </div>
      <div>
        <span>总消费</span><br/>
        <span  class="shuzi">￥{{allConsume[0].newAllC}}</span><br/>
        <span class="compare">比上月增加 <i>{{moreAllConsume() | number}}%</i></span>
      </div>
      <div>
        <span>总利润</span><br/>
        <span  class="shuzi">￥{{allProfit[0].newAll}}</span><br/>
        <span class="compare">比上月增加 <i>{{moreAllProfit() | number}}%</i></span>
        {{postData()}}
      </div>
      <!--<div>-->
        <!--&lt;!&ndash;{{getData()}}&ndash;&gt;-->
        <!--{{getData()}}-->
      <!--</div>-->
    </div>
</template>

<script>
  // import Axios from 'axios';
    export default {
        name: "peopleCount",
      data(){
          return{
            msg:'peopleCount',
            newVipArr:[
              //默认VIP:1为非会员
              //默认sex:1为女性
              {sex:1,vip:1},{sex:0,vip:2},{sex:0,vip:3},{sex:1,vip:4},{sex:1,vip:5},{sex:1,vip:1},{sex:1,vip:1},{sex:1,vip:1}
            ],
            oldVipArr:[
              {sex:1,vip:1},{sex:0,vip:2},{sex:0,vip:3},{sex:1,vip:4},{sex:1,vip:5}
            ],
            allConsume:[
              {newAllC:5500000},{oldAllC:5000000}
            ],//总消费
            allProfit:[
              {newAll:4500000},{oldAll:400000}
            ],//总利润
      }
      },
      methods:{
        countFun () {
            let personCount = 0 ;
            for ( let i = 0 ; i < this.newVipArr.length ; i ++ ) {
              personCount ++ ;
            }
            return personCount;
          },//总人数
        moreCountFun () {
          let now_old = 0 ;
            let nowCount = this.countFun();
            let oldCount = this.oldVipArr.length;
            now_old = (nowCount/oldCount*100-100);
            return now_old;
        },//新增人数
        vipCountFun () {
          let vipCount = 0 ;
          for ( let i = 0 ; i < this.newVipArr.length ; i ++ ) {
                if ( this.newVipArr[i].vip !== 1 ) {
                    vipCount ++ ;
                }
          }
          return vipCount;
        },//vip总数
        moreVipFun () {
          let newVipCount = this.vipCountFun();
          let oldVipCount = 0 ;
          for ( let i = 0 ; i < this.oldVipArr.length ; i ++ ) {
            if ( this.oldVipArr[i].vip !== 1 ) {
              oldVipCount ++ ;
            }
          }
          return (newVipCount/oldVipCount*100-100);
        },//新增VIP数
        /**
         * @return {number}
         */
        NonVipCountFun () {
          let newNonVipCount = 0 ;
          for ( let i = 0 ; i < this.newVipArr.length ; i ++ ) {
            if ( this.newVipArr[i].vip === 1 ) {
              newNonVipCount ++ ;
            }
          }
          return newNonVipCount;
        },//非会员总数
        moreNVipCountFun () {
          let oldNonVipCount = 0 ;
          for ( let i = 0 ; i < this.oldVipArr.length ; i ++ ) {
            if ( this.oldVipArr[i].vip === 1 ) {
              oldNonVipCount ++ ;
            }
          }
          return (this.NonVipCountFun()/oldNonVipCount*100-100);
        },//新增非会员总数
        allLadyCountFun () {
          let allLady = 0 ;
          for (let i = 0 ; i < this.newVipArr.length ; i ++ ) {
            if ( this.newVipArr[i].sex === 1 ) {
              allLady ++ ;
            }
          }
          return allLady ;
        },//总女性人数
        moreLadyCountFun  () {
          let oldLady = 0 ;
          for (let i = 0 ; i < this.oldVipArr.length ; i ++ ) {
            if ( this.oldVipArr[i].sex === 1 ) {
              oldLady ++ ;
            }
          }
          return (this.allLadyCountFun()/oldLady*100-100);
        },//新增女性用户
        moreAllProfit () {
          return (this.allProfit[0].newAll/this.allProfit[1].oldAll)
        },//利润对比
        moreAllConsume () {
          return (this.allConsume[0].newAllC/this.allConsume[1].oldAllC)
        },//总消费对比
        // getData (){
        //   let api = 'http://5cec9881b779120014b4974f.mockapi.io/demo/lxy';
        //http://5cec9881b779120014b4974f.mockapi.io/demo/lxy
        //   this.$axios.get(api).then(function (res) {
        //     console.log('hahah');
        //     console.log(res.data)
        //   }).catch(error=>{
        //     console.log('ERROR',error.message);
        //   });
        // },
        /**
         * @Description: post请求
         * @author lxy
         * @date 2019/05/31 19:22:03
        */

      //   postData(){
      //     let config = {
      //       headers : {
      //         'Content-Type':'application/x-www-form-urlencoded'
      //       },
      //     };
      //     this.$axios.post("http://172.17.1.203:8888/product",{
      //       firstName: 'Fred',
      //       lastName: 'Flintstone'
      //     },config).then(data=>{
      //       // this.tableData=data.data.data;
      //       console.log(data);
      //     })
      // }
      },
      filters: {
        number(value) {
          var toFixedNum = Number(value).toFixed(3);
          return toFixedNum.substring(0, toFixedNum.toString().length - 1);
        }
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
.hel{
  width: 100%;
  color: darkred;
  height:115px;
  background-color: #F7F7F7;
  position: relative;
  font: 500 13px/20px 宋体 Serif ;
  overflow: hidden;
}
  .hel>div{
    display: inline-block;
    width: 16%;
    /*height: 113px;*/
    overflow: hidden;
    vertical-align: center;
    text-align: center;
    text-overflow: ellipsis;
    color: #73879C;
    margin: 20px auto ;
    line-height: 1.55333em;
    border-right: 2px #ADB2B5 solid ;
  }
  .hel>div:nth-last-of-type(1){
    border-right: 0 saddlebrown solid ;
  }
  .shuzi{
    font: 500 30px/38px 宋体 Serif ;
  }
  .compare{
    font-size:13px ;
  }
  i{
    color: #1ABB9C;
  }
</style>
