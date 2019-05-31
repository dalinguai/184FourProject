<template>
    <div class="body">
      <div class="content">
        <Left></Left>
        <Right></Right>
      </div>
    </div>
</template>

<script>
  import Left from './Cashier_left'
  import Right from './Cashier_right'
    export default {
        name: "Cashier",
      components:{
          Left,
        Right,
      }
    }
</script>

<style scoped>
  .body{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
  }
  .content{
    width: 1310px;
    height: 720px;
    /*border: 2px solid red;*/
    margin-top: 10px;
  }
</style>
