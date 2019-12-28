<template>
  <el-card class="all">
    <div class="top">
      <div style="display: flex; background-color:#7CCABF;">
        <div style="flex:5;">
          <div>今日文章</div>
          <div>{{length2}}</div>
        </div>

        <div class="el-icon-check" style="flex:1"></div>
      </div>

      <div>
        <div style="display: flex;background-color:#E88A87;">
          <div style="flex:5">
            <div>原创文章</div>
            <div>{{length1}}</div>
          </div>

          <div class="el-icon-tickets" style="flex:1"></div>
        </div>
      </div>
      <div>
        <div style="display: flex; background-color:#8375A3;">
          <div style="flex:5">
            <div>新消息</div>
            <div>0</div>
          </div>

          <div class="el-icon-bell" style="flex:1"></div>
        </div>
      </div>
      <div>
        <div style="display: flex; background-color:#9FCEC1;">
          <div style="flex:5">
            <div>新留言</div>
            <div>0</div>
          </div>

          <div class="el-icon-phone-outline" style="flex:1"></div>
        </div>
      </div>
    </div>



    <div style="display: flex;   justify-content: center;" class="all-plot">
      <div class="plot">
        <ve-pie :data="chartDatap"></ve-pie>
        <!-- 饼图 -->
      </div>

      <div class="plot">
        <ve-pie :data="chartDatat"  :settings="chartSettings"></ve-pie>
      </div>
    </div>

    <div class="all-buttom">
       <ve-waterfall :data="chartData" ></ve-waterfall>
       </div>
  </el-card>
</template>

<script>
export default {
  data() {
     this.chartSettings = {
        roseType: 'radius'
      }
    return {
      length1: 0,
      length2: 0,
      list: [],

      chartDatap: {
        columns: ["categi", "nunber"],
        rows: []
      },
      chartDatat: {
        columns: ["categit", "nunbert"],
        rows: []
      },
       chartData: {
        columns: ["categie", "nunbere"],
        rows: []
      },
      //   chartSettingsb: {
      //   metrics: ["categie", "nunbere"],
      //   dimension: []
      // },
      
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.list = res.data;
          this.list.map(item => {
            if (item.source === "原创") {
              this.length1++;
            }
            item.date = this.$dayjs(item.date).format("YYYY-MM-DD");
            if (item.date === this.$dayjs().format("YYYY-MM-DD")) {
              this.length2++;
            }
          });
          let category = this.$lodash.groupBy(this.list, "category");

          for (let i in category) {
            this.chartDatap.rows.push({
              categi: i,
              nunber: category[i].length
            });
          }
          let source = this.$lodash.groupBy(this.list, "source");

          for (let f in source) {
            this.chartDatat.rows.push({
              categit: f,
              nunbert: source[f].length
            });
          }

           let date = this.$lodash.groupBy(this.list, "date");

          for (let f in date) {
            this.chartData.rows.push({
              categie: f,
              nunbere: date[f].length
            });
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    //   getData4() {
    //     this.$axios
    //       .req("/ringChat")
    //       .then(res => {
    //         this.chartDatap.rows = res.data;
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   },
  },
  mounted() {
    this.getData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 100%;
 
  margin: 10px 10px;
}
.top {
  display: flex;
  justify-content: center;
}
.top > div {
  width: 300px;
  height: 60px;
  
  line-height: 30px;
  text-align: center;
}
.el-icon-check {
  float: right;
  line-height: 60px;
}
.el-icon-tickets {
  line-height: 60px;
}
.el-icon-bell {
  line-height: 60px;
}
.el-icon-phone-outline {
  line-height: 60px;
}
.plot {
  width: 600px;
  height: 300px;
  
}
.all-buttom {
  width: 1200px;
  height: 500px;
  margin: 0 auto;
 

}
// all-plot{
// display: flex;
//     justify-content: center;

// }
</style>