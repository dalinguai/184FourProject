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
            {"title": "菜单", "urlTo": "/"},
            {"title": "菜单", "urlTo": "/"},
            {"title": "菜单", "urlTo": "/"},
            {"title": "菜单", "urlTo": "/"},
            {"title": "菜单", "urlTo": "/"}
            ],//存储顶部菜单
          current:0,
          // isLogin:false
          isLogin:true
        }
      },
      methods: {
        clickLiFun(index) {
          this.current=index;
        },
      },
      beforeMount() {
        //向后台发起请求，获取会员事务显示的所有数据
        this.$axios.get(this.$api.navTitleApi.navTitleData).then((res) => {
          this.menuArr = res.data;
        }).catch((err) => {
          console.log(err);
        })
      }
    }
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  #navBody{
    width: 100%;
    background-color: #545c64;
    height: 53px;
    overflow: hidden;
  }
  #navBody ul{
    position: relative;
    margin: auto;
    padding: 0 50px;
  }
  #navBody ul li{
    list-style-type: none;
    float: left;
  }
  #navBody ul li a{
    color:#c1c1c1;
  }
  #navBody ul li:not(.logoImg){
    padding: 15px 25px;
  }

  #navBody ul li:not(.logoImg):hover{
    background-color: #434a50;
    border-bottom: 2px solid orange;
  }
  #navBody ul li:not(.logoImg):hover a{
    color: white;
  }
  #navBody ul .logoImg img{
    width: 100px;
    height: 53px;
  }
  a{
    text-decoration: none;
    border: none !important;
  }
  #navBody ul .active{
    background-color: #434a50 !important;
    color: white;
    padding: 14px 20px ;
    border-bottom: 2px solid orange;
  }
  #navBody ul .activeLi01{
    background-color: #434a50 !important;
    color: white;
  }

  #navBody .navRight{
    height: 53px;
    position: absolute;
    right: 50px;
    top:0;
    z-index: 40;
  }
  #navBody .navRight div{
    outline: none;
    padding: 0 10px;
    height: 30px;
    margin-top: 11px;
    float: left;
    line-height: 30px;
    color: white;
  }
  #navBody .navRight #signOut{
    cursor: pointer;
    border: 1px solid white;
    margin-left: 20px;
  }
  #navBody .navRight #signOut:hover{
    background-color: #434a50;
    border: 1px solid black;
  }
</style>
