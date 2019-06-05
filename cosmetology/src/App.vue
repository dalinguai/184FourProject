<template>
  <div id="app">
    <NavTop/>
    <router-view></router-view>
  </div>
</template>
<script>
import NavTop from './components/NavTop'
export default {
  name: 'App',
  components: {
    NavTop
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
