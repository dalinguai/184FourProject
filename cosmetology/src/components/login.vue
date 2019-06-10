<template>
  <div>
    <div class="bgImg">
      <img src="../../static/images/Login_bg.jpg"/>
      <div class="content">
        <p>登录</p>
        <el-form>
          <p>账号</p>
          <el-input v-model="user_number" placeholder="请输入账号" type="text"/>
          <p>密码</p>
          <el-input v-model="user_password" placeholder="请输入密码" type="text" show-password/>
          <div class="rember">
            <el-checkbox v-model="checked">记住我</el-checkbox>
          </div>
        </el-form>
        <div class="btnLogin" @click="userLogin()">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import config from "../config";
  import qs from 'qs'
  export default {
    name: "login",
    data() {
      return {
        checked: false,
        user_number: '',
        user_password: '',
        list: [],
      }
    },
    methods: {
      userLogin() {
        var user_number = this.user_number;
        var user_password = this.user_password;
        if (user_number == '' || user_number == null) {
          this.$alert('请输入正确的用户名')
          return
        } else if (user_password == '' || user_password == null) {
          this.$alert('请输入正确的密码')
          return
        }
        this.$axios.post(this.$api.staffManage.loginUser,
          {"user_number": user_number, "user_password": user_password}
        ,this.$config)
          .then((res) => {
            console.log(res);
              this.list = res.data;
              if (this.list.returnCode == "200") {
                var username = this.list.data.user_name;
                console.log('chenggong');
                console.log(res);
                sessionStorage.setItem("xauthorization",res.data.token);
                var menuInfo = this.list.data.menuSet;
                var username = this.list.data.user_name;
                var data = {
                  data: {
                    menuInfo: menuInfo,
                    userInfo: {username: username},
                  },
                  returnCode: 200
                }
                var res = {};
                res.data = data;
                this.$store.dispatch('loginSuccess', res.data.data);
                this.$router.push("/cashier/right");   //成功后跳转到首页
              } else if(this.list.returnCode == "500"){
                console.log(res);
                this.$notify.error({
                  title: '错误',
                  message: '登陆失败！请检查用户名与密码'
                });
              }
            }
          ).catch(err => {
          console.log(err);
        });
      },
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

  .el-form .el-input {
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
