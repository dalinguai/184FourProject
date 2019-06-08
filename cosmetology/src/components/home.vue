<template>
  <div id="home">
    <NavTop></NavTop>
    <router-view></router-view>
  </div>
</template>
<script>
import NavTop from './NavTop'
// import login from './components/login'
// import {mapGetters} from 'vuex'
export default {
  name: 'home',
  data(){
    return {
      // playShow:false,
    }
  },
  components: {
    NavTop,
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

</style>
