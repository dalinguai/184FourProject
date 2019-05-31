<template>
  <el-card class="modifyBox">
    <div slot="header" class="clearfix proSelector">
      <template>
        <div class="p-left">
          <strong id="optionStr">选择产品</strong>
          <el-select v-model="proSelectorOption" title="选择产品">
            <el-option
              v-for="item in ordModList"
              :key="item.Commodity_name"
              :label="item.Commodity_name"
              :value="item.Commodity_name">
            </el-option>
          </el-select>
        </div>
        <div class="p-right">
          <div>
            <span>消费金额：</span>
            <span v-text="currentProPriceCount"></span>
          </div>
          <el-button style="float: right;" size="middle">返回</el-button>
        </div>
      </template>
    </div>
    <div class="ordCorrect">
      <div>
        <label for="commodity_shoppingTrolley_commodityAmoun">产品售价</label>
        <el-input v-model="currentProTableData.commodity_shoppingTrolley_commodityAmoun"
                  style="width: 180px" id="commodity_shoppingTrolley_commodityAmoun">
        </el-input>
      </div>
      <div>
        <label for="commodity_number">产品数量</label>
        <el-input v-model="currentProTableData.commodity_number " style="width: 180px" id="vip_discount"></el-input>
      </div>
      <div>
        <label for="vip_discount">会员折扣</label>
        <el-input-number :step="0.05" v-model="currentProTableData.vip_discount"
                         :min="0" :max="1" label="输入数量" id="commodity_number"></el-input-number>
      </div>
      <div>
        <el-button>保存</el-button>
      </div>
    </div>
    <div class="ordTipBox">
      <div class="odrTip">
        <div>
          <span>销售人员列表：</span>
          <el-button>添加销售人员</el-button>
        </div>
        <div>
          <span>温馨提示：</span>
          <span>员工业绩与提成在收银结账后显示</span>
        </div>
      </div>
      <div>
        <el-table :data="currentProSteward" style="width: 100%;border:1px solid #EBEEF5" height="220">
          <el-table-column prop="userType_id" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="user_name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="userType_name" label="角色" width="100">
          </el-table-column>
          <el-table-column prop="userType_commissionRate" label="员工占比" width="100">
          </el-table-column>
          <el-table-column label="备注" width="180">
            <template slot-scope="scope">
              <p>{{ scope.row.userType_remark | remarkFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" @click="dialogFormVisible = true">修改</el-button>
              <el-button size="small" @click="deleteConfirm(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--模态框-->
    <el-dialog title="修改员工" :visible.sync="dialogFormVisible" class="dialogSize" width="300px">
      <el-form :model="form">
        <el-form-item label="员工名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="销售角色" :label-width="formLabelWidth">
          <el-select v-model="form.region">
            <el-option label="销售员工" value="销售员工"></el-option>
            <el-option label="销售顾问" value="销售顾问"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售占比" :label-width="formLabelWidth">
          <el-input v-model="form.Proportion" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: "ordModify",
    data() {
      return {
        formLabelWidth: '80px',
        form: {
          name: '',
          region: '销售员工',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          Proportion: '',
        },
        dialogFormVisible: false,
        ordModList: [],
        proSelectorOption: '',//产品选择的数据绑定
        currentProPriceCount: 0,
        currentProTableData: {},
        currentIndex: 0,
        currentProSteward: [{
          user_name: "员工1",
          userType_id: "1",
          userType_commissionRate: "0.2",
          userType_name: "销售",
          userType_remark: "",
          Working_status: "离职",
        },
          {
            user_name: "员工2",
            userType_id: "2",
            userType_name: "技师",
            userType_commissionRate: '0.2',
            userType_remark: '这是一个好员工，hin棒。',
            Working_status: "24小时在职",
          }],
        modalFormData: [{}],

      }
    },
    methods: {
      //页面初始化
      pageInit() {
        this.proSelectorOption = this.ordModList[this.currentIndex].Commodity_name;
        this.currentProTableData = this.ordModList[this.currentIndex];
      },
    },
    filters: {
      countFormat(value) {
        if (!value) return '';
        console.log(value);
        return value.toString() + "%";
      },
      remarkFormat(value) {
        if (!value)
          return '无';
        else
          return value;
      }
    },
    //获取数据
    beforeMount() {
      this.$axios.get('http://5cee59d21c2baf00142cbdf5.mockapi.io/carInfo').then((res) => {
        // console.log(res);
        this.ordModList = res.data;
        this.pageInit();
        console.log(this.ordModList);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
</script>

<style scoped>
  .modifyBox {
    width: 790px;
  }

  .proSelector strong {
    font-size: 18px;
    margin-right: 15px;
    line-height: 40px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .p-left {
    float: left;
  }

  .proSelector .p-right {
    float: right;
  }

  .p-right > div {
    display: inline-block;
    margin-right: 200px;
    line-height: 40px;
    font-size: 18px;
  }

  .p-right > div > span:nth-child(1) {
    font-weight: 700;

  }

  .ordCorrect {
    display: flex;
    justify-content: space-around;
  }

  .ordCorrect > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ordCorrect > div:last-child {
    justify-content: flex-end;
  }

  .ordCorrect > div > label {
    margin-bottom: 10px;
    font-weight: 700;
  }

  .odrTip {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0 ;
    padding-top: 20px;
    position: relative;
  }

  .odrTip::after {
    display: block;
    content: "";
    width: 100%;
    border: 1px solid #EBEEF5;
    position: absolute;
    top: 0;
    left: 0;
  }
  .odrTip > div:nth-child(1) > span {
    font-weight: 700;
    margin-right: 5px;
  }
  .odrTip > div:nth-child(2) > span {
    line-height: 40px;
    height: 40px;
  }

  .odrTip > div:nth-child(2) > span:nth-child(1) {
    font-weight: 700;
  }

  .odrTip > div:nth-child(2) {
    font-size: 14px;
  }
</style>
