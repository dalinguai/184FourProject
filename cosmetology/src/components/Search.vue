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
    props:["conditionAdd","viewName","apiAll","apiSearch","pageNum"],
    data(){
      return {
        state: '',
        timeout: null,
      }
    },
    methods:{
      searchFun() {
        if(this.state==""){
          this.$axios.post(this.$api.vipManage.vipListPage,{pageNum:this.pageNum,currentPage:1},this.$config).then((res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].customer_sex = 0 ? "男" : "女";
              res.data.data[i].customer_LastTime=this.$parent.getLocalTime(res.data.data[i].customer_LastTime)
            }
            this.$emit("listen",res.data.data);
            this.$refs.input.activated = false;//关闭下拉
            this.$refs.input.$el.querySelector('input').blur()//失去焦点
          }).catch((err) => {
            console.log(err);
          })
        }else {
          this.$axios.post(this.apiSearch,{customer_name: this.state},this.$config).then((res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].customer_sex = 0 ? "男" : "女";
              res.data.data[i].customer_LastTime=this.$parent.getLocalTime(res.data.data[i].customer_LastTime)
            }
            this.$emit("listen",res.data.data);
            this.$refs.input.activated = false;//关闭下拉
            this.$refs.input.$el.querySelector('input').blur()//失去焦点
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      querySearchAsync(queryString, cb) {
        this.$axios.post(this.apiAll).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].value = res.data.data[i][this.viewName];
            res.data.data[i].customer_sex = 0 ? "男" : "女";
            res.data.data[i].customer_LastTime=this.$parent.getLocalTime(res.data.data[i].customer_LastTime)
          }
          let restaurants = res.data.data;
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
        console.log(item);
        this.$emit("listen",[item]);
        },
    }
  }
</script>

<style scoped>

</style>
