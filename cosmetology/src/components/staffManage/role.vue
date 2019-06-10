<template>
  <div>
    <el-tabs type="border-card">
      <!--      角色列表-->
      <el-tab-pane>
        <span slot="label" label="角色列表">角色列表</span>
        <div class="searchWord">
          <el-input style="display: inline-block;width: 300px"
                    v-model="role_name" placeholder="请输入搜索内容">
          </el-input>
          <el-button type="primary">查询</el-button>
          <el-button type="success" @click="addRole">增加角色</el-button>
          <div class="white">
          </div>
        </div>
        <div class="content">
          <el-table :data="roleList" stripe border>
            <el-table-column prop="role_name" label="角色名称" align="center">
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.role_state" :active-value="1"
                           :inactive-value="0"
                           active-text="启用" inactive-text="禁用"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           @change="changeSwitch(scope.row)"></el-switch>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!--      增加角色模态框-->
      <div>
        <el-dialog :visible.sync="dialogVisible" width="40%" title="新增角色"
                   :before-close="handleClose">
          <table class="sp-grid-job">  
            <tbody>                                     
            <tr>       
              <td>
                角色名称
              </td>
              <el-input style="margin:20px 50px;width: 320px" type="text" v-model="role_name"></el-input>
            </tr>
            <tr>       
              <td>
                状态
              </td>
              <td>
                <el-switch style="margin:20px  50px"
                           v-model="role_state"
                           :active-value="1"
                           :inactive-value="0"
                           active-text="启用" inactive-text="禁用"
                           active-color="#13ce66"
                           inactive-color="#ff4949">
                </el-switch>
              </td>
            </tr>
            </tbody>
          </table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="quxiaoAdd();open3()">取 消</el-button>
            <el-button type="primary" @click="saveFun">确 定</el-button>
          </div>

        </el-dialog>
      </div>
      <!--      角色分配-->
      <el-tab-pane>
        <span slot="label" label="角色分配">角色分配</span>
        <div class="white">
        </div>
        <div class="content">
          <el-table :data="soltList" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户昵称" align="center">
            </el-table-column>
            <el-table-column prop="user_number" label="工号" align="center">
            </el-table-column>
            <el-table-column prop="role_state" label="状态" align="center">
            </el-table-column>
            <el-table-column prop="role_name" label="拥有的角色" align="center">

            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="updateFun(scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>


      </el-tab-pane>
      <!--      角色分配编辑-->
      <el-dialog :visible.sync="editShow" width="50%" :before-close="handleClose">
        <div class="sp-page-content">
          <p>编辑信息</p>  
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">用户昵称</td>
                                         
              <td style="width: 210px;"><input type="text" v-model="user_name"/></td>
              <td style="width: 90px;">工号</td>
              <!--              v-model="user_number"-->
              <td><input type="text" disabled="disabled"/></td>
            </tr>
            <tr>                                           
              <td style="width: 90px;">状态</td>
                                       
              <td style="width: 210px;"><input type="text" v-model="role_state"/></td>
              <td style="width: 90px;">拥有的角色</td>
              <td><input type="text" v-model="user_number"/></td>
            </tr>
            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="quxiaoEdit();open3()">取 消</el-button>
    <el-button plain type="primary" @click="editSave();open1()">保 存</el-button>
  </span>
      </el-dialog>
      <!--      权限列表-->
      <el-tab-pane>
        <span slot="label" label="权限列表">权限列表</span>
        <div class="searchWord">
          <el-input style="display: inline-block;width: 300px"
                    placeholder="请输入搜索内容">
          </el-input>
          <el-button type="primary">查询</el-button>
          <el-button type="success">增加角色</el-button>
          <el-button type="danger">选择启用</el-button>
          <div class="white">
          </div>
        </div>
        <div class="content">
          <el-table :data="quanxianList" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="menu_name" label="权限名称" align="center">
            </el-table-column>
            <el-table-column prop="menu_url" label="url地址" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="updateFunquan(scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
      <!--      权限列表编辑-->

      <el-dialog :visible.sync="editShow2" width="50%" :before-close="handleClose">
        <div class="sp-page-content">
          <p>编辑信息</p>  
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">权限名称</td>
                                   
              <td style="width: 210px;"><input type="text" v-model="menu_name"/></td>
              <td style="width: 90px;">url地址</td>
                                   
              <td style="width: 210px;"><input type="text" v-model="menu_url"/></td>
            </tr>

            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="quxiaoEdit2();open3()">取 消</el-button>
    <el-button plain type="primary" @click="editSave2();open1()">保 存</el-button>
  </span>
      </el-dialog>
      <!--      权限分配-->
      <el-tab-pane>
        <span slot="label" label="权限分配">权限分配</span>
        <div class="searchWord">
          <el-input style="display: inline-block;width: 300px"
                    placeholder="请输入搜索内容">
          </el-input>
          <el-button type="primary">查询</el-button>
          <div class="white">
          </div>
        </div>
        <div class="content">
          <el-table :data="quanxianSolt" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="role_name" label="角色名称" align="center">
            </el-table-column>
            <el-table-column prop="role_have" label="拥有的权限" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="addQuanxian(scope.$index)">添加权限</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
      <!--      选择添加权限-->
      <el-dialog :visible.sync="addShow" width="25%" :before-close="handleClose">
        <div class="sp-page-content">
          <p>添加信息</p>  
          <table class="sp-grid-job" style="border: 1px solid rgb(242,242,242);width: 300px">       
            <tbody>                                     
            <tr>
              <td>
                <template>
                  <el-checkbox style="margin-left: -175px" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                  </el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="quxiaoEdit3();open3()">取 消</el-button>
    <el-button plain type="primary" @click="editSave3();open1()">保 存</el-button>
  </span>
      </el-dialog>


    </el-tabs>
  </div>


