<template>
  <div>
    <!--添加-->
    <el-button size="small" @click="dialogFormVisible = true" v-if="isShow" class="addBtn" type="success">新增会员
    </el-button>
    <!-- 搜索-->
    <Search v-if="isShow"
            class="search"
            :api-search="$api.vipManage.searchVip"
            :api-all="$api.vipManage.vipListAll"
            @listen="searchList"
            :pageNum="pageNum"
            view-name="customer_Name"
            condition-add="customer_Phone"/>
    <!--tabs-->
    <el-tabs @tab-click="handleClick" type="border-card">
      <!--会员列表-->
      <el-tab-pane label="会员列表">
        <Table :tableHader="vipHader" :tableList="customerList">
          <!--头部插槽-->
          <el-table-column slot="headerSlot" fixed label="序号" width="55" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1+pageNum*(currentPage-1)}} </span>
            </template>
          </el-table-column>
          <!--尾部插槽-->
          <el-table-column slot="footerSlot" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="vipDetail(scope.row.customer_Id)">会员详情</el-button>
              <el-button type="text" size="small" @click="VipConsumptionDetails(scope.row.customer_Id)">消费详情</el-button>
            </template>
          </el-table-column>
        </Table>
        <!--弹出层-->
        <!--新增-->
        <el-dialog v-if="dialogFormVisible" :before-close='closeDialog' title="新增会员" :visible.sync="dialogFormVisible">
          <el-form ref="paper" :model="addInfo" status-icon :rules="rules">
            <el-form-item label="姓名" prop="customer_name" :label-width="formLabelWidth">
              <el-input v-model="addInfo.customer_name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio v-model="addInfo.customer_sex" label="0">男</el-radio>
              <el-radio v-model="addInfo.customer_sex" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="生日" :label-width="formLabelWidth">
              <el-date-picker v-model="addInfo.customer_birthday" type="date" placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手机号" prop="customer_phone" :label-width="formLabelWidth">
              <el-input v-model="addInfo.customer_phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="customer_idCard" :label-width="formLabelWidth">
              <el-input v-model="addInfo.customer_idCard"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <Address ref="addressVue"></Address>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="enterAdd('paper')">确 定</el-button>
          </div>
        </el-dialog>
        <!--详情-->
        <el-dialog v-if="dialogFormVisible1" @close='closeDialog1' title="会员详情" :visible.sync="dialogFormVisible1">
          <el-form :model="customerInfo">
            <el-form-item label="会员名称"  :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Name"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">

              <el-radio v-model="customerInfo.customer_sex" label="0">男</el-radio>
              <el-radio v-model="customerInfo.customer_sex" label="1">女</el-radio>
            </el-form-item>

            <el-form-item label="会员生日" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Birthday"></el-input>
            </el-form-item>
            <el-form-item label="会员编号"  :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Number"></el-input>
            </el-form-item>

            <el-form-item label="来店次数"  :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Times"></el-input>
            </el-form-item>
            <el-form-item label="上次来店" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_LastTime"></el-input>
            </el-form-item>

            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Phone"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_IdCard"></el-input>
            </el-form-item>

            <el-form-item label="地址" class="address" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Address"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="customerInfo.customer_Remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1=false">关闭</el-button>
            <el-button type="primary" @click="dialogFormVisible1=false">确定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <!--散客列表-->
      <el-tab-pane label="散客列表">
        <Table :tableHader="customerHader" :tableList="customerList">
          <!--头部插槽-->
          <el-table-column slot="headerSlot" fixed label="序号" width="55" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1+pageNum*(currentPage-1)}}</span>
            </template>
          </el-table-column>
          <!--尾部插槽-->
          <el-table-column slot="footerSlot" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="vipDetail(scope.row.customer_Id)">消费详情</el-button>
            </template>
          </el-table-column>
        </Table>
      </el-tab-pane>
    </el-tabs>
    <Pagination v-show="customerList.length>0" :total="total"
                ref="page" :api="api" @listenPage="getCustomerList" :page-size="pageSize"/>
  </div>
