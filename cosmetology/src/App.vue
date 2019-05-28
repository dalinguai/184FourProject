<template>
  <div id="app">
  <container/>
  </div>
</template>

<script>

import container from "./components/container";
export default {
  name: 'App',
  components: {
    container
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
  color: #2c3e50;
}
</style>
