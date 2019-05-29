<template>
  <nav id="navBody">
      <ul id="navBodyUL">
        <li class="logoImg" @click="clickLiFun(0)" :class="{ activeLi01:0==0}"><router-link :to="menuArr[0].urlTo"><img src="/static/images/logo.jpg"/></router-link></li>
        <li v-for="(item,index) in menuArr" @click="clickLiFun(index)" :class="{ active:index==current}">
          <router-link :to="item.urlTo" :class="{ active:index==current}">{{item.title}}</router-link>
        </li>
      </ul>
    <div class="navRight">
      <div id="isLogin" v-if="isLogin">张三，你好</div>
      <div id="signOut" v-if="isLogin">退出</div>
    </div>
    <div>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "NavTop",
      data(){
        return {
          menuArr: [
              {"title":"前台收银","urlTo": "/Cashier"},
              {"title":"会员管理","urlTo": "/leftNav"},
              {"title":"员工管理","urlTo": "/"},
              {"title":"进销存","urlTo": "/vipMg"},
              {"title":"统计表","urlTo": "/"}
            ],
          current:0,
          // isLogin:false
          isLogin:true
        }
      },
      methods: {
        clickLiFun(index) {
          this.current=index;
        },
      }
    }
</script>

<style scoped>

</style>
