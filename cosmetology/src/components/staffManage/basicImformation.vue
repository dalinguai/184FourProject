<template>
  <div>
    <el-button class="btnDelete" type="success" @click="addFun()">添加</el-button>
    <el-button type="danger">删除所选</el-button>
    <!--    //组件首页-->
    <div style="width:1180px;margin-left: 150px">
      <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="user_sex" label="性别" width="120">
        </el-table-column>
        <el-table-column width="120"
                         prop="user_birthday"
                         label="年龄">
        </el-table-column>
        <el-table-column
          prop="user_Idcard"
          label="身份证号">
        </el-table-column>
        <el-table-column
          prop="user_phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="user_dateOnBoard"
          label="入职日期">
        </el-table-column>
        <el-table-column
          label="更多">
          <template slot-scope="scope">
            <button @click="btnDetails(scope.$index)">详情</button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <button @click="shanchu(scope.$index)">删除</button>
            <button @click="updateFun(scope.$index)">编辑</button>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--   添加 模态框-->
    <div>
      <el-dialog :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">姓 名</td>
                                               
              <td style="width: 210px;"><input type="text" v-model="user_name"/></td>

              <td style="width: 90px;">性 别</td>
                                   
              <td style="width: 210px;">                                                
                <select class="sp-select" name="sex" id="sexOptions" v-model="sexSave">                                 
                                 
                  <option v-for="item  in sexOptions" name="" :value="item.name">
                    {{item.name}}
                  </option>

                </select>                                         
              </td>
                                               
              <td style="width: 90px;">出生年月</td>
                                                 
              <td style="width: 210px;">
                <input type="date" style="border: none;outline: none" v-model="user_birthday"/>
              </td>
                                                     
              <td rowspan="3" style="width: 150px;">
                <img id="manPhoto" src="" alt="照片" style="width:90px;height:100px;"/>
              </td>
                                               
            </tr>
                                                 
            <tr>                                           
              <td>籍 贯</td>
                                                       
              <td><input type="text" v-model="user_nativePlace"/></td>
                                                   
              <td>民 族</td>
                                                     
              <td><input type="text" v-model="user_nation"/></td>
                                                   
              <td>健康状况</td>
                                                     
              <td>
                <select id="heathOptions" v-model="heathSave">
                  <option v-for="item  in heathOptions" :value="item.name">{{item.name}}</option>
                                                                                                 
                </select>                                           
              </td>
                                                   
            </tr>
                                               
            <tr>                                          
              <td>政治面貌</td>
                                                       
              <td>                                             
                <select class="sp-select" name="political" v-model="politicalSave">       
                  <option v-for="item  in politicalOptions" :value="item.name">{{item.name}}</option>
                                                       
                </select>                                       
              </td>
                                                         
              <td>婚否</td>
                                                     
              <td>
                <select class="sp-select" name="marry" v-model="marrySave">                                             
                   
                  <option v-for="item  in marryOptions" :value="item.name">{{item.name}}</option>
                                                       
                </select>                                         
              </td>
                                                     
              <td>最高学历</td>
                 
              <td><select class="sp-select" name="education" v-model="educationSave">
                <option v-for="item  in educationOptions" :value="item.name">{{item.name}}</option>
                                      
                     
              </select>
              </td>
                                                                                 
            </tr>
                                                 
            <tr>                                       
              <td>毕业学校</td>
                                                       
              <td colspan="3">
                <input type="text" v-model="user_schoolGraduation"/>                                        
              </td>
                                                     
              <td>身份证号</td>
                                                     
              <td colspan="2">
                <input type="text" v-model="user_Idcard"/>                                           
              </td>
                                               
            </tr>
                                             
            <tr>                                       
              <td>岗 位</td>
                                                   
              <td>
                <input type="text" v-model="userType_id"/>
              </td>
              <td>工 号</td>
                                                     
              <td>
                <input type="text" v-model="user_number"/>                                         
              </td>
                                                       
              <td>工作状态</td>
                                                         
              <td colspan="2">
                <select class="sp-select" name="positionStatus" v-model="positionSave">                                 
                                 
                  <option v-for="item  in positionOptions" name="" :value="item.name">{{item.name}}</option>
                </select>                                         
              </td>
                                   
            </tr>
                                               
            <tr>                                         
              <td>入职日期</td>
                                                       
              <td>
                <input type="date" style="border: none;outline: none" v-model="user_dateOnBoard"/>                     
                                   
              </td>
                                                     
              <td>合同类型</td>
                                                       
              <td>
                <select class="sp-select" name="" v-model="contractSave">                                     
                  <option v-for="item  in contractOptions" name="" :value="item.name">{{item.name}}</option>
                           
                </select>                                           
              </td>
                                                       
              <td>是否在职</td>
                                                       
              <td colspan="2">
                <select class="sp-select" name="" v-model="officeSave">                                                 
                  <option v-for="item  in officeOptions" name="" :value="item.name">{{item.name}}</option>
                </select>                                  
              </td>
                                                   
            </tr>
                                                 
            <tr>                                         
              <td>联系电话</td>
                                                   
              <td>
                <input type="text" v-model="user_phone"/>                                         
              </td>
                                                     
              <td>邮 箱</td>
                                                     
              <td>
                <input type="text" v-model="user_email"/>                                           
              </td>
                                                   
              <td>地 址</td>
                                                 
              <td colspan="2"><input type="text" v-model="user_address"/></td>
                                                 
            </tr>
                                         
            </tbody>
                                     
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button plain type="primary" @click="saveFun();open3()">保 存</el-button>
  </span>
      </el-dialog>
      <!--      </div>-->
    </div>
    <!--    //详细信息-->
    <div class="basic" v-show="isShow" v-for="item in obj">
      <el-dialog :visible.sync="isShow" width="70%" :before-close="handleClose">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                     
            <tr>                                           
              <td style="width: 90px;">姓 名</td>
                                               
              <td style="width: 210px;">{{item.user_name}}</td>
                                      
              <td style="width: 90px;">性 别</td>
                                   
              <td style="width: 210px;">
                {{item.user_sex}}
              </td>
                                               
              <td style="width: 90px;">出生年月</td>
                                                 
              <td style="width: 210px;">
                {{item.user_birthday}}
              </td>
                                                     
              <td rowspan="3" style="width: 150px;"><img
                src="https://oss.iacblog.com/img/ancient-architecture-building-1010657.jpg" alt="照片"
                style="width:90px;height:100px;"/>
              </td>
                                                 
            </tr>
                                                 
            <tr>                                           
              <td>籍 贯</td>
                                                       
              <td>{{item.user_nativePlace}}</td>
                                                   
              <td>民 族</td>
                                                     
              <td>{{item.user_nation}}</td>
                                                       
              <td>健康状况</td>
                                                       
              <td>{{item.user_healthCondition}}</td>
                                                   
            </tr>
                                               
            <tr>                                          
              <td>政治面貌</td>
              <td>{{item.user_politicsStatus}}</td>
                                                         
              <td>婚否</td>
                                                     
              <td>{{item.user_maritalStatus}}</td>
                                                     
              <td>最高学历</td>
                 
              <td>{{item.user_educationBackground}}</td>
                                                                                 
            </tr>
                                                 
            <tr>                                       
              <td>毕业学校</td>
                                                       
              <td colspan="3">
                {{item.user_schoolGraduation}}
              </td>
                                                     
              <td>身份证号</td>
              <td colspan="2">
                {{item.user_Idcard}}
              </td>
                                               
            </tr>
                                             
            <tr>                                       
              <td>岗 位</td>
                                                   
              <td>
                {{item.userType_id}}
              </td>
              <td>工 号</td>
                                                     
              <td>
                {{item.user_number}}
              </td>
                                                       
              <td>工作状态</td>
                                                         
              <td colspan="2">{{item.user_workState}}</td>
                                                   
            </tr>
                                               
            <tr>                                         
              <td>入职日期</td>
                                                       
              <td>{{item.user_dateOnBoard}}</td>
                                                     
              <td>合同类型</td>
                                                       
              <td>{{item.user_contractType}}</td>
                                                       
              <td>是否在职</td>
                                                       
              <td colspan="2">
                {{item.user_whetherInOffice}}
              </td>
                                                   
            </tr>
                                                 
            <tr>                                         
              <td>联系电话</td>
                                                   
              <td>
                {{item.user_phone}}
              </td>
                                                     
              <td>邮 箱</td>
                                                     
              <td>
                {{item.user_phone}}
              </td>
                                                   
              <td>地 址</td>
              <td colspan="2">{{item.user_address}}</td>
                                                 
            </tr>
                                         
            </tbody>
                                     
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">关 闭</el-button>
  </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="editShow" width="70%" :before-close="handleClose">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">姓 名</td>
                                               
              <td style="width: 210px;"><input type="text" v-model="user_name"/></td>

              <td style="width: 90px;">性 别</td>
                                   
              <td style="width: 210px;">                                                
                <select class="sp-select" name="sex" id="sexOptions" v-model="sexSave">                                 
                                 
                  <option v-for="item  in sexOptions" name="" :value="item.name">
                    {{item.name}}
                  </option>

                </select>                                         
              </td>
                                               
              <td style="width: 90px;">出生年月</td>
                                                 
              <td style="width: 210px;">
                <input type="date" style="border: none;outline: none" v-model="user_birthday"/>
              </td>
                                                     
              <td rowspan="3" style="width: 150px;">
                <img id="manPho" src="" alt="照片" style="width:90px;height:100px;"/>
              </td>
                                               
            </tr>
                                                 
            <tr>                                           
              <td>籍 贯</td>
                                                       
              <td><input type="text" v-model="user_nativePlace"/></td>
                                                   
              <td>民 族</td>
                                                     
              <td><input type="text" v-model="user_nation"/></td>
                                                   
              <td>健康状况</td>
                                                     
              <td>
                <select id="heathOptions" v-model="heathSave">
                  <option v-for="item  in heathOptions" :value="item.name">{{item.name}}</option>
                                                                                                 
                </select>                                           
              </td>
                                                   
            </tr>
                                               
            <tr>                                          
              <td>政治面貌</td>
                                                       
              <td>                                             
                <select class="sp-select" name="political" v-model="politicalSave">       
                  <option v-for="item  in politicalOptions" :value="item.name">{{item.name}}</option>
                                                       
                </select>                                       
              </td>
                                                         
              <td>婚否</td>
                                                     
              <td>
                <select class="sp-select" name="marry" v-model="marrySave">                                             
                   
                  <option v-for="item  in marryOptions" :value="item.name">{{item.name}}</option>
                                                       
                </select>                                         
              </td>
                                                     
              <td>最高学历</td>
                 
              <td><select class="sp-select" name="education" v-model="educationSave">
                <option v-for="item  in educationOptions" :value="item.name">{{item.name}}</option>
                                      
                     
              </select>
              </td>
                                                                                 
            </tr>
                                                 
            <tr>                                       
              <td>毕业学校</td>
                                                       
              <td colspan="3">
                <input type="text" v-model="user_schoolGraduation"/>                                        
              </td>
                                                     
              <td>身份证号</td>
                                                     
              <td colspan="2">
                <input type="text" v-model="user_Idcard"/>                                           
              </td>
                                               
            </tr>
                                             
            <tr>                                       
              <td>岗 位</td>
                                                   
              <td>
                <input type="text" v-model="userType_id"/>
              </td>
              <td>工 号</td>
                                                     
              <td>
                <input type="text" v-model="user_number"/>                                         
              </td>
                                                       
              <td>工作状态</td>
                                                         
              <td colspan="2">
                <select class="sp-select" name="positionStatus" v-model="positionSave">                                 
                                 
                  <option v-for="item  in positionOptions" name="" :value="item.name">{{item.name}}</option>
                </select>                                         
              </td>
                                   
            </tr>
                                               
            <tr>                                         
              <td>入职日期</td>
                                                       
              <td>
                <input type="date" style="border: none;outline: none" v-model="user_dateOnBoard"/>                     
                                   
              </td>
                                                     
              <td>合同类型</td>
                                                       
              <td>
                <select class="sp-select" name="" v-model="contractSave">                                     
                  <option v-for="item  in contractOptions" name="" :value="item.name">{{item.name}}</option>
                           
                </select>                                           
              </td>
                                                       
              <td>是否在职</td>
                                                       
              <td colspan="2">
                <select class="sp-select" name="" v-model="officeSave">                                                 
                  <option v-for="item  in officeOptions" name="" :value="item.name">{{item.name}}</option>
                </select>                                  
              </td>
                                                   
            </tr>
                                                 
            <tr>                                         
              <td>联系电话</td>
                                                   
              <td>
                <input type="text" v-model="user_phone"/>                                         
              </td>
                                                     
              <td>邮 箱</td>
                                                     
              <td>
                <input type="text" v-model="user_email"/>                                           
              </td>
                                                   
              <td>地 址</td>
                                                 
              <td colspan="2"><input type="text" v-model="user_address"/></td>
                                                 
            </tr>
                                         
            </tbody>
                               
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="editShow = false">取 消</el-button>
    <el-button plain type="primary" @click="editSave()">保 存</el-button>
  </span>
      </el-dialog>
      <!--      </div>-->
    </div>
  </div>
  <!--  //编辑-->
