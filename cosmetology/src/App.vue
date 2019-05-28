<template>
  <div id="app">
  <container/>
  </div>
</template>

<script>

import container from "./components/container";
import NavTop from './components/NavTop'
export default {
  name: 'App',
  components: {
    container,
    NavTop
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
  text-align: center;
  background-color: rgb(253,253,253);
  width: 100%;
  height: 1605px;
  padding-top: 51px;
}
</style>
