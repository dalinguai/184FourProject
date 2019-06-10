<!-- @Description: 会员详情-->
<!-- @author lxy -->
<!-- @date 2019/06/06 09:24:43  -->

<template>
  <div>
    <div class="grid-content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span>会员详情</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <div class="sp-page-content claass">
        <p v-model="text">{{text}}</p>    
        <table class="sp-grid-job">       
          <tbody>                                     
          <tr>         
            <td rowspan="7" style="width: 200px;">
              <!--<img id="manPho" src="" alt="照片" style="width:120px;height:145px;"/>-->
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </td>                                      
            <td style="width: 90px;">会员编号</td>                                
            <td style="width: 210px;">{{vipParticulars.vip_id}}</td>
            <td style="width: 90px;">来店次数</td>                   
            <td style="width: 210px;" >{{vipParticulars.come_number}}</td>                                 
            <td style="width: 90px;" >上次来店</td>                                   
            <td style="width: 210px;" colspan="1">{{vipParticulars.last_time}}</td>                                       
                                       
          </tr>                                     
          <tr>                                           
            <td>所属店铺</td>                                         
            <td>{{vipParticulars.shop_name}}</td>                                     
            <td>会员属相</td>                                       
            <td>{{vipParticulars.vip_birthday}}</td>                                     
            <td>会员名称</td>                                       
            <td colspan="2">{{vipParticulars.vip_attribute}}</td>                                     
          </tr>                                   
          <tr>                                          
            <td>会员名称</td>                                         
            <td>                                             
                   <label>
                <input type="text" v-model="vipParticulars.vip_name"/>
              </label>                                
            </td>                                           
            <td>生日</td>                                       
            <td>
              <el-date-picker
                v-model="vipParticulars.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>                                     
            </td>                                       
            <td>名称首字母</td>   
            <td colspan="2">
              <input type="text" v-model="vipParticulars.name_initials">
            </td>                                                                   
          </tr>                                     
          <tr>                                       
            <td>身份证号</td>                                         
            <td >
              <input type="text" v-model="vipParticulars.ID_Card " @change="Id_CardChange($event,scope.index)"/>                                        
            </td>                                       
            <td>手机号码</td>                                       
            <td >
              <input type="text" v-model="vipParticulars.phone_card" @change="phoneChange($event,scope.$index)"/>                                           
            </td> 
            <td>性别</td>                                     
            <td>
              <select class="sp-select" name="sex" id="sexOptions" v-model="vipParticulars.sex">                                                 
                <option v-for="item  in sexOptions" :value="item.value">
                  {{item.name}}
                </option>
              </select>
            </td>                               
          </tr>                                 
          <tr>                                       
            <td>家庭电话</td>                                       
            <td>
              <input type="text" v-model="vipParticulars.family_phone"/>                                         
            </td>                                         
            <td>公司电话</td>                                           
            <td >
                <input type="text" v-model="vipParticulars.company_phone"/>                                    
            </td>     
            <td>职业</td>                                         
            <td>
              <input type="text"  v-model="vipParticulars.vip_job"/>                                         
            </td>                     
          </tr>                                   
          <tr>                                         
            <td>邮编</td>                                         
            <td>
              <input type="text" style="border: none;outline: none" v-model="vipParticulars.Zip_code"/>                                         
            </td>                                       
            <td>微信号</td>                                         
            <td>
                   <input type="text"  v-model="vipParticulars.wex_number"/>                                      
            </td>                                         
            <td>QQ号</td>                                         
            <td colspan="2">
              <input type="text" v-model="vipParticulars.vip_QQ"/>                                                                        
            </td>                                     
          </tr>                                     
          <tr>                                         
            <td>邮箱</td>                                     
            <td>
              <input type="text" v-model="vipParticulars.vip_email"/>                                         
            </td>                                       
            <td>地址</td>                                       
            <td>
              <input type="text" v-model="vipParticulars.vip_adress"/>                                           
            </td>                                   
            <td>婚姻状况</td>                                   
            <td colspan="2"><select class="sp-select" name="marryOptions" id="sexOptions" v-model="vipParticulars.Marital_status">                                                 
              <option v-for="item  in marryOptions" :value="item.value">
                {{item.name}}
              </option>
            </select></td>                                   
          </tr>                           
          </tbody>                   
        </table>
      </div>
      <div class="remarks">
        <span class="ramarks_left">备注</span>
        <textarea class="ramarks_right" v-model="vipParticulars.Remarks"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button  class="huang" @click="saveFun">保存</el-button>
    <el-button class="hui" @click="Transformation">转为散户</el-button>
  </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VipDetail",
    data() {
      return {
        email:'12',
        userTypeSave: '',
        message: '',
        total: 1,   //
        pageNo: 1,
        pageSize: 5,
        editForm: {},
        currentPage: 1,
        tableChecked: [],//被选中的记录数据-----对应“批量删除”传的参数值
        ids: [],//存储批量删除的id

        sexOptions: [
          {
            name: '男',
            value: 0
          }, {
            name: '女',
            value: 1
          }
        ],
        marryOptions: [
          {
            name: "保密",
            value: 0
          },
          {
            name: "未婚",
            value: 1
          }, {
            name: "已婚",
            value: 2
          }
        ],
        officeOptions: [
          {
            name: "是",
            value: 0
          },
          {
            name: "否",
            value: 1
          }

        ],
        // user_Idcard:2,
        dialogVisible: false,
        value1: '',
        text: '',
        isShow: false,
        obj: [],
        //会员详情
        user_id: '',
        user_number: '',
        user_name: '',
        user_password: '',
        user_photo: '',
        user_sex: '',
        user_birthday: '',
        user_nativePlace: '',
        user_nation: '',
        user_healthCondition: '',
        user_politicsStatus: '',
        user_maritalStatus: '',
        user_educationBackground: '',
        user_schoolGraduation: '',
        user_idCard: '',
        userType_id: '',
        user_workState: '',
        user_dateOnBoard: '',
        user_contractType: '',
        user_whetherInOffice: '',
        user_phone: '',
        user_email: '',
        user_address: '',
        editList: [],
        sexSave: '0',
        heathSave: "良好",
        marrySave: "未婚",
        officeSave: "是",
        selectedId: '',
        sels: [],//选中显示的值
        disabled: true,
        isNavShow:true,
        editShow:true,
        vipArr:[{name:'zhangsan'}],
        navArr:['会员信息','消费详情','会员卡项','操作日志'],

        //请求数据存放处
        vipParticulars:[],
        //头像地址
        imageUrl: '',

      }
    },
    created(){
      // this.postData()
    },
    methods: {
      /**
       * @Description: 上传头像
       * @author lxy
       * @date 2019/06/08 14:17:13
       */
      handleAvatarSuccess(res, file) {

        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      //导航改变
      changeNav(e, index) {
        console.log(e);
        console.log(index);
      },
      //请求数据
      postData() {
        this.$axios.get(this.$api.vipManage.vipDetail).then(data => {
          this.vipParticulars = data.data[0];
        })
      },
      /**
       * @Description: 手机号码以及身份证验证
       * @author lxy
       * @date 2019/06/08 02:04:53
       */

      //手机号码验证
      phoneChange(e, index) {
        //此api应请求所有电话号码
        let phone = e.phone_card;
        console.log(phone);
        this.$axios.post(api, {
          "phone": phone
        }, this.$config).then(data => {
          console.log(data);
          if (data.message === 1) {
            console.log("此电话号码可用");
          }
          else {
            console.log("提示此电话号码已被占用")
          }
        })
      },
      //身份证验证
      Id_CardChange(e, index) {
        //此api应请求所有身份证号
        let Id_Card = e.ID_Card;
        console.log(Id_Card);
        this.$axios.post(api, {
          "phone": phone
        }, this.$config).then(data => {
          console.log(data);
          if (data.message === 1) {
            console.log("此身份证号可用");
          }
          else {
            console.log("提示此身份证号已被占用")
          }
        })
      },
      //保存
      saveFun() {
        //api 此处为提交保存。(修改)
        console.log(this.vipParticulars);
        this.$axios.post(api, {
          "all": this.vipParticulars
        }, this.$config).then(data => {
          console.log(data);
        })
      },
      /**
       * @Description: 转为散户
       * @author lxy
       * @date 2019/06/08 03:34:54
       */

      Transformation() {
        //此api应为传VIP状态
        let VIP_id = this.vipParticulars.vip_id;
        console.log(VIP_id);
        this.$axios.post(api, {
          "VIP_id": VIP_id
        }, this.$config).then(data => {
          console.log(data);
        })
      }
    }
  }
