<template>
  <div id="app" style="margin-top: 20px">
<!--    <el-button type="danger" style="float: right;margin-bottom: 8px">删除所选</el-button>-->
<!--    <el-button class="btnDelete" type="success" @click="addFun()" style="float: right;margin-right: 40px;margin-bottom: 10px">添加</el-button>-->
    <!--    //组件首页-->
    <div style="margin-bottom: 25px">
      <el-table :data="list" border style="width: 100%" stripe>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column fixed label="序号" width="55" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+(pageNo - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commoditybatch_number" label="商品批次号" align="center">
        </el-table-column>
        <el-table-column prop="commodityseries_name" label="商品类别" align="center">
        </el-table-column>
        <el-table-column prop="commodity_name" label="商品名" align="center">
        </el-table-column>
        <el-table-column prop="storage_balance" label="剩余库存量" align="center">
        </el-table-column>
        <el-table-column prop="commodityBatch_sale" label="成品售价" align="center">
        </el-table-column>
        <el-table-column prop="commodityBatch_cost" label="成品进价" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
<!--            <el-button type="text" size="small" @click="delFun(scope.$index,scope.row)">删除</el-button>-->
            <el-button type="text" size="small" @click="chukuFun(scope.$index)">出库</el-button>
            <el-button type="text" size="small" @click="rukuFun(scope.$index)">入库</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--页码-->
    <div id="pageTab" style="position: absolute">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[7,10,20,30]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
<!--    入库-->
    <div>
      <el-dialog :visible.sync="editShow" width="40%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>           
              <td style="width: 15%">成品售价</td>                     
              <td style="width:25%"><input type="text" v-model="commodityBatch_sale" /></td>   
              <td style="width: 15%">成品进价</td>                     
              <td style="width:25%"><input type="text" v-model="commodityBatch_cost" /></td>                
            </tr>
            <tr>           
              <td style="width: 15%">入库数量</td>                     
              <td style="width:25%"><input type="text" v-model="inStorage_quantity" /></td>   
              <td style="width: 15%"></td>                     
              <td style="width:25%"><input type="text" /></td>                
            </tr>
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="editShow = false">取 消</el-button>
    <el-button plain type="primary" @click="editSave">保 存</el-button>
          </span>
      </el-dialog>
    </div>
<!--    出库-->
    <div>
      <el-dialog :visible.sync="edShow" width="60%">
        <div class="sp-page-content">
          <p v-model="text">{{text}}</p>    
          <table class="sp-grid-job">       
            <tbody>                                     
            <tr>                                           
              <td style="width: 90px;">出库数量</td>
              <td style="width: 210px;"><input type="text" v-model="outStorage_quantity"/></td> 
              <td style="width: 90px">出库日期</td>
              <td style="width: 210px" >                                            
              <el-date-picker v-model="outStorage_time" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </td> 
            </tr>
            <tr>           
              <td style="width: 90px">备注</td>                     
              <td style="width:210px"><input type="text" v-model="outStorage_remark"/></td>   
              <td style="width: 90px"></td>                     
              <td style="width:210px"><input type="text"/></td>             
            </tr>     
            </tbody>                 
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click=" edShow= false">取 消</el-button>
    <el-button plain type="primary" @click="edSave">保 存</el-button>
          </span>

      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
      name: "inventory",
      data() {
        return {
          value1: '',
          list: [],
          text: '',
          obj: [],
          isShow: false,
          editShow:false,
          edShow:false,
          editList: {},
          pageNo: 1,//存储当前页码值
          pageSize: 7,//设置每页条数
          currentPage: 1,//总页码
          total:1,
          commodityBatch_id:"",
          commodity_id:"",
          commoditybatch_number:"",
          commodityseries_name:"",
          commodity_name:"",
          storage_balance:"",
          commodityBatch_sale:"",
          commodityBatch_cost:"",
          inStorage_remark:"",
          outStorage_time:"",
          outStorage_quantity:"",
          outStorage_remark:"",
          inStorage_quantity:"",
        }
      },
      created() {
        this.getUser();
      },
      methods: {
        getUser(){
          //向后台发起请求，获取数据
          this.$axios.post("http://172.17.1.236:8080/inStorage/selectAllStorage",{
            "pageCount":this.currentPage,"startIndex":this.pageSize
          },this.$config).then((res) => {
            console.log(res.data);
            this.list=res.data.data;
            this.total=res.data.totalItem;
          }).catch((err) => {
            console.log(err)
          })
        },
        //入库
        rukuFun(index){
          this.text = '入库信息';
          this.selectedId = index;
          this.editShow = true;
          this.edShow =false;
          console.log(this.list[index]);
          var editList = this.list[index];
          this.commodityBatch_sale = editList.commodityBatch_sale;
          this.commodityBatch_cost = editList.commodityBatch_cost;
          this.inStorage_quantity = editList.inStorage_quantity;
          this.commodity_id = editList.commodity_id;
        },
        editSave(event){
          this.editShow = false;
          this.edShow =false;
          this.list[this.selectedId].commodityBatch_sale = this.commodityBatch_sale;
          this.list[this.selectedId].commodityBatch_cost = this.commodityBatch_cost;
          this.list[this.selectedId].inStorage_quantity = this.inStorage_quantity;
          this.$axios.post("http://172.17.1.236:8080/inStorage/insertStorage",{
            "commodityBatch_sale": this.list[this.selectedId].commodityBatch_sale,
            "commodityBatch_cost": this.list[this.selectedId].commodityBatch_cost,
            "inStorage_quantity": this.list[this.selectedId].inStorage_quantity,
            "commodity_id" :this.commodity_id,
          },this.$config).then((res)=>{
            this.getUser();
          }).catch((err)=>{

          })
        },
        //出库
        chukuFun(index){
          this.text = '出库信息';
          this.selectedId = index;
          this.editShow = false;
          this.edShow =true;
          console.log(this.list[index]);
          var editList = this.list[index];
          this.outStorage_quantity = editList.outStorage_quantity;
          this.outStorage_time = editList.outStorage_time;
          // let a =new Date(this.outStorage_time).getTime()
          // console.log("时间"+a);
          this.outStorage_remark = editList.outStorage_remark;
          this.commodityBatch_id = editList.commodityBatch_id;

        },
        edSave(event){
          this.edShow = false;
          this.editShow = false;
          this.list[this.selectedId].outStorage_quantity = this.outStorage_quantity;
          this.list[this.selectedId].outStorage_time = this.outStorage_time;
          this.list[this.selectedId].outStorage_remark = this.outStorage_remark;
          console.log(this.outStorage_time);
          this.$axios.post("http://172.17.1.236:8080/outStorage/OutStorage",{
            "outStorage_quantity": this.list[this.selectedId].outStorage_quantity,
            "outStorage_time": this.list[this.selectedId].outStorage_time,
            "outStorage_remark": this.list[this.selectedId].outStorage_remark,
            "commodityBatch_id" :this.commodityBatch_id,
          },this.$config).then((res)=>{
            this.getUser();
          }).catch((err)=>{

          })
        },
        //分页
        handleSizeChange(val) {
          this.pageSize = val;
          this.getUser();
        },
        //切换每页条数
        handleCurrentChange(val) {
          this.currentPage = val;
          this.pageNo = val;
          this.getUser();
        }
      }
    }
</script>

<style scoped>
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
</style>
