<template>
    <div>
      <div>
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
                    <option v-for="item  in sexOptions" :name="item.value" :value="item.name">
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
    <el-button  class="huang">保存</el-button>
    <el-button plain class="hui" type="primary">转为散户</el-button>
  </span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "VipDetail",
      data() {
        return {
          editShow:true,
        }
      },
      methods:{
        kill(){
          let a = VipList.vipDetail;
          console.log(a);
        }
      }
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
  /*保存按钮和转为散户*/
.huang{
  background: chocolate;
  color: white;
}
.hui{
  background: #666666;
  color: white;
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
</style>
