<template>
  <div>
    <div class="bgImg">
      <img src="../../static/images/Login_bg.jpg"/>
      <div class="content">
        <p>登录</p>
        <el-form>
          <p>账号</p>
          <input  placeholder="请输入账号" type="text"/>
          <p>密码</p>
          <input placeholder="请输入密码" type="text"/>
          <div class="rember">
            <el-checkbox v-model="checked">记住我</el-checkbox>

          </div>
        </el-form>
        <div class="btnLogin">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        checked: true,
      }
    },
    created(){
      
    },
    methods:{

    }
  }
</script>

<style scoped>
  .btnLogin {
    height: 35px;
    line-height: 35px;
    width: 300px;
    color: white;
    background-color: rgb(0, 183, 217);
    border-radius: 5px;
    margin: 20px 0 0 50px;
    text-align: center;
    letter-spacing: 5px;
  }

  .btnLogin:hover {
    background-color: rgb(0, 154, 179);
  }

  .content {
    width: 400px;
    height: 450px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
    /*text-align: center;*/
    background-color: white;
    /*background-color: rgba(255,255,255,.8);*/
  }

  .el-form {
    /*border: 1px solid red;*/
  }

  .el-form input {
    margin: 10px 0 0 50px;
    width: 300px;
    height: 35px;
    outline: none;
    border: 1px solid rgb(222, 225, 230);
    border-radius: 5px;
  }

  .rember {
    margin: 30px 0 0 50px;
  }

  .content p:nth-of-type(1) {
    font-size: 26px;
    margin: 50px 0 0 170px;
    letter-spacing: 10px;
  }

  .el-form p:nth-of-type(1) {
    font-size: 16px;
    margin: 20px 0 0 50px;
    letter-spacing: 5px;
  }

  .el-form p:nth-of-type(2) {
    font-size: 16px;
    margin: 20px 0 0 50px;
    letter-spacing: 5px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .bgImg {
    width: 100%;
    height: 650px;
    overflow: hidden;
    position: relative;
  }

  img {
    width: 100%;
    /*height: 600px;*/
  }
</style>
