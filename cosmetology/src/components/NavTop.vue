<template>
  <nav id="navBody">
    <ul id="navBodyUL">
      <li class="logoImg" @click="clickLiFun(0)" :class="{ activeLi01:0==0}">
        <router-link :to="getMenuInfo[0].menu_url"><img src="/static/images/logo.png"/></router-link>
      </li>
      <li v-for="(item,index) in getMenuInfo" @click="clickLiFun(index,item.menu_url)" :class="{ active:index==current}"
          @open="handleOpen" @close="handleClose">
        {{item.menu_name}}
      </li>
    </ul>
    <div class="navRight">
      <div id="isLogin" v-if="isLogin">张三，你好</div>
      <div id="signOut" v-if="isLogin" @click="exit">退出</div>
    </div>
    <div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "NavTop",
    data() {
      return {
        // getMenuInfo: [
        //   {"title": "菜单", "urlTo": "/"},
        //   {"title": "菜单", "urlTo": "/"},
        //   {"title": "菜单", "urlTo": "/"},
        //   {"title": "菜单", "urlTo": "/"},
        //   {"title": "菜单", "urlTo": "/"}
        // ],//存储顶部菜单
        current: 0,
        // isLogin:false
        isLogin: true
      }
    },
    mounted() {
      // console.log("aa")
      // console.log(mapGetters['getMenuInfo'])
      // this.menulist = this.getMenuInfo;

    },
    created() {
      // console.log(this.$store.getters.getDisplay)
      // console.log(getMenuInfo);
    },
    computed: {
      // ...mapGetters(['getMenuInfo'])
      getMenuInfo(){
        console.log(this.$store.getters.getMenuInfo);
        return this.$store.getters.getMenuInfo;

      }

    },

    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //
      exit() {
        // this.$store.state.displayFlag=false;
        this.$router.push("/login");
        sessionStorage.clear();
      },
      clickLiFun(index, path) {
        this.current = index;
        this.$router.push(path)
      },
    },
    // beforeMount() {
    //   this.$axios.get(this.$api.navTitleApi.navTitleData).then((res) => {
    //   //   this.$axios.post("http://172.17.1.235:8080/user/login").then((res)=> {
    //       this.menuArr = res.data;
    //       console.log(res);
    //     }).catch((err) => {
    //     console.log(err);
    //   })
    // }      //向后台发起请求，获取会员事务显示的所有数据

  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  #navBody {
    width: 100%;
    background-color: #D194D7;
    height: 53px;
    overflow: hidden;
    color: white;
  }

  #navBody ul {
    position: relative;
    margin: auto;
    padding: 0 50px;
  }

  #navBody ul li {
    list-style-type: none;
    float: left;
    cursor: pointer;
  }

  #navBody ul li a {
    color: #c1c1c1;
  }

  #navBody ul li:not(.logoImg) {
    padding: 15px 25px;
  }

  #navBody ul li:not(.logoImg):hover {
    background-color: #fafafa;
    border-bottom: 2px solid white;
    color: #D194D7;
  }

  #navBody ul li:not(.logoImg):hover a {
    color: white;
  }

  #navBody ul .logoImg img {
    /*width: 100px;*/
    /*height: 53px;*/
  }

  a {
    text-decoration: none;
    border: none !important;
  }

  #navBody ul .active {
    /*background-color: #434a50 !important;*/
    color: #fafafa;
    padding: 14px 20px;
    border-bottom: 2px solid white;
  }

  #navBody ul .activeLi01 {
    /*background-color: #434a50 !important;*/
    color: white;
  }

  #navBody .navRight {
    height: 53px;
    position: absolute;
    right: 50px;
    top: 0;
    z-index: 40;
  }

  #navBody .navRight div {
    outline: none;
    padding: 0 10px;
    height: 30px;
    margin-top: 11px;
    float: left;
    line-height: 30px;
    color: white;
  }

  #navBody .navRight #signOut {
    cursor: pointer;
    border: 1px solid white;
    margin-left: 20px;
  }

  #navBody .navRight #signOut:hover {
    background-color: #434a50;
    border: 1px solid black;
  }
</style>
