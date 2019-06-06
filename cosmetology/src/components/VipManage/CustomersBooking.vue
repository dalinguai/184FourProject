<template>
  <div>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :default-value="defaultDate"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-button type="success">查询</el-button>
    <el-button type="success" @click="showModal">添加预约</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="subscribe_startTime"
        label="开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="subscribe_lastTime"
        label="结束时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="user_whetherInOffice"
        label="在职状态">
      </el-table-column>
      <el-table-column
        prop="courseTreatment_name"
        label="疗程名">
      </el-table-column>
      <el-table-column
        prop="customer_name"
        label="顾客姓名">
      </el-table-column>
    </el-table>
    <!--    模态弹出框-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="modal_text">填写预约信息</div>

      <div class="select_modal">
        <div class="modal_input">
          顾客姓名：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <!--     选择疗程-->
        <div class="modal_select">
          选择疗程：
          <el-select v-model="value" placeholder="选择疗程" @change="changeValue">

            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" >

            </el-option>
          </el-select>
        </div>
        <div class="modal_picker">
          选择时间：
        <el-time-picker
          is-range
          arrow-control
          v-model="value2"
          value-format="HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">

        </el-time-picker>
        </div>
        <div class="modal_input2">
          选择员工：
          <el-select v-model="value3" placeholder="请选择" @change="changeValue2">
            <el-option
              v-for="item in options2"
              :key="item.value3"
              :label="item.label3"
              :value="item.value3">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="closeModal">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },

          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //模态弹出框数据。
        options: [{
          value: '选项1',
          label: 'spaOne'
        }, {
          value: '选项2',
          label: 'spaTwo'
        }, {
          value: '选项3',
          label: 'spaThree'
        }],
        options2:[{
          value3:"选项",
          label3:"张三"
        },
          {
            value3:"2",
            label3:"李四"
          },{
            value3:"3",
            label3:"王五"
          }],
        value: '',
        input: '',
        defaultDate: '',
        value2: new Date(),
        value3:"",
        obj:{},
        obj2:{},
      }
    },
    created() {
      this.$axios.get(this.$api.vipManage.CustomerBooking).then(
        (res) => {
          console.log(res.data)
          this.tableData = res.data;
        }).catch((err) => {
        console.log(err)
      })
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
      changeValue(value) {

        this.obj = this.options.find((item)=>{
          return item.value === value;
        });
        console.log(this.obj.label)
      },
      changeValue2(value3){
        this.obj2 = this.options2.find((item)=>{
          return item.value3 === value3;
        });
        console.log(this.obj2)
      },
      showModal() {
        this.dialogVisible = true;
      },
      closeModal(){

        // console.log(this.input)
        // console.log(this.obj.label)
        // console.log(this.value2)
        this.dialogVisible = false;

      }
    }
  }
</script>

<style scoped>
  .select_modal {
    width: 350px;
    margin:0 auto;
  }
  .modal_input, .modal_select, .modal_input2,.modal_picker{
    margin-top:15px;
  }
  .modal_text{
    text-align: center;
    margin-bottom:25px;
  }
  .el-input {
    width: 260px;
  }
  .select_modal >>> .el-input__inner {
    width: 260px;
  }
</style>
