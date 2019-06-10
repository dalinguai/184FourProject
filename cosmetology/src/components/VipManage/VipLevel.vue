<!--suppress ALL -->
<template>
  <div>
  <div class="grid-content">
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>-->
      <!--<el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>-->
      <!--<el-breadcrumb-item><span>会员级别设置</span></el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <div>
      <span id="title">会员级别设置</span>
      <el-button class="add_button" @click="addFun()" type="success">新增</el-button>
    </div>
  <div>


    <!--    添加-弹出框-->
    <div>
      <el-dialog :visible.sync="isShow" width="40%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>         
            <tr>                                           
              <td style="width: 90px;">序号</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="user_id"/>
              </label></td>
            </tr>                                
            <tr>                                           
              <td style="width: 90px;">所属门店</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="shop_name"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">级别名称</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="rank_name"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">享受折扣</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="discount_name"/>
              </label></td>
            </tr>                                
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button plain type="primary" @click="saveFun()">保 存</el-button>
          </span>

      </el-dialog>
    </div>

    <!--修改-->
    <div>
      <el-dialog :visible.sync="isOpen" width="40%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>         
            <tr>                                           
              <td style="width: 90px;">序号</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="user_id" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>                                
            <tr>                                           
              <td style="width: 90px;">所属门店</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="shop_name" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">级别名称</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="rank_name" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">享受折扣</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="discount_name" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>                                
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isOpen = false">取 消</el-button>
    <el-button plain type="primary" @click="reviseFun">保 存</el-button>
          </span>

      </el-dialog>
    </div>
    <!--删除-->
  </div>
    <!--内容-->
    <div class="count">
    <el-breadcrumb class="content" >
      <template>
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%" >
          <el-table-column
            prop="id"
            label="序号"
            align="center"
            width="50"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属门店"
            align="center"
           >
          </el-table-column>
          <el-table-column
            prop="rank"
            label="会员级别"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="discount"
            label="享受折扣"
            align="center"
            >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">修改</el-button>
              <el-button type="text" @click="deleteClick(scope.$index,scope.row);openFive()" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </el-breadcrumb>
    </div>

    <!--分页-->

    <div id="pageTab">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.length">
      </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "VipLevel",
      data() {
        return {
          value1: '',
          list: [],
          text: '',
          obj: [],

          isOpen:false,
          isShow: false,
          dialogVisible: false,
          editShow:false,
          deleteShow:false,
          user_id :'',
          shop_name: "",
          rank_name: "",
          discount_name: "",
          //修改删除下标
          numberIndex:0,
          deleteIndex:0,
          isDelete:true,
          addList: [],
          pageNo: 1,//存储当前页码值
          pageSize: 7,//设置每页条数
          currentPage: 1,//总页码
          pageSizes:[7],//当前页选择显示条数
          // tableData4: [],
          detailFormVisible:false,//控制模态框隐藏
          object:{},
          tableData: [{
            id: '1',
            name: '魅力女人',
            rank: 'vip1',
            discount: '65%',
          }, {
            id: '2',
            name: '魅力女人',
            rank: 'vip2',
            discount: '65%',

          }, {
            id: '3',
            name: '魅力女人',
            rank: 'vip3',
            discount: '65%',
          }, {
            id: '4',
            name: '魅力女人',
            rank: 'vip5',
            discount: '65%',
          },
            // , {
            //   id: '5',
            //   name: '魅力女人',
            //   rank: 'vip5',
            //   discount: '65%',
            // }
            // , {
            //   id: '6',
            //   name: '魅力女人',
            //   rank: 'vip5',
            //   discount: '65%',
            // }
          ],
        }
      },
      // beforeMount() {
      //
      //   //向后台发起请求，获取数据
      //   // this.$axios.get(this.$api.staffManage.staffMoney).then((res) => {
      //   //   this.list = res.data;
      //   // }).catch((err) => {
      //   //   console.log(err)
      //   // })},
      //
      // },
      methods: {
          openFive() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.tableData.splice(this.deleteIndex,1);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
        open3() {
          this.$notify({
            title: '提示',
            message: '您成功添加了一条新会员信息',
            type: 'success',
          });
        },
        open4() {
          this.$notify({
            title: '提示',
            message: '您成功修改了一条会员信息',
            type: 'success',
          });
        },
        //添加
        addFun() {
          this.isShow = true;
          this.text = '添加信息';
        },
        //添加下的保存
        saveFun() {
          this.addList.id = this.user_id;
          this.isShow = false;
          this.addList.name = this.shop_name;
          this.addList.rank = this.rank_name;
          this.addList.city = this.discount_name;
          this.tableData.push(this.addList);
//清空
          this.user_id = '';
          this.shop_name = '';
          this.rank_name = '';
          this.discount_name = '';
          this.open3();
        },
        //点击修改
        handleClick(index,row) {
          this.numberIndex = index;
          this.user_id = this.tableData[this.numberIndex].id;
          this.shop_name = this.tableData[this.numberIndex].name;
          this.rank_name = this.tableData[this.numberIndex].rank;
          this.discount_name = this.tableData[this.numberIndex].discount;
          this.isOpen = true;
        },
        //修改下的保存
        reviseFun(){
          let arr = {};
          arr.id = this.user_id;
          arr.name = this.shop_name;
          arr.rank = this.rank_name;
          arr.discount = this.discount_name;
          // console.log(arr);
          this.tableData[this.numberIndex]=arr;


          var newlinshi= [];
          for(var i=0;i<this.tableData.length;i++){
            if(i==this.numberIndex){
              newlinshi.push(arr);
            }else{
              newlinshi.push(this.tableData[i]);
            }
          }
          this.$set(this.$data,'tableData',newlinshi);

          this.isOpen = false;
          this.open4();
        },
        //删除
        deleteClick (index,row){
          this.deleteIndex = index;
        },
        //切换页码
        handleSizeChange(val) {
          this.pageSize = val;
        },
        //切换每页条数
        handleCurrentChange(val) {
          this.currentPage = val;
          this.pageNo = val
        }
      }
    }
</script>

<style scoped>
  .grid-content{
    padding-left: 20px;
  }
  span{
    margin-top: 15px;
    font-size: 15px;
    color: gray;
  }
  span:nth-child(1){
    margin-left: 20px;
  }
  #app{
    align-content: center;
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
    height: 46px;
    font-size: 13px;
    border-bottom: 1px solid #E1E6EB;
    border-left: 1px solid #E1E6EB;
    position: relative;
  }
  .fenye{
    margin-left: 30%
  }
  input{
    width: 100%;
    height: 100%;
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
  .sp-page-content {
    width: 95%;
    margin: 0 auto;
  }
  #pageTab{
    text-align: center;
    padding: 20px 0;
  }
  .add_button{
    height: 32px;
    margin: 7px 7px;
    margin-left: 20px;
    line-height: 32px;
    padding-top: 0 !important;
  }
  #title{
    font-size: 14px;
    margin-left: 0px;
  }
</style>