</script>

<style scoped>
  /*头像上传*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /*面包屑*/
  .grid-content{
    height: 50px;
    margin-left: 50px;
  }

  .topStaff {
    height: 65px;
    position: relative;
  }

  .topStaff span {
    letter-spacing: 2px;
    font-size: 18px;
    position: absolute;
    left: 10px;
    top: 20px;
  }

  .pageDisplay {
    margin-top: 50px;
  }

  .topStaff .btnDeleteall {
    position: absolute;
    right: 35px;
    top: 20px;
  }

  .topStaff .btnAdd {
    position: absolute;
    right: 140px;
    top: 20px;
  }

  .sp-grid-job {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #E1E6EB;
    border-left: none;
  }
  /*表格最小宽度*/
  .claass{
    min-width: 890px;
  }
  input{
    width: 100%;
    height: 40px;
    border: 1px #E0E5EA solid !important;
  }
  /*备注*/
  .remarks{
    width: 85%;
    margin: 10px 50px 10px 50px;
    border: 1px darkred solid;
    height: 150px;
    overflow: hidden;
    /*line-height: 150px;*/
    display: flex;
    align-items: center;

  }
  .ramarks_left{
    width: 150px;
    text-align: center;
    line-height: 150px;
    /*margin: 0 30px;*/
    border-right: 1px darkred solid;
    display: inline-block;
  }
  .ramarks_right{
    width: 60%;
    height: 130px;
    border: 1px #A6C7FE solid;
    margin-left: 20px;
  }
  .sp-page-content p {

    height: 35px;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    top: 10px;
  }

  .sp-grid-job tbody td {
    text-align: center;
    /*line-height: 46px;*/
    height: 46px;
    font-size: 13px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    position: relative;
  }
  /*保存按钮和转为散户*/
  .dialog-footer{
    margin-top: 20px;
  }
  .huang{
    background: chocolate;
    color: white;
    margin-left: 20%;
  }
  .hui{
    background: #666666;
    color: white;
    margin-left: 50px;
  }
  .sp-grid-job tbody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
    text-align: center;

  }

  .sp-grid-job tbody td select {
    outline: none;
    border: none;
    width: 96%;
    text-align: center;
    text-align-last: center;
  }

  .sp-grid-job tbody td img {
    outline: none;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 1px solid red;
  }

  .sp-page-content {
    width: 95%;
    margin: 0 auto;
  }
  /*返回条*/
  .back{
    background: #D7D7D7;
    width: 85%;
    min-width: 555px;
    height: 50px;
    line-height: 50px;
    color: #FD0000;
    border: 1px darkred solid;
    margin: 20px 40px 20px 45px;
    padding-left:25px ;
  }
  .name{
    font-size: 20px;
    margin-right: 25px;
  }
  .btnBack{
    color: #6600FA;
  }
  .navThis{
    color: black;
    font:400 18px/50px 宋体 Serif;
    margin-right: 25px;
    padding-right: 25px;
    border-right: 1px saddlebrown solid;
  }
  .navThis:nth-last-of-type(1){
    border-right: 0;
  }
</style>
