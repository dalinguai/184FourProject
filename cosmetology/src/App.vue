<template>
  <div id="app">
    <!--    <div>-->
    <!--      <h2>这是登陆后的router</h2>-->
    <!--      <NavTop v-if="playShow ===true"></NavTop>-->
    <!--    <NavTop></NavTop>-->
    <router-view></router-view>
    <!--    </div>-->
    <!--    <NavTop></NavTop>-->
    <!--    <div v-else>-->
    <!--      <h2>这是登陆时的router</h2>-->
    <!--      <router-view></router-view>-->
    <!--    </div>-->
  </div>


</template>
<script>
  // import NavTop from './components/NavTop'
  // import login from './components/login'
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    data(){
      return {
        playShow:false,
      }
    },
    components: {
      // NavTop,
      // login,x
    },
    created(){
      // window.sessionStorage.setItem("playShow",false)
      // this.playShow = sessionStorage.getItem("playShow");
      // console.log("aa"+this.playShow);
      // this.$router.push("/cashier/right")
      // console.log(this.$store.getters.getDisplay)
      // console.log(this.$store.getters.getDisplay);
    },
    computed:{
      // ...mapGetters(['getDisplay'])


    },
    watch:{

    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(253,253,253);
    width: 100%;
    height: 657px;
  }
</style>
