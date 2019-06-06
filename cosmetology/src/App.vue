<template>
  <div id="app">
    <div v-if="display==='false'">
      <NavTop/>
      <router-view></router-view>
    </div>
    <div v-else>
      <login></login>
      <router-view></router-view>
    </div>
  </div>


</template>
<script>
import NavTop from './components/NavTop'
import login from './components/login'
export default {
  name: 'App',
  data(){
    return {
      display: "false",
    }
  },
  components: {
    NavTop,
    login,
  },
  created(){
    this.$router.push('/cashier/right')
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