</template>

<script>
  import  Vue from 'vue'
  export default {
    name: "basicImformation",
    data() {
      return {
        editShow: false,
        sexOptions: [
          {
            name: '男',
            value: 0
          }, {
            name: '女',
            value: 1
          }
        ],
        heathOptions: [
          {
            name: "良好",
            value: 0
          }, {
            name: "一般",
            value: 1
          }],
        politicalOptions: [
          {
            name: "群众",
            value: 0
          }, {
            name: "团员",
            value: 1
          },
          {
            name: "中共党员",
            value: 2
          }],
        marryOptions: [
          {
            name: "未婚",
            value: 0
          }, {
            name: "已婚",
            value: 1
          }
        ],
        educationOptions: [
          {
            name: "本科及以上",
            value: 0
          }, {
            name: "专科",
            value: 1
          }, {
            name: "高中",
            value: 2
          }, {
            name: "初中及以下",
            value: 3
          }
        ],
        positionOptions: [
          {
            name: "休假",
            value: 0
          },
          {
            name: "空闲",
            value: 1
          },
          {
            name: "忙碌",
            value: 2
          }, {
            name: "离线",
            value: 3
          },

        ],
        contractOptions: [
          {
            name: "正式期",
            value: 0
          },
          {
            name: "试用期",
            value: 1
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
        dialogVisible: false,
        value1: '',
        list: [],
        text: '',
        isShow: false,
        obj: [],
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
        user_Idcard: '',
        userType_id: '',
        user_workState: '',
        user_dateOnBoard: '',
        user_contractType: '',
        user_whetherInOffice: '',
        user_phone: '',
        user_email: '',
        user_address: '',
        editList: [],
        sexSave: '男',
        heathSave: "良好",
        politicalSave: "群众",
        marrySave: "未婚",
        educationSave: "高中",
        positionSave: "忙碌",
        contractSave: "试用期",
        officeSave: "是",
        selectedId: '',
        sels: [],//选中显示的值
        disabled: true
      }
    },
    created() {
      this.$axios.get("http://5cec9881b779120014b4974f.mockapi.io/demo/staffManagement")
        .then((res) => {
          this.list = res.data;
        }).catch((err) => {
        console.log(err);
      });
      // this.couponSelected = this.sexOptions[0].name;
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      open3() {
        this.$notify({
          title: '提示',
          message: '您成功添加了一条新员工信息',
          type: 'success'
        });
      },
      shanchu(index) {
        this.list.splice(index, 1)
      },
      //添加--弹出模态框
      addFun() {
        this.dialogVisible = true;
        this.text = '添加信息';
        // this.editList = []
      },
      //添加保存
      saveFun() {
        this.dialogVisible = false;
        // editList=new Object();
        this.editList.user_id = this.user_id;
        this.editList.user_number = this.user_number;
        this.editList.user_name = this.user_name;
        this.editList.user_password = this.user_password;
        this.editList.user_photo = this.user_photo;
        this.editList.user_sex = this.sexSave;
        this.editList.user_birthday = this.user_birthday;
        this.editList.user_nativePlace = this.user_nativePlace;
        this.editList.user_nation = this.user_nation;
        this.editList.user_healthCondition = this.heathSave;
        this.editList.user_politicsStatus = this.politicalSave;
        this.editList.user_maritalStatus = this.marrySave;
        this.editList.user_educationBackground = this.educationSave;
        // console.log(this.user_educationBackground);
        this.editList.user_schoolGraduation = this.user_schoolGraduation;
        this.editList.user_Idcard = this.user_Idcard;
        this.editList.userType_id = this.userType_id
        this.editList.user_workState = this.positionSave
        this.editList.user_dateOnBoard = this.user_dateOnBoard
        this.editList.user_contractType = this.contractSave
        this.editList.user_whetherInOffice = this.officeSave
        this.editList.user_phone = this.user_phone
        this.editList.user_email = this.user_email
        this.editList.user_address = this.user_address;
        this.list.push(this.editList);
        // console.log(editList);
        this.user_number = '';
        this.user_name = '';
        this.user_password = '';
        this.user_photo = '';
        this.user_sex = '';
        this.user_birthday = '';
        this.user_nativePlace = '';
        this.user_nation = '';
        this.user_healthCondition = '';
        this.user_politicsStatus = '';
        this.user_maritalStatus = '';
        this.user_educationBackground = '';
        this.user_schoolGraduation = '';
        this.user_Idcard = '';
        this.userType_id = '';
        this.user_workState = '';
        this.user_dateOnBoard = '';
        this.user_contractType = '';
        this.user_whetherInOffice = '';
        this.user_phone = '';
        this.user_email = '';
        this.user_address = '';
      },
      //查看更多
      btnDetails(index) {
        // this.$forceUpdate();
        // this.list.splice(index,1);
        // this.obj = this.list[index];
        this.isShow = true;
        this.text = '更多详情';
        // this.obj=this.list[index];
        Vue.set(this.obj, 0, this.list[index]);
        console.log(index);
        console.log(this.obj);
      },
      // 编辑
      updateFun(index) {
        this.text = '编辑信息';
        this.selectedId = index,
          this.editShow = true;
        var editList = this.list[index];
        this.user_id = editList.user_id;
        this.user_number = editList.user_number;
        this.user_name = editList.user_name;
        this.user_password = editList.user_password;
        this.user_photo = editList.user_photo;
        this.user_sex = editList.user_sex;
        this.user_birthday = editList.user_birthday;
        this.user_nativePlace = editList.user_nativePlace;
        this.user_nation = editList.user_nation;
        this.user_healthCondition = editList.user_healthCondition;
        this.user_politicsStatus = editList.user_politicsStatus;
        this.user_maritalStatus = editList.user_maritalStatus;
        this.user_educationBackground = editList.user_educationBackground;
        this.user_schoolGraduation = editList.user_schoolGraduation;
        this.user_Idcard = editList.user_Idcard;
        this.userType_id = editList.userType_id;
        this.user_workState = editList.positionSave;
        this.user_dateOnBoard = editList.user_dateOnBoard;
        this.user_contractType = editList.user_contractType;
        this.user_whetherInOffice = editList.user_whetherInOffice;
        this.user_phone = editList.user_phone;
        this.user_email = editList.user_email;
        this.user_address = editList.user_address;
        // this.list[index].user_name=this
        console.log(this.editList);

      },

      editSave() {
        this.editShow = false;
        this.list[this.selectedId].user_name = this.user_name;
        this.list[this.selectedId].user_id = this.user_id;
        this.list[this.selectedId].user_number = this.user_number;
        this.list[this.selectedId].user_name = this.user_name;
        this.list[this.selectedId].user_password = this.user_password;
        this.list[this.selectedId].user_photo = this.user_photo;
        this.list[this.selectedId].user_sex = this.sexSave;
        this.list[this.selectedId].user_birthday = this.user_birthday;
        this.list[this.selectedId].user_nativePlace = this.user_nativePlace;
        this.list[this.selectedId].user_nation = this.user_nation;
        this.list[this.selectedId].user_healthCondition = this.heathSave;
        this.list[this.selectedId].user_politicsStatus = this.marrySave;
        this.list[this.selectedId].user_maritalStatus = this.user_maritalStatus;
        this.list[this.selectedId].user_educationBackground = this.educationSave;
        this.list[this.selectedId].user_schoolGraduation = this.user_schoolGraduation;
        this.list[this.selectedId].user_Idcard = this.user_Idcard;
        this.list[this.selectedId].userType_id = this.userType_id;
        this.list[this.selectedId].user_workState = this.positionSave;
        this.list[this.selectedId].user_dateOnBoard = this.user_dateOnBoard;
        this.list[this.selectedId].user_contractType = this.contractSave;
        this.list[this.selectedId].user_whetherInOffice = this.officeSave;
        this.list[this.selectedId].user_phone = this.user_phone;
        this.user_number = '';
        this.user_name = '';
        this.user_password = '';
        this.user_photo = '';
        this.user_sex = '';
        this.user_birthday = '';
        this.user_nativePlace = '';
        this.user_nation = '';
        this.user_healthCondition = '';
        this.user_politicsStatus = '';
        this.user_maritalStatus = '';
        this.user_educationBackground = '';
        this.user_schoolGraduation = '';
        this.user_Idcard = '';
        this.userType_id = '';
        this.user_workState = '';
        this.user_dateOnBoard = '';
        this.user_contractType = '';
        this.user_whetherInOffice = '';
        this.user_phone = '';
        this.user_email = '';
        this.user_address = '';
      }
    },

  }
</script>

<style scoped>
  .btnDelete {

  }

  .sp-grid-job {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #E1E6EB;
    border-left: none;
  }

  .sp-page-content p {
    border: 1px solid red;
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

  /*.sp-grid-job tbody td input{*/
  /*  outline: none;*/
  /*  border: none;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  text-indent: 5px;*/
  /*  text-align: center;*/
  /*  position:absolute;*/
  /*  top:0;*/
  /*  bottom:0;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  margin: auto;*/
  /*  !*border: 1px solid red;*!*/
  /*}*/
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
    border: 0;
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
</style>
