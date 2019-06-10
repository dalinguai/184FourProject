<template>
  <div>
    <el-tabs type="border-card">
<!--      角色列表-->
      <el-tab-pane>
        <span slot="label" label="角色列表">角色列表</span>
        <div class="searchWord">
          <el-input style="display: inline-block;width: 300px"
                    placeholder="请输入搜索内容">
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
                <el-switch v-model="scope.row.role_state"  :active-value="1"
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
        <el-dialog :visible.sync="dialogVisible" width="60%" title="新增角色"
                   :before-close="handleClose">
          <el-form ref="form" :model="roleList" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="roleList.role_name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="roleList.role_state"></el-switch>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="enterAdd('paper')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
<!--      角色分配-->
      <el-tab-pane>
        <span slot="label" label="角色分配">角色分配</span>
        <div class="searchWord">
          <el-input style="display: inline-block;width: 300px"
                    placeholder="请输入搜索内容">
          </el-input>
          <el-button type="primary">查询</el-button>
          <el-button type="danger">清空用户角色</el-button>
          <div class="white">
          </div>
        </div>
        <div class="content">
          <el-table :data="list" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="user_name" label="用户昵称" align="center">
            </el-table-column>
            <el-table-column prop="role_name" label="	Email/帐号" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="状态" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="拥有的角色" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="操作" align="center">

            </el-table-column>
          </el-table>

        </div>



      </el-tab-pane>
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
          <el-table :data="list" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="role_name" label="权限名称" align="center">
            </el-table-column>
            <el-table-column prop="role_name" label="角色类型" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="操作" align="center">

            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
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
          <el-table :data="list" stripe border>
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="role_name" label="角色名称" align="center">
            </el-table-column>
            <el-table-column prop="role_name" label="角色类型" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="拥有的权限" align="center">

            </el-table-column>
            <el-table-column prop="role_name" label="操作" align="center">

            </el-table-column>
          </el-table>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>


</template>

<script>
  export default {
    name: "role",
    data() {
      return {
        roleList:[{
          role_name:"哈哈",
          role_state:0
        }],
        dialogVisible:false,
        list: [],
        form: {
          name: '',
        }
        // value1: true
      }
    },
    beforeMount() {
      this.$axios.get(this.$api.staffManage.role).then((res) => {
        this.list = res.data;
      })
    },
    methods:{
      // changeSwitch(){
      //
      // },
      enterAdd(){

      },
      addRole(){
        this.dialogVisible=true
      },
      //增加角色是否关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      changeSwitch (data) {
        console.log(data) }

    }

  }


</script>

<style scoped>

  .content{
    margin-top: 30px;
  }
  .searchWord {
    width: 100%;
    height: 70px;
    margin-top: 20px;
    border-bottom:1px solid #E1E6EB;
    /*margin-left: 400px;*/
  }

</style>
