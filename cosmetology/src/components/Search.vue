<template>
  <div>
    <!--远程搜索-->
    <el-autocomplete prefix-icon="el-icon-search" ref="input" v-model="state"
                     @keyup.enter.native="searchFun" clearable :fetch-suggestions="querySearchAsync"
                     placeholder="请输入姓名或手机号" @select="handleSelect">
    </el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: "Search",
    props:["conditionAdd","viewName"],
    data(){
      return {
        state: '',
        timeout: null,
      }
    },
    methods:{
      searchFun() {
        this.$axios.get(this.$api.vipManage.vipList, {params: {value: this.state}}).then((res) => {
          this.$emit("listen",res.data);
          this.$refs.input.activated = false;//关闭下拉
          this.$refs.input.$el.querySelector('input').blur()//失去焦点
        }).catch((err) => {
          console.log(err);
        })
      },
      querySearchAsync(queryString, cb) {
        this.$axios.get(this.$api.vipManage.vipList).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].value = res.data[i][this.viewName]
          }
          let restaurants = res.data;
          let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      createStateFilter(queryString) {
        return (state) => {
          if((state[this.viewName].toLowerCase().indexOf(queryString.toLowerCase()) != -1)){
            return (state[this.viewName].toLowerCase().indexOf(queryString.toLowerCase()) != -1)
          }else{
            if(state[this.conditionAdd]){
              return (state[this.conditionAdd].toLowerCase().indexOf(queryString.toLowerCase()) != -1);
            }
          }
        };
      },
      handleSelect(item) {
        this.$emit("listen",[item]);
        },
    }
  }
</script>

<style scoped>

</style>