</template>

<script>
  const cityOptions = ['权限列表','权限添加', '权限删除', '用户列表', '在线用户','用户Session踢出',
    '用户激活&禁止','权限分配','用户删除','用户角色分配清空'];
  export default {
    name: "role",
    data() {
      return {
        checkAll: false,
        checkedCities: ['权限列表', '权限添加'],
        cities: cityOptions,
        isIndeterminate: true,
        value: 0,
        soltList: [
          {
            "user_name": "韩梅梅",
            "user_number": "mlnr10001",
            "role_state": 0,
            "role_name": "蒋俊梅"
          },
          {
            "user_name": "胡良",
            "user_number": "mlnr10001",
            "role_state": 1,
            "role_name": "林忆莲"
          },
          {
            "user_name": "志良",
            "user_number": "mlnr10001",
            "role_state": 0,
            "role_name": "曾瑶"
          },
          {
            "user_name": "琪琪",
            "user_number": "mlnr10001",
            "role_state": 1,
            "role_name": "赵佳雨"
          }
        ],
        roleList: [
          {
            "role_id": 1,
            "role_name": "林忆莲",
            "role_state": 0
          },
          {
            "role_id": 2,
            "role_name": "卢琳琳",
            "role_state": 1
          },
          {
            "role_id": 3,
            "role_name": "李子怡",
            "role_state": 0
          }
          ,
          {
            "role_id": 4,
            "role_name": "甜甜",
            "role_state": 1
          }
        ],
        quanxianList: [
          {
            "role_id": 1,
            "menu_name": "权限列表",
            "menu_url": "/permission/index.shtml"
          }, {
            "role_id": 2,
            "menu_name": "权限添加",
            "menu_url": "/permission/addPermission.shtml"
          }, {
            "role_id": 3,
            "menu_name": "权限删除",
            "menu_url": "/permission/deletePermissionById.shtml"
          },
        ],
        quanxianSolt:[
          {
            "role_id": 1,
            "role_name": "林忆莲",
            "role_have": "权限列表"
          },

          {
            "role_id": 2,
            "role_name": "赵欣雨",
            "role_have": "权限添加"
          },
        ],
        menu_name: '',
        menu_url: '',
        dialogVisible: false,
        editList: [],
        list: [],
        role_name: '',
        role_state: '',
        user_name: '',
        user_number: '',
        message: '',
        editShow: false,
        editShow2: false,
        addShow:false,
        selectedId: '',
        quanxianId: ''
        // value1: true
      }
    },
    beforeMount() {
    },
    methods: {
      // 角色分配编辑 点击
      updateFun(index) {
        this.selectedId = index;
        console.log(index)
        this.editShow = true;
        var editList = this.soltList[index];
        this.user_number = editList.user_number;
        this.user_name = editList.user_name;
        this.role_name = editList.role_name;
        this.role_state = editList.role_state;
      },
      // 角色分配编辑 保存
      quxiaoEdit() {
        this.editShow = false;
        this.message = '您取消了数据编辑'
        this.user_number = '';
        this.user_name = '';
        this.role_state = ''
        this.role_name = ''
      },
      editSave() {
        this.soltList[this.selectedId].user_number = this.user_number;
        this.soltList[this.selectedId].user_name = this.user_name;
        this.soltList[this.selectedId].role_name = this.role_name;
        this.soltList[this.selectedId].role_state = this.role_state;
        this.editShow = false;
        this.user_number = '';
        this.user_name = '';
        this.role_state = '';
        this.role_name = '';
        this.message = '您编辑了一条角色信息并保存'
      },
      // 权限列表编辑 保存
      updateFunquan(index) {
        this.quanxianId = index;
        this.editShow2 = true;
        var editList = this.quanxianList[index];
        this.menu_name = editList.menu_name;
        this.menu_url = editList.menu_url;

      },
      editSave2() {
        this.soltList[this.quanxianId].menu_name = this.menu_name;
        this.soltList[this.quanxianId].menu_url = this.menu_url;
        this.editShow2 = false;
        this.menu_name = '';
        this.menu_url = '';
        this.message = '您编辑了一条角色信息并保存'
      },
      quxiaoEdit2(){
        this.editShow2 = false;
        this.message = '您取消了数据编辑'
        this.menu_name = '';
        this.menu_url = '';
      },
      addQuanxian(index){
        this.addShow = true;
      },
      quxiaoEdit3(){
        this.addShow = false;
      },
      editSave3(){
        this.addShow = false;
      },
      //取消增加角色 保存
      quxiaoAdd() {
        this.dialogVisible = false;
        this.message = '您取消了角色添加'
      },
      //增加角色 保存
      saveFun() {
        this.editList.role_name = this.role_name;
        this.editList.role_state = this.role_state;
        console.log(this.roleList)
        this.roleList.push(this.editList);
        this.dialogVisible = false;
        this.role_name = '';
        this.role_state = ''
      },
      //增加角色 点击
      addRole() {
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      changeSwitch(data) {
        console.log(data)
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
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }

  }


</script>

<style scoped>

  .content {
    margin-top: 30px;
  }
  .el-checkbox-group{
    /*border: 1px solid red;*/
    width: 100px;
    /*margin:auto;*/
    font-size: 16px;
    margin-left: 20px;
  }
  .el-checkbox{
    margin-top: 20px;
  }
  .searchWord {
    width: 100%;
    height: 70px;
    margin-top: 20px;
    border-bottom: 1px solid #E1E6EB;
    /*margin-left: 400px;*/
  }

  .sp-grid-job tbody td input[type='text'] {
    outline: none;
    border: none;
    width: 100%;
    text-indent: 5px;
    text-align: center;

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
</style>
