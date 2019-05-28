<template>
  <div id="app">
    <section class="el-container is-vertical">
      <header class="el-header" style="height: 60px;">Header</header>
      <section class="el-container">
        <aside class="el-aside" style="width: 200px;">Aside</aside>
        <main class="el-main">Main</main>
      </section>
    </section>
  </div>
</template>

<script>
  import leftNav from './components/leftNav'
export default {
  name: 'App',
  components:{
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
