<template>
  <div>
    <div class="body">
      <div class="body-top">
        <el-card class="column" style="  display: flex;">
          <div class="column-photo">
            <img src="../assets/people.svg" alt />
          </div>
          <div class="numbre">
            <div>New Visits</div>
          
            <div><countTo :startVal='0' :endVal= '`${arr.visits}`' :duration='3600'></countTo></div>
          </div>
        </el-card>
        <el-card class="column">
          <div class="column-photo">
            <img src="../assets/news.svg" alt />
          </div>

          <div class="numbre">
            <div>Messsges</div>
            <div><countTo :startVal='0' :endVal= '`${arr.messages}`' :duration='3600'></countTo></div>
           
          </div>
        </el-card>

        <el-card class="column">
          <div class="column-photo">
            <img src="../assets/money.svg" alt />
          </div>

          <div class="numbre">
            <div>Purchases</div>
            <div><countTo :startVal='0' :endVal='`${arr.purchases}`' :duration='3600'></countTo></div>
           <div>
            
           </div>
          </div>
        </el-card>

        <el-card class="column">
          <div class="column-photo">
            <img src="../assets/car.svg" alt />
          </div>

          <div class="numbre">
            <div>Shopping</div>
            <div><countTo :startVal='0' :endVal='`${arr.shopping}`' :duration='3600'></countTo></div>
        
          </div>
        </el-card>
      </div>

      <el-card class="Broken">
        <ve-line :data="chartData" :Settings="chartSettings"></ve-line>
      </el-card>

      <div class="dendrogram">
        <!-- 雷达图 -->
        <el-card class="dv">
          <ve-radar :data="chartData1" :Settings="chartSettings1"></ve-radar>
        </el-card>
        <!-- 饼图 -->
        <el-card class="dv">
          <ve-pie :data="chartDatap" :Settings="chartSettingsp"></ve-pie>
        </el-card>
        <!-- 树状图 -->
        <el-card class="dv">
          <ve-histogram :data="chartData" :Settings="chartSettings"></ve-histogram>
        </el-card>
      </div>

      <div class="bottom">
        <el-card class="bottom-left">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="num" label="Order-No" width="300"></el-table-column>

            <el-table-column prop="price" label="Price" width="180"></el-table-column>

            <el-table-column prop="status" label="Status">
              <template slot-scope="scope">
                <!-- template只能执行表格 -->
                <div>
                  <el-tag type="danger" class="nall" v-if="scope.row.status===0">pending</el-tag>
                  <el-tag class="nali" v-if="scope.row.status===1">success</el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card class="dv1">
          <todolist></todolist>
        </el-card>

        <el-card class="dv1">
          <div>
            <img
              src="http://tiebapic.baidu.com/forum/wh%3D200%2C90%3B/sign=2f3110e739dda3cc0bb1b02231d91538/a7196e061d950a7b660fc7bc1dd162d9f2d3c9a6.jpg"
              alt
              class="photo"
            />
          </div>
          <div v-for="(item,index) in list" :key="index">
            {{item.name}}
            
              <div v-if="item.progress===1">
              <el-progress :percentage="parseInt(item.progress*100)" status="success"></el-progress>
            </div>
            <div v-if="item.progress!==1">
              <el-progress :percentage="parseInt(item.progress*100)"></el-progress>
            </div>
           
            
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import Todolist from "../components/Todolist";
export default {
  components: {
   countTo,
    Todolist
  },
  data() {
    this.chartSettings = {
      xAxisType: "time"
    };
    return {
    
     
       
      arr: {},
      list: [],

      //折线图
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      chartSettings: {
        metrics: ["expected", "actual"],
        dimension: ["date"]
      },

      // 雷达图
      chartData1: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "delelopmer",
          "marketing"
        ],
        rows: []
      },
      chartSettings1: {
        metrics: [
          "sales",
          "ministration",
          "delelopmer",
          "marketing",
          "techology"
        ],
        dimension: ["name"]
      },

      // 饼图
      chartDatap: {
        columns: ["name", "data"],
        rows: []
      },
      chartSettingsp: {
        metrics: ["data"],
        dimension: ["name"]
      },

      //条形图
      chartDatab: {
        columns: ["name", "progress"],
        rows: []
      },
      chartSettingsb: {
        metrics: ["name", "progress"],
        dimension: []
      },

      tableData: []
    };
  },

  methods: {
    // 顶部数据
    getData() {
      this.$axios
        .req("/homeData")
        .then(res => {
          this.arr = res.data;
          console.log(arr)
        })
        .catch(err => {
          console.log(err);
        });
    },
    //折线图
    getData1() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          this.chartData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //雷达图
    getData3() {
      this.$axios
        .req("/radarChat")
        .then(res => {
          this.chartData1.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //饼图
    getData4() {
      this.$axios
        .req("/ringChat")
        .then(res => {
          this.chartDatap.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //Order数据
    getData2() {
      this.$axios
        .req("/orderData ")
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //条形图
    getData5() {
      this.$axios
        .req("/progress ")
        .then(res => {
          this.list = res.data;
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
    this.getData1();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
  },

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.body {
  height: 100%;
}
.body-top {
  display: flex;
  justify-content: space-around;
}
.column {
  width: 300px;
  height: 90px;

  margin: 10px 1px;
}
.numbre {
  width: 100px;
  height: 50px;
  font-size: 17px;
  margin: -100px 160px;
  line-height: 30px;
}
.column-photo {
  width: 100px;
  height: 100px;

  margin-top: -10px;
}
.Broken {
  width: 1330px;
  height: 400px;
  margin-left: 20px;
}
.dendrogram {
  display: flex;
}
.dv {
  width: 416px;
  height: 400px;

  margin: 10px 20px;
}
.bottom {
  display: flex;
}
.bottom-left {
  width: 655px;
  height: 500px;

  margin: 10px 20px;
}

.dv1 {
  width: 310px;
  height: 500px;

  margin: 10px 10px;
}
.Order {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
}
.Order-data {
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: space-around;
}
.Order-data > span {
  width: 30px;
  height: 30px;
  border: 1px solid red;
}
.photo {
  width: 100%;
  height: 200px;
}
.nall {
  width: 60px;
  height: 30px;
  color: red;
  background-color: #68151538;
}
.nali {
  width: 60px;
  height: 30px;
  color: green;
  background-color: #68151538;
}
</style>
