<template>
    <div class="inner">
        <!--<sendMessNav/>-->
        <sendMessTable class="table"/>
    </div>
</template>
<script>
  import sendMessNav from "./sendMessNav";
  import sendMessTable from "./sendMessTable";
export default {
    name:"SMS",
    components:{
        sendMessNav,
        sendMessTable
    }
}
</script>
<style scoped>
.inner{
    /*background-color: rgb(245, 245, 245);*/
}
</style>
