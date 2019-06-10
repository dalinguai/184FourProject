<template>
  <div class="contain">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      value-format="yyyy-MM-dd HH:mm:ss"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>

    <el-button type="success" @click="searchNewList">查询</el-button>
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
        prop="courseTreatment_name"
        label="疗程名">
      </el-table-column>
      <el-table-column
        prop="customer_name"
        label="顾客姓名">
      </el-table-column>
      <el-table-column
        align="left" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8]"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totalCount">
      </el-pagination>
    </div>
    <!--    模态弹出框-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="modal_text">填写预约信息</div>

      <div class="select_modal">
        <div class="modal_input">
          手机号码：
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
              :value="item.value"
              :courseTreatment_id="item.courseTreatment_id"
            >

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
              :value="item.value3"
              :user_id="item.user_id">
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
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(new Date(new Date().toLocaleDateString()).getTime()), new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)],
        //模态弹出框数据。
        options: [{
          value: '选项1',
          label: '芦荟刮痧排毒醒肤术',
          courseTreatment_id:"1"
        }, {
          value: '选项2',
          label: '再生抗皱滋养护理疗程',
          courseTreatment_id:"2"
        }, {
          value: '选项3',
          label: '控油美白补水平衡疗程',
          courseTreatment_id:"3"
        }, {
          value: '选项4',
          label: '抗敏舒缓水份疗程',
          courseTreatment_id:"4"
        }],
        options2: [
          {
            value3: "1",
            label3: "姚舒",
            user_id:"1"
          },
          {
            value3: "2",
            label3: "应含莲",
            user_id:"2"
          }, {
            value3: "3",
            label3: "谢振华",
            user_id:"5"
          }, {
            value3: "4",
            label3: "诸小梅",
            user_id:"6"
          }
        ],
        value: '',
        input: '',
        defaultDate: '',
        // value2: ["2019-06-10","2019-06-11"],
        value2:'',
        value3: "",
        obj: {},
        obj2: {},
        user_id: "",
        startIndex: "",
        pageCount: "",
        stratTime: "",
        endTime: "",
        currentPage: 1,//当前页
        pageSize: 8,//每页显示数据
        totalCount: 0,//总条数
        nlist:[],
      }
    },
    created() {
      this.newList2();
    },
    methods: {
      newList(){
        // var date = new Date(new Date(new Date().toLocaleDateString()).getTime());
        // var year = date.getFullYear();//年
        // var month = date.getMonth();//月
        // var day = date.getDate();//日
        // var time = year +"-"+ (month+1)+"-"+day
        // var startTime = time+" "+"00:00:00"
        // var endTime = time+" "+"23:59:59"
        console.log(this.value1[0])
        this.$axios.post(this.$api.vipManage.CustomerBooking, {
          pageCount: this.currentPage,//当前页
          startIndex: "8",//每页显示多少条
          stratTime: this.value1[0],
          endTime: this.value1[1],
        }, this.$config).then(
          (res) => {
            console.log(res.data)
            this.totalCount = res.data.totalItem
            this.tableData = res.data.data
            console.log('产看数据');
            console.log(this.tableData);
            for (let i = 0;i < this.tableData.length;i ++){
              this.tableData[i].subscribe_lastTime = this.subscribe(this.tableData[i].subscribe_lastTime);
              this.tableData[i].subscribe_startTime = this.subscribe(this.tableData[i].subscribe_startTime)
            }
          }).catch((err) => {
          console.log(err)
        })
      },
      newList2(){
        var date = new Date();
        var year = date.getFullYear();//年
        var month = date.getMonth();//月
        var day = date.getDate();//日
        var time = year +"-"+ (month+1)+"-"+day
        var startTime = time+" "+"00:00:00"
        var endTime = time+" "+"23:59:59"
        this.$axios.post(this.$api.vipManage.CustomerBooking, {
          pageCount: this.currentPage,//当前页
          startIndex: "8",//每页显示多少条
          stratTime: startTime,
          endTime: endTime,
        }, this.$config).then(
          (res) => {
            console.log(res.data)
            this.totalCount = res.data.totalItem
            this.tableData = res.data.data
          }).catch((err) => {
          console.log(err)
        })
      },
      searchNewList(){
        this.newList();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      },
      changeValue(value) {

        this.obj = this.options.find((item) => {
          return item.value === value
        })
        console.log(this.obj)
      },
      changeValue2(value3) {
        this.obj2 = this.options2.find((item) => {
          return item.value3 === value3
        })
        console.log(this.obj2)
      },
      showModal() {
        this.dialogVisible = true
      },
      closeModal() {
        var date = new Date();
        var year = date.getFullYear();//年
        var month = date.getMonth();//月
        var day = date.getDate();//日
        var time = year +"-"+ (month+1)+"-"+day
        var startTime = time +" "+this.value2[0];
        var endTime = time+ " "+this.value2[1];
        this.$axios.post(this.$api.vipManage.CustomerBookingAdd, {
          customer_phone:this.input,
          // subscribe_startTime:this.value2[0],
          // subscribe_lastTime:this.value2[1],
          subscribe_startTime:startTime,
          subscribe_lastTime:endTime,
          user_id:this.obj2.user_id,
          courseTreatment_id:this.obj.courseTreatment_id,
        }, this.$config).then(
          (res) => {
           this.newList2();
            // this.tableData = res.data.data
          }).catch((err) => {
          console.log(err)
        })
        this.dialogVisible = false

      },
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(row.subscribe_id)
        this.$axios.post(this.$api.vipManage.CustomerBookingUpdate, {
          subscribe_id:row.subscribe_id,
        }, this.$config).then(
          (res) => {
            console.log(res.data)
            this.newList();
          }).catch((err) => {
          console.log(err)
        })
      },
      handleSizeChange(currentPage,pageSize) {//每页显示多少条
        var newList = [];
        newList = this.nlist.slice(pageSize*(currentPage-1),pageSize*currentPage)
        this.tableData = newList;
      },
      handleCurrentChange(currentPage) {//当前页
        this.currentPage = currentPage;
        this.tableData = [];
        this.newList()
      },
      add0(m){return m<10?'0'+m:m },
      subscribe(value){
        var time = new Date(value);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
      }
    },
  }
</script>

<style scoped>
  .page{
    text-align: center;
  }
  .select_modal {
    width: 350px;
    margin: 0 auto;
  }

  .modal_input, .modal_select, .modal_input2, .modal_picker {
    margin-top: 15px;
  }

  .modal_text {
    text-align: center;
    margin-bottom: 25px;
  }

  .el-input {
    width: 260px;
  }

  .select_modal >>> .el-input__inner {
    width: 260px;
  }

  .is-leaf {
    text-align: center;
  }
  .contain{
    margin: 15px;
  }
  .el-table{
    margin-top: 15px;
  }
</style>
