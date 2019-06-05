<template>
  <el-card class="box-card">
    <div class="topTitle clearfix">
      <h2>购买列表</h2>
      <div>
        <div v-for="item in tablePurInfo"></div>
      </div>
      <div class="t-btn">
        <el-button @click="backMain">返回</el-button>
      </div>
    </div>
    <div>
      <div class="proTittle" v-for="item in proSort"></div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加产品" name="first">
            <div class="midBar">
              <div>
                <el-input placeholder="请输入" v-model="input3" style="width:400px;">
                  <template slot="prepend">产品名称/编号</template>
                </el-input>
                <el-button>查询</el-button>
              </div>
              <div>
                <div>
                  <span>所属类别:</span>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in optionsBrand"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>所属系列:</span>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in optionsSeries"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-button>Go</el-button>
                </div>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData" border="true"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="所属店铺">
                        <span>{{ props.row.shop }}</span>
                      </el-form-item>
                      <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.shopId }}</span>
                      </el-form-item>
                      <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="商品描述">
                        <span>{{ props.row.desc }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="序号" prop="id">
                </el-table-column>
                <el-table-column label="产品编号" prop="name">
                </el-table-column>
                <el-table-column label="产品名称" prop="desc">
                </el-table-column>
                <el-table-column label="标价" prop="id">
                </el-table-column>
                <el-table-column label="是否打折" prop="id">
                </el-table-column>
                <el-table-column label="折扣" prop="id">
                </el-table-column>
                <el-table-column label="售卖数量" prop="id">
                </el-table-column>
              </el-table>
            </div>
            <div class="bottomBlock">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="添加护理" name="second">
            <div class="midBar">
              <div>
                <el-input placeholder="请输入" v-model="input3" style="width:400px;">
                  <template slot="prepend">产品名称/编号</template>
                </el-input>
                <el-button>查询</el-button>
              </div>
              <div>
                <div>
                  <span>所属类别:</span>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in optionsBrand"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <span>所属系列:</span>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in optionsSeries"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-button>Go</el-button>
                </div>
              </div>
            </div>
            <div>
              <el-table
                :data="tableData" border="true"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="所属店铺">
                        <span>{{ props.row.shop }}</span>
                      </el-form-item>
                      <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.shopId }}</span>
                      </el-form-item>
                      <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="商品描述">
                        <span>{{ props.row.desc }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="序号" prop="id">
                </el-table-column>
                <el-table-column label="产品编号" prop="name">
                </el-table-column>
                <el-table-column label="产品名称" prop="desc">
                </el-table-column>
                <el-table-column label="标价" prop="id">
                </el-table-column>
                <el-table-column label="是否打折" prop="id">
                </el-table-column>
                <el-table-column label="折扣" prop="id">
                </el-table-column>
                <el-table-column label="售卖数量" prop="id">
                </el-table-column>
              </el-table>
            </div>
            <div class="bottomBlock">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "ordPurchasing",
    data() {
      return {
        currentPage4: 1,
        activeName: 'first',
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
          {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      backMain(){
        this.$router.push({path: '/cashier/right'});
      },
    },
    filters: {},
    computed: {}
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .clearfix::after,
  .clearfix::before {
    display: table;
    content: "";
  }

  .clearfix::after {
    clear: both;
  }

  .box-card {
    width: 790px;
  }

  .topTitle {

  }

  .topTitle > h2 {
    float: left;
  }

  .topTitle .t-btn {
    float: right;
  }

  .midBar {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: flex-start;
  }

  .midBar > div:nth-child(1) {
    margin: 20px 0;
  }

  .midBar > div:nth-child(2) {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .midBar > div:nth-child(2) > div {
    margin: 0 10px;
  }

  .bottomBlock {
    margin: 20px 0;
  }
</style>