</template>
<script>
  import Address from "../Address"
  import Table from "../Table"
  import Search from "../Search"
  import LeftNav from "../LeftNav"
  import Pagination from "../Pagination"

  export default {
    name: "VipList",
    components: {
      Address,
      Table,
      Search,
      LeftNav,
      Pagination
    },
    data() {
      return {
        moreVipDetail: [{name: 'A1', path: '/VipDetail'}],
        vipHader: [
            {prop: "customer_Name", label: "姓名", width: "100"},
          {prop: "customer_sex", label: "性别", width: "50"},
          {prop: "customer_Phone", label: "手机号", width: "120"},
          {prop: "customer_Balance", label: "卡内余额", width: "100"},
          {prop: "customer_VipIntegration", label: "积分", width: "100"},
          {prop: "vips.vip_Name", label: "会员级别", width: "150"},
          {prop: "customer_LastTime", label: "上次到店", width: "200"}
        ],//表格
        customerList: [],
        customerHader: [
          {prop: "customer_Number", label: "散客编号", width: "280"},
          {prop: "customer_Name", label: "散客名称", width: "180"},
          {prop: "customer_sex", label: "性别", width: "130"},
          {prop: "customer_LastTime", label: "上次到店", width: "280"}
        ],//表格-end
        isShow: true,
        dialogFormVisible: false,//form
        dialogFormVisible1: false,
        addInfo: {
          customer_name: '',
          customer_sex: '',
          customer_birthday: '',
          customer_phone: '',
          customer_idCard: '',
          customer_address: '',
          customer_lastTime: ''
        },
        customerInfo: {
          customer_Number: '',
          customer_Name:'',
          customer_sex: '',
          customer_Birthday: '',
          customer_Phone: '',
          customer_IdCard: '',
          customer_Address: '',
          customer_Times: '',//来电次数
          customer_LastTime:'',
          customer_Remark:''//备注
        },
        rules: {
          customer_name: [
            {required: true, message: '请填写姓名', trigger: 'blur'},
            {
              pattern: /^[\u4e00-\u9fa5]{2,4}$/,
              message: '请输入真实姓名！',
              trigger: 'blur'
            }
          ],
          customer_idCard: [
            {required: true, message: '请填写证件号码', trigger: 'blur'},
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          customer_phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {
              pattern: /0?(13|14|15|17|18)[0-9]{9}$/,
              message: '手机号格式不对',
              trigger: 'blur'
            }
          ]
        },
        formLabelWidth: '80px', //form-end
        api: this.$api.vipManage.vipListPage,//分页
        pageNum: 5,//当前显示条数
        total: 0,//总条数，后台返回
        currentPage:1,
        pageSize: [5, 6, 7, 8],//分页-end
      }
    },
    created() {
      //默认条数为pageSize[0]，第一页数据this.$axios.post(this.api,{pageNum:this.pageSize[0],currentPage:1},this.$config
      this.getInitList()
    },
    methods: {
      getInitList(){
        this.$axios.post(this.api, {pageNum: this.pageSize[0], currentPage: 1}, this.$config).then((res) => {
          // console.log("服务器数据过来了");
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].customer_sex = 0 ? "男" : "女";
            res.data.data[i].customer_LastTime = this.getLocalTime(res.data.data[i].customer_LastTime)
          }
          this.customerList = res.data.data;
          this.total = res.data.totalItem;
        }).catch((err) => {
          console.log(err);
        })
      },
      handleClick(tab) {
        this.customerList = [];
        this.$refs.page.currentInit();//初始化当前页
        if (tab.index == 0) {
          // console.log("会员列表");
          this.isShow = true;
          this.state = "";
          this.api = this.$api.vipManage.vipListPage
        } else {
          // console.log("散客列表");
          this.isShow = false;
          this.api = this.$api.vipManage.customerListPage
        }
        this.$axios.post(this.api, {pageNum: this.pageNum, currentPage: 1}, this.$config).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].customer_sex = 0 ? "男" : "女";
            res.data.data[i].customer_LastTime = this.getLocalTime(res.data.data[i].customer_LastTime)
          }
          this.total = res.data.totalItem;
          this.customerList = res.data.data;
        }).catch((err) => {
          console.log(err);
        })
      },
      getCustomerList(data, pageNum,currentPage) {
        this.pageNum = pageNum;
        this.currentPage=currentPage;
        this.customerList = data;
      },
      getLocalTime(nS) {
        var date = new Date(nS);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
      },
      vipDetail(id) {
        // console.log(id);
        this.$axios.post(this.$api.vipManage.vipInfo,{customer_id:id},this.$config).then((res)=>{
          res.data.data.customer_LastTime = this.getLocalTime(res.data.data.customer_LastTime);
          res.data.data.customer_sex = res.data.data.customer_sex.toString();
          this.customerInfo=res.data.data
        }).catch((err)=>{
          console.log(err);
        });
        this.dialogFormVisible1=true
      },
      VipConsumptionDetails(id) {
        // console.log(id);
        this.$store.commit("setUser_id", id);
        this.$router.push('/VipConsumptionDetails');
      },
      searchList(data) {
        this.customerList = data
      },
      closeDialog() {
        this.dialogFormVisible = false;
        this.$refs.paper.clearValidate();
        this.$refs.paper.resetFields();
        console.log(this.addInfo);
        this.$notify.info({
          title: '取消',
          message: '您取消了添加'
        });
      },
      closeDialog1() {
        this.dialogFormVisible1 = false;
      },
      enterAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //验证成功
            this.addInfo.customer_address = this.$refs.addressVue.getAddressData();
            let d = this.addInfo.customer_birthday;
            this.addInfo.customer_birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let customer = {...this.addInfo}; //深拷贝  关闭时会清空addInfo
            //发起添加请求
            this.$axios.post(this.$api.vipManage.addVip, customer, this.$config).then((res) => {
              // console.log(customer);
              if (res.data.returnCode === "200") {
                this.closeDialog();
                this.$notify({
                  title: '成功',
                  message: '添加会员成功',
                  type: 'success'
                });
                this.getInitList()
              } else {
                this.$notify.error({
                  title: '失败',
                  message: '添加会员失败'
                });
              }
            }).catch((err) => {
              console.log(err);
            });
          } else {
            //验证失败
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @deep: ~'>>>';
  /*搜索*/
  .search {
    position: absolute;
    top: 61px;
    left: 490px;
    z-index: 3;

    @{deep} .el-input__prefix {
      font-size: 20px;
      top: -2px;
    }
  }

  .addBtn {
    position: absolute;
    top: 62px;
    left: 365px;
    z-index: 3;
  }

  @{deep} .el-input--prefix .el-input__inner {
    padding-left: 36px;
    height: 35px;
    line-height: 35px;
    padding-right: 0;
  }

  .el-tabs {
    @{deep} .el-tabs__item {
      height: 50px;
      line-height: 50px;
    }
  }

  /*  弹出层*/
  .el-dialog__wrapper @{deep} .el-dialog {
    width: 54%;
  }

  .dialog-footer {
    padding: 0 28px;
  }

  .el-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 30px;

    .el-form-item:last-of-type {
      width: 100%;
    }

    .el-form-item {
      float: left;
      width: 42%;

      @{deep} .el-form-item__label {
        text-align-last: justify;
      }

      .el-radio {
        margin-right: 10px;
      }

      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: auto;
      }

      @{deep} .el-input__inner {
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .address{
    width: 100%!important;
  }

</style>
