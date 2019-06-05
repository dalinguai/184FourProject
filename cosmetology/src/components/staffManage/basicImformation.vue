<template>
  <div>
    <!--    组件首页  分页-->
    <div>
      <!--        //搜索-->
      <!--        <Search view-name="user_name"-->
      <!--                :api-search="$api.staffManage.search"-->
      <!--                :api-all="$api.staffManage.staffManage"-->
      <!--                @listen="searchList"-->
      <!--        ></Search>-->

      <div class="topStaff">
        <div class="search">
          <input type="text" class="searchBox" v-model="searchVal">
          <button class="btn">搜 索</button>
        </div>

        <span>员工信息</span>
        <el-button class="btnAdd" type="success" @click="addFun()">添加</el-button>
        <el-button class="btnDeleteall" type="danger" @click="batchDelete(tableChecked)">删除所选</el-button>
      </div>
      <!--      .slice((currentPage-1)*pageSize,currentPage*pageSize)-->
      <el-table :data="list"
                border style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed label="序号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column width="80" prop="user_number" label="工号">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120">
        </el-table-column>
        <el-table-column label="性别" prop="user_sex" :formatter="formatRole" width="80">
        </el-table-column>

        <el-table-column width="120" prop="user_birthday" label="出生年月">
        </el-table-column>
        <el-table-column prop="user_idCard" label="身份证号">
        </el-table-column>
        <el-table-column prop="user_phone" label="联系电话">
        </el-table-column>
        <el-table-column
          prop="user_dateOnBoard"
          label="入职日期">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="btnDetails(scope.$index,scope.row)">查看详情</el-button>
            <el-button type="text" @click="shanchu(scope.$index,scope.row)">删除</el-button>
            <el-button type="text" @click="updateFun(scope.$index)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--分页-->
      <div class="block pageDisplay">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20,30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
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
                <select class="sp-select" name="sex" v-model="sexSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in sexArr.keys()"
                          :value="key">
                    {{sexArr.get(key)}}
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
                <select class="sp-select"  v-model="heathSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in heathArr.keys()"
                          :value="key">
                    {{heathArr.get(key)}}
                  </option>
                </select>                           
              </td>                                 
            </tr>
                                               
            <tr>                                          
              <td>政治面貌</td>
                                                       
              <td>   
                <select class="sp-select" v-model="politicalSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in politicsArr.keys()"
                          :value="key">
                    {{politicsArr.get(key)}}
                  </option>
                </select>                 
              </td>
                                                         
              <td>婚否</td>
                                                     
              <td>
                <select class="sp-select"  v-model="marrySave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in marryArr.keys()"
                          :value="key">
                    {{marryArr.get(key)}}
                  </option>
                </select>                                         
              </td>
                                                     
              <td>最高学历</td>
                 
              <td> <select class="sp-select"  v-model="educationSave">   
                <option selected="(index==0)?'selected':''" v-for="(key,index)  in educationArr.keys()"
                        :value="key">
                  {{educationArr.get(key)}}
                </option>
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
                <input type="text" v-model="user_idCard"/>                                           
              </td>
                                               
            </tr>
                                             
            <tr>                                       
              <td>岗 位</td>
                                                   
              <td>
                <!--                <input type="text" v-model="userType_id"/>-->
                <select class="sp-select"  v-model="userTypeSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in usertypeArr.keys()"
                          :value="key">
                    {{usertypeArr.get(key)}}
                  </option>
                </select>    
              </td>
              <td>工 号</td>
                                                     
              <td>
                <input type="text" v-model="user_number"/>                                         
              </td>
                                                       
              <td>工作状态</td>
                                                         
              <td colspan="2">
                <select class="sp-select"  v-model="positionSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in workstateArr.keys()"
                          :value="key">
                    {{workstateArr.get(key)}}
                  </option>
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
                <select class="sp-select"  v-model="contractSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in contractArr.keys()"
                          :value="key">
                    {{contractArr.get(key)}}
                  </option>
                </select>                                             
              </td>
                                                       
              <td>是否在职</td>
                                                       
              <td colspan="2">
                <select class="sp-select"  v-model="officeSave">   
                  <option selected="(index==0)?'selected':''" v-for="(key,index)  in inofficeArr.keys()"
                          :value="key">
                    {{inofficeArr.get(key)}}
                  </option>
                </select>                                 
              </td>
                                                   
            </tr>
                                                 
            <tr>                                         
              <td>联系电话</td>
                                                   
              <td>
                <input type="text" v-model="user_phone" /> 
                                                       
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
    <el-button @click="deleteSave();open3()">取 消</el-button>
    <el-button plain type="primary" @click="saveFun();open1()">保 存</el-button>
  </span>

      </el-dialog>
      <!--      </div>-->
    </div>
    <!--    详细信息-->
    <div class="basic" v-show="isShow" v-for="item in obj">
      <el-dialog :visible.sync="isShow" width="70%">
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
                                                     
              <td rowspan="3" style="width: 150px;">
                <img
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
                {{item.user_idCard}}
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
    <!-- 编辑-->
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
                                 
                  <option v-for="item  in sexOptions" :name="item.value" :value="item.value">
                    {{item.name}}
                  </option>

                </select>                                         
              </td>
                                               
              <td style="width: 90px;">出生年月</td>
                                                 
              <td style="width: 210px;">
                <!--                <el-date-picker-->
                <!--                  v-model="user_birthday"-->
                <!--                  type="date">-->
                <!--                </el-date-picker>-->
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
                  <option v-for="item  in heathOptions" :value="item.value">{{item.name}}</option>
                                                                                                 
                </select>                                           
              </td>
                                                   
            </tr>
                                               
            <tr>                                          
              <td>政治面貌</td>
                                                       
              <td>                                             
                <select class="sp-select" name="political" v-model="politicalSave">       
                  <option v-for="item  in politicalOptions" :value="item.value">{{item.name}}</option>
                                                       
                </select>                                       
              </td>
                                                         
              <td>婚否</td>
                                                     
              <td>
                <select class="sp-select" name="marry" v-model="marrySave">                                             
                   
                  <option v-for="item  in marryOptions" :value="item.value">{{item.name}}</option>
                                                       
                </select>                                         
              </td>
                                                     
              <td>最高学历</td>
                 
              <td><select class="sp-select" name="education" v-model="educationSave">
                <option v-for="item  in educationOptions" :value="item.value">{{item.name}}</option>
                                      
                     
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
                <input type="text" v-model="user_idCard"/>                                           
              </td>
                                               
            </tr>
                                             
            <tr>                                       
              <td>岗 位</td>
                                                   
              <td>
                <select class="sp-select" name="positionStatus" v-model="userTypeSave">       
                  <option v-for="item  in userTypeOptions" :value="item.value">
                    {{item.name}}</option>
                </select> 
                <!--                <input type="text" v-model="userType_id"/>-->
              </td>
              <td>工 号</td>
                                                     
              <td>
                <input type="text" v-model="user_number"/>                                         
              </td>
                                                       
              <td>工作状态</td>
                                                         
              <td colspan="2">
                <select class="sp-select" name="positionStatus" v-model="positionSave">                                 
                                 
                  <option v-for="item  in positionOptions" name="" :value="item.value">{{item.name}}</option>
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
                  <option v-for="item  in contractOptions" name="" :value="item.value">{{item.name}}</option>
                           
                </select>                                           
              </td>
                                                       
              <td>是否在职</td>
                                                       
              <td colspan="2">
                <select class="sp-select" name="" v-model="officeSave">                                                 
                  <option v-for="item  in officeOptions" name="" :value="item.value">{{item.name}}</option>
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
    <el-button @click="quxiaoEdit();open3()">取 消</el-button>
    <el-button plain type="primary" @click="editSave();open1()">保 存</el-button>
  </span>
      </el-dialog>
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
  import config from './../../config'
  import Vue from 'vue'

  export default {
    name: "basicImformation",
    data() {
      return {
        searchVal:'',//搜索
        hintShow : false,  // 提示语显示
        hint : '信息填写错误', // 提示语
        sexArr: config.sex,
        heathArr:config.heath,
        politicsArr:config.politics,
        marryArr:config.marry,
        educationArr:config.education,
        workstateArr:config.workstate,
        contractArr:config.contract,
        inofficeArr:config.inoffice,
        usertypeArr:config.usertype,
        message: '',
        total: 1,
        pageNo: 1,
        pageSize: 5,
        editForm: {},
        currentPage: 1,
        // userList:[],
        editShow: false,
        tableChecked: [],//被选中的记录数据-----对应“批量删除”传的参数值
        ids: [],//批量删除id
        userTypeOptions: [
          {
            name: '总经理',
            value: 1
          }, {
            name: '收银员',
            value: 0
          }

        ],
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
        listNewArr: [],
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
        sexSave: 1,
        heathSave: 0,
        politicalSave: 1,
        marrySave: 0,
        educationSave: 2,
        positionSave: 2,
        contractSave: 0,
        officeSave:0,
        userTypeSave: 1,
        selectedId: '',
        sels: [],//选中显示的值
        disabled: true
      }
    },
    created(){
      this.getUser();
    },
    methods: {
      getUser() {
        this.$axios.get("http://172.17.1.235:8080/user/all",{
          params:{"currentPage":  this.currentPage,
            "currentPageSize":this.pageSize}
        }).then((res) => {
          console.log("成功");
          this.list = res.data.data.userList;
          this.total=res.data.rowCount
        }).catch((err=>{
          console.log(err);
        }))
      },
      searchList(data) {
        this.list = data
      },
      handleSizeChange(size) {
        this.pageSize = size;
        console.log("每页显示的条数"+this.pageSize);
        this.getUser();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.pageNo = currentPage;
        console.log("当前页"+this.currentPage);
        this.getUser();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      open1() {
        this.$notify({
          title: '提示',
          message: this.message,
          type: 'success'
        });
      },
      open3() {
        this.$notify.info({
          title: '取消',
          message: this.message,
        });
      },
      open2() {
        this.$notify({
          title: '警告',
          message: this.message,
          type: 'warning'
        });
      },
      open4() {
        this.$notify.error({
          title: '错误',
          message: this.message,
        });
      },
      deleteSave() {
        this.dialogVisible = false;
        this.message = '您取消了数据添加'
      },
      shanchu(index,row) {
        console.log(row.user_id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          index += (this.pageNo - 1) * this.pageSize;
          this.list.splice(index, 1);
          this.$axios.get("http://172.17.1.235:8080/user/deleteUser",
            {params:{"user_id":row.user_id}}).then((res)=>{
            this.getUser();
            this.$notify({
              title: '警告',
              message: '您删除了一条员工信息',
              type: 'warning'
            })
          })

        }).catch(() => {
          this.$notify.info({
            title: '取消',
            message: '您取消了数据删除',
          });
        })

      },
      //添加--弹出模态框
      addFun() {
        this.dialogVisible = true;
        this.text = '添加信息';
      },
      //添加保存
      saveFun() {
        this.dialogVisible = false;
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
        this.editList.user_idCard = this.user_idCard;
        this.editList.userType_id = this.userType_id
        this.editList.user_workState = this.positionSave
        this.editList.user_dateOnBoard = this.user_dateOnBoard
        this.editList.user_contractType = this.contractSave
        this.editList.user_whetherInOffice = this.officeSave
        this.editList.user_phone = this.user_phone
        this.editList.user_email = this.user_email
        this.editList.user_address = this.user_address;
        this.list.push(this.editList);
        console.log(this.list)
        this.$axios.post("http://172.17.1.235:8080/user/insertUser",{
          "user_name":   this.editList.user_name ,
          "user_sex":this.editList.user_sex,
          "user_birthday":this.editList.user_birthday,
          "user_nativePlace":this.editList.user_nativePlace,
          "user_nation":this.editList.user_nation,
          "user_healthCondition":this.editList.user_healthCondition,
          "user_politicsStatus":this.editList.user_politicsStatus,
          "user_maritalStatus":this.editList.user_maritalStatus,
          "user_educationBackground":this.editList.user_educationBackground,
          "user_schoolGraduation":this.editList.user_schoolGraduation,
          "user_idCard":this.editList.user_idCard,
          "userType_id":this.editList.userType_id,
          "user_workState":this.editList.user_workState,
          "user_dateOnBoard":this.editList.user_dateOnBoard,
          "user_contractType":this.editList.user_contractType,
          "user_whetherInOffice":this.editList.user_whetherInOffice,
          "user_phone":this.editList.user_phone,
          "user_address":this.editList.user_address,
        },this.$config).then((res)=>{
          console.log("成功")
        }).catch((err) => {
          console.log(err)
        })


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
        this.user_idCard = '';
        this.userType_id = '';
        this.user_workState = '';
        this.user_dateOnBoard = '';
        this.user_contractType = '';
        this.user_whetherInOffice = '';
        this.user_phone = '';
        this.user_email = '';
        this.user_address = '';
        this.message = '您成功添加了一条员工信息'
      },
      formatRole: function (row, column) {
        return row.user_sex == 0 ? "男" : "女";
      },
      //查看更多
      btnDetails(index) {
        this.isShow = true;
        this.text = '更多详情';
        // this.obj = Object.assign({}, row);
        if (this.pageNo > 1) {
          index += (this.pageNo - 1) * this.pageSize;
          console.log(index)
        }
        Vue.set(this.obj, 0, this.list[index]);
        if (this.list[index].user_sex == 0) {
          this.list[index].user_sex = "男"
        } else if (this.list[index].user_sex == 1) {
          this.list[index].user_sex = "女"
        }
        if (this.list[index].user_healthCondition == 0) {
          this.list[index].user_healthCondition = "良好"
        } else if (this.list[index].user_healthCondition == 1) {
          this.list[index].user_healthCondition = "一般"
        }
        if (this.list[index].user_politicsStatus == 0) {
          this.list[index].user_politicsStatus = '群众'
        } else if (this.list[index].user_politicsStatus == 1) {
          this.list[index].user_politicsStatus = '团员'
        } else if (this.list[index].user_politicsStatus == 2) {
          this.list[index].user_politicsStatus = '中共党员'
        }
        if (this.list[index].user_maritalStatus == 0) {
          this.list[index].user_maritalStatus = "未婚"
        } else if (this.list[index].user_maritalStatus == 1) {
          this.list[index].user_maritalStatus = "已婚"
        }
        if (this.list[index].user_educationBackground == 0) {
          this.list[index].user_educationBackground = "本科及以上"
        } else if (this.list[index].user_educationBackground == 1) {
          this.list[index].user_educationBackground = "专科"
        } else if (this.list[index].user_educationBackground == 2) {
          this.list[index].user_educationBackground = "高中"
        } else if (this.list[index].user_educationBackground == 3) {
          this.list[index].user_educationBackground = "初中"
        } else if (this.list[index].user_educationBackground == 4) {
          this.list[index].user_educationBackground = "初中及以下"
        }
        if (this.list[index].user_workState == 0) {
          this.list[index].user_workState = "休假"
        } else if (this.list[index].user_workState == 1) {
          this.list[index].user_workState = "空闲"
        } else if (this.list[index].user_workState == 2) {
          this.list[index].user_workState = "忙碌"
        } else if (this.list[index].user_workState == 3) {
          this.list[index].user_workState = "离线"
        }
        if (this.list[index].user_contractType == 0) {
          this.list[index].user_contractType = "正式期"
        } else if (this.list[index].user_contractType == 1) {
          this.list[index].user_contractType = "试用期"
        }
        if (this.list[index].user_whetherInOffice == 0) {
          this.list[index].user_whetherInOffice = "是"
        } else if (this.list[index].user_whetherInOffice == 1) {
          this.list[index].user_whetherInOffice = "否"
        }
        if (this.list[index].userType_id == 1) {
          this.list[index].userType_id = "总经理"
        } else if (this.list[index].userType_id == 0) {
          this.list[index].userType_id = "收银员"
        }
        // console.log(this.obj)
      },
      // 编辑
      updateFun(index) {
        this.text = '编辑信息';
        // index += (this.pageNo - 1) * this.pageSize;
        this.selectedId = index;
        this.editShow = true;
        var editList = this.list[index];
        this.user_id = editList.user_id;
        this.user_number = editList.user_number;
        this.user_name = editList.user_name;
        this.user_password = editList.user_password;
        this.user_photo = editList.user_photo;
        this.user_sex = editList.user_sex;
        this.sexSave = editList.user_sex;
        this.user_birthday = editList.user_birthday;
        this.user_nativePlace = editList.user_nativePlace;
        this.user_nation = editList.user_nation;
        this.user_healthCondition = editList.user_healthCondition;
        this.heathSave = editList.user_healthCondition;
        this.user_politicsStatus = editList.user_politicsStatus;
        this.politicalSave = editList.user_politicsStatus;
        this.user_maritalStatus = editList.user_maritalStatus;
        this.marrySave = editList.user_maritalStatus;
        this.user_educationBackground = editList.user_educationBackground;
        this.educationSave = editList.user_educationBackground;
        this.user_schoolGraduation = editList.user_schoolGraduation;
        this.user_idCard = editList.user_idCard;
        this.userType_id = editList.userType_id;
        this.userTypeSave = editList.userType_id;
        this.user_workState = editList.user_workState;
        this.positionSave = editList.user_workState;
        this.user_dateOnBoard = editList.user_dateOnBoard;
        this.user_contractType = editList.user_contractType;
        this.contractSave = editList.user_contractType;
        this.user_whetherInOffice = editList.user_whetherInOffice;
        this.officeSave = editList.user_whetherInOffice;
        this.user_phone = editList.user_phone;
        this.user_email = editList.user_email;
        this.user_address = editList.user_address;
        console.log(this.list);
      },
      quxiaoEdit() {
        this.editShow = false;
        this.message = '您取消了数据编辑'
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
        this.user_idCard = '';
        this.userType_id = '';
        this.user_workState = '';
        this.user_dateOnBoard = '';
        this.user_contractType = '';
        this.user_whetherInOffice = '';
        this.user_phone = '';
        this.user_email = '';
        this.user_address = '';
      },
      //保存编辑
      editSave() {
        this.list[this.selectedId].user_name = this.user_name;
        this.list[this.selectedId].user_id = this.user_id;
        this.list[this.selectedId].user_number = this.user_number;
        this.list[this.selectedId].user_email = this.user_email;
        this.list[this.selectedId].user_password = this.user_password;
        this.list[this.selectedId].user_photo = this.user_photo;
        this.list[this.selectedId].user_sex = this.sexSave;
        if (this.sexSave == "男") {
          this.list[this.selectedId].user_sex = 0
        } else if (this.sexSave == "女") {
          this.list[this.selectedId].user_sex = 1
        }
        this.list[this.selectedId].user_birthday = this.user_birthday;
        this.list[this.selectedId].user_nativePlace = this.user_nativePlace;
        this.list[this.selectedId].user_nation = this.user_nation;
        this.list[this.selectedId].user_healthCondition = this.heathSave;
        this.list[this.selectedId].user_politicsStatus = this.politicalSave;
        this.list[this.selectedId].user_maritalStatus = this.marrySave;
        this.list[this.selectedId].user_educationBackground = this.educationSave;
        this.list[this.selectedId].user_schoolGraduation = this.user_schoolGraduation;
        this.list[this.selectedId].user_idCard = this.user_idCard;
        this.list[this.selectedId].userType_id = this.userTypeSave;
        this.list[this.selectedId].user_workState = this.positionSave;
        this.list[this.selectedId].user_dateOnBoard = this.user_dateOnBoard;
        this.list[this.selectedId].user_contractType = this.contractSave;
        this.list[this.selectedId].user_whetherInOffice = this.officeSave;
        this.list[this.selectedId].user_phone = this.user_phone;
        this.list[this.selectedId].user_address = this.user_address;
        console.log(this.list);
        console.log(this.list[this.selectedId].user_dateOnBoard);
        console.log(this.list[this.selectedId].user_birthday);
        this.$axios.post("http://172.17.1.235:8080/user/updateUser",{
          "user_id":this.list[this.selectedId].user_id,
          "user_name":this.list[this.selectedId].user_name,
          "user_sex":this.list[this.selectedId].user_sex,
          "user_birthday":this.list[this.selectedId].user_birthday,
          "user_nativePlace":this.list[this.selectedId].user_nativePlace,
          "user_nation":this.list[this.selectedId].user_nation,
          "user_healthCondition":this.list[this.selectedId].user_healthCondition,
          "user_politicsStatus":this.list[this.selectedId].user_politicsStatus,
          "user_maritalStatus":this.list[this.selectedId].user_maritalStatus,
          "user_educationBackground":this.list[this.selectedId].user_educationBackground,
          "user_schoolGraduation":this.list[this.selectedId].user_schoolGraduation,
          "user_idCard":this.list[this.selectedId].user_idCard,
          "userType_id":this.list[this.selectedId].userType_id,
          "user_workState":this.list[this.selectedId].user_workState,
          "user_dateOnBoard":this.list[this.selectedId].user_dateOnBoard,
          "user_contractType":this.list[this.selectedId].user_contractType,
          "user_whetherInOffice":this.list[this.selectedId].user_whetherInOffice,
          "user_phone":this.list[this.selectedId].user_phone,
          "user_address":this.list[this.selectedId].user_address,
        },this.$config).then((res)=>{
          console.log("成功")
        }).catch((err) => {
          console.log(err)
        })

        this.editShow = false;
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
        this.user_idCard = '';
        this.userType_id = '';
        this.user_workState = '';
        this.user_dateOnBoard = '';
        this.user_contractType = '';
        this.user_whetherInOffice = '';
        this.user_phone = '';
        this.user_email = '';
        this.user_address = '';
        this.message = '您编辑了一条员工信息并保存'
      },
      handleSelectionChange(val) {
        this.tableChecked = val;
        // console.log(this.tableChecked)
      },
      //批量删除
      batchDelete(rows) {
        var _this = this;
        _this.ids = [];
        rows.forEach(element => {
          _this.ids.push(element.id)
        });
        _this.$confirm('是否确认此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(_this.ids)
          _this.ids.forEach(function (item, index) {
            // console.log(index+1)
            _this.list.splice(_this.ids.id, 1);//按下标删除
          });


          console.log(_this.list);
          console.log((this.listNewArr))
          this.$notify({
            title: '警告',
            message: '您删除了员工信息',
            type: 'warning'
          });
        }).catch(() => {
          this.$notify.info({
            title: '取消',
            message: '您取消了数据删除',
          });
        });
      }
    },
  }
</script>

<style scoped>
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
