<template>
  <div id="app">
    <NavTop></NavTop>
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  import NavTop from './components/NavTop'
export default {
  name: 'App',
  components:{
    NavTop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(253,253,253);
  width: 100%;
  height: 1605px;
  padding-top: 51px;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*padding: 10px 120px 0 120px;*/
}
</style>
