<!--suppress ALL -->
<!-- @Description: 会员级别设置-->
 <!-- @author lxy -->
<!-- @date 2019/06/06 09:23:48  -->

<template>
  <div>
  <div class="grid-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><span>首页</span></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/VIPList'}"><span>会员管理</span></el-breadcrumb-item>
      <el-breadcrumb-item><span>会员级别设置</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-button class="add_button" @click="addFun()">新增</el-button>
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
              <td style="width: 210px;">{{selectArr.length + 1}}</td>
            </tr>                                
            <tr>                                           
              <td style="width: 90px;">所属门店</td>     
              <!--shop_name -->
              <td style="width: 210px;">魅力女人</td>
            </tr>   
            <tr>                                           
              <td style="width: 90px;">会员级别</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_name"/>
              </label></td>
            </tr>      
            <tr>                                           
              <td style="width: 90px;">需求金额</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_money"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">享受折扣</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_discount"/>
              </label></td>
            </tr>                                
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">取 消</el-button>
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
              <td style="width: 210px;">{{numberIndex + 1}}</td>
            </tr>                                
            <tr>                                           
              <td style="width: 90px;">所属门店</td>       
              <td style="width: 210px;">魅力女人</td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">会员级别</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_name" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>     
            <tr>                                           
              <td style="width: 90px;">需求金额</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_money" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
              </label></td>
            </tr>            
            <tr>                                           
              <td style="width: 90px;">享受折扣</td>       
              <td style="width: 210px;"><label>
                <input type="text" v-model="vip_discount" onblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')"/>
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
    <el-breadcrumb class="content">
      <template>
        <el-table
          :data="selectArr.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%">
          <el-table-column
            prop="indexNumber"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属门店"
            width="160">
          </el-table-column>
          <el-table-column
            prop="vip_name"
            label="会员级别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="vip_money"
            label="需求金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="vip_discount"
            label="享受折扣"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
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
                     :hide-on-single-page="isFeny"
                     :current-page="currentPage"
                     :page-sizes="pageSizes"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="selectArr.length">
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

          //一页不显示
          isFeny:true,
          isOpen:false,
          isShow: false,
          dialogVisible: false,
          editShow:false,
          deleteShow:false,
          user_id :'',
          shop_name: "",
          rank_name: "",
          discount_name: "",

          //添加输入v-model
          vip_money:'',
          vip_discount:'',//折扣
          vip_name:'',//级别
          //添加下的取消
          isFalse:false,
          //修改删除下标
          numberIndex:0,
          deleteIndex:0,
          deleteVip_id:0,
          //修改ID
          updateIndex:0,
          //查询数组
          selectArr:[],

          isDelete:true,
          // addList: [],
          pageNo: 1,//存储当前页码值
          pageSize: 10,//设置每页条数
          currentPage: 1,//总页码
          pageSizes:[10],//当前页选择显示条数
          // tableData4: [],
          detailFormVisible:false,//控制模态框隐藏
          object:{},
        }
      },
      created(){
        this.postData()
      },
      methods: {

          /**
         * @Description: 请求每页VIP设置数据
         * @author lxy
         * @date 2019/06/06 09:34:48
         */

        postData(){
          let api = this.$api.vipManage.VipLevelSelect;
          this.$axios.post(api,{
            "page":1,
            "strip":10
          },this.$config).then(data=>{
            let newArr = data.data.data.vip;
            for (let i = 0 ; i < newArr.length ; i ++ ){
              newArr[i].name = '魅力女人';
              newArr[i].indexNumber = i + 1 ;
              this.selectArr.push(newArr[i])
            }
            // console.log(this.selectArr);
          })
        },

          /**
           * @Description: 提示信息
           * @author lxy
           * @date 2019/06/06 15:47:19
          */

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
          open6() {
          this.$notify({
            title: '提示',
            message: '添加或修改失败,不能有空值,\n折扣需大于0.01,且小于1',
            type: 'success',
          });
        },
          open7() {
          this.$notify({
            title: '提示',
            message: '服务器数据异常，删除失败',
            type: 'info',
          });
        },
        openNine() {
          this.$notify({
            title: '提示',
            message: '您取消了修改',
            type: 'info',
          });
        },

        /**
         * @Description: 添加
         * @author lxy
         * @date 2019/06/06 15:19:47
         */

        //添加
        addFun() {
          this.isShow = true;
          this.text = '添加信息';
          this.vip_name = '' ;
          this.vip_money = '' ;
          this.vip_discount = '' ;
        },
        //添加下的保存
        saveFun() {
          let api = this.$api.vipManage.VipLevelInsert;
          let addList = [] ;
          addList.vip_id = '';
          this.isShow = false;
          addList.vip_name = this.vip_name;
          addList.vip_money = this.vip_money;
          addList.vip_discount = this.vip_discount;
          addList.name = '魅力女人';
          addList.indexNumber = this.selectArr.length + 1;
          if(
            (this.vip_name !== '')&&
            (this.vip_money !== '' ) &&
            (this.vip_discount !== '' )&&
            (this.vip_discount >= 0.01)&&
            (this.vip_discount < 1 )){
            this.selectArr.push(addList);
            console.log(this.selectArr);
            this.$axios.post(api,{
              "vip_name":addList.vip_name,
              "vip_discount":addList.vip_discount,
              "vip_money":addList.vip_money
            },this.$config).then(data=>{
            })
            this.open3();
          }
          else {
            this.open6();
          }

        },

        /**
         * @Description: 修改
         * @author lxy
         * @date 2019/06/06 15:21:18
        */

        //点击修改
        handleClick(index,row) {
          this.numberIndex = index  ;
          // this.indexNumber = index+1;
          this.updateIndex = row.vip_id;
          this.vip_money = this.selectArr[this.numberIndex].vip_money;
          this.vip_name = this.selectArr[this.numberIndex].vip_name;
          this.vip_discount = this.selectArr[this.numberIndex].vip_discount;
          this.isOpen = true;
          // console.log('sex='+this.updateIndex);
        },
        //修改下的保存
        reviseFun(){
          let arr = {};
          arr.indexNumber = this.numberIndex + 1;
          arr.name = '魅力女人';
          arr.vip_name = this.vip_name;
          arr.vip_money = this.vip_money;
          arr.vip_discount = this.vip_discount;

          let api = this.$api.vipManage.VipLevelUpdate;
          if(
            (this.vip_name !== '')&&
            (this.vip_money !== '' ) &&
            (this.vip_discount !== '' )&&
            (this.vip_discount >= 0.01)&&
            (this.vip_discount < 1 )) {
            //this.$api.vipManage.VipLevel
            this.$axios.post(api, {
              "vip_id": this.updateIndex,
              "vip_name": arr.vip_name,
              "vip_discount": arr.vip_discount,
              "vip_money": arr.vip_money
            }, this.$config).then(data => {
              console.log(data);
            })

            this.selectArr[this.numberIndex] = arr;

          var newlinshi= [];
          for(var i = 0 ; i < this.selectArr.length ; i ++ ){
            if( i === this.numberIndex){
              newlinshi.push(arr);
            }else{
              newlinshi.push(this.selectArr[i]);
            }
          }
          this.$set(this.$data,'selectArr',newlinshi);


          this.isOpen = false;
            this.open4();
          }
          else this.open6();
        },

        /**
         * @Description: 删除 /VipLeveldelete/非遍历删除
         * @author lxy
         * @date 2019/06/06 16:31:45
        */

        //删除
        deleteClick (index,row){
          this.deleteIndex = index;
          this.deleteVip_id = row.vip_id;
          console.log(this.deleteVip_id);
        },
        //是否确认
        openFive() {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            let api = this.$api.vipManage.VipLeveldelete;
            this.$axios.post(api,{
              "vip_id":this.deleteVip_id
            },this.$config).then(data=>{
              console.log(data);
              if( data.data.returnCode === "200" ){
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                });
                this.selectArr.splice(this.deleteIndex,1)
              }
              else {
                this.open7()
              }
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**
         * @Description: 分页
         * @author lxy
         * @date 2019/06/06 17:17:39
        */

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
    height: 50px;
  }
  span{
    margin-top: 15px;
    font-size: 15px;
    color: gray;
  }
  span:nth-child(1){
    margin-left: 20px;
  }
  .add_button{
    margin: 15px 0 0 15px;
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
  .content{
/*border: 1px darkred solid;*/
  }
  .count{
    padding: 20px 40px 20px 20px;
  }
</style>
