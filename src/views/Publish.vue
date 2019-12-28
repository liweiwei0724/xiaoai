<template>
  <div>
    <el-card class="all">
      <el-table :data="tableData" border style="width:88vw">
        <el-table-column label="#" width="40">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
          <!-- scope改变属性值 -->
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="author" label="作者" width="100"></el-table-column>
        <el-table-column prop="category" label="类目" width="100"></el-table-column>
        <el-table-column prop="source" label="来源" width="100"></el-table-column>
        <el-table-column prop="star" label="重要性" width="100"></el-table-column>
        <el-table-column prop="date" label="发布时间"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" class="nall" @click.native.prevent="clickcompile(scope.row._id)">编辑</el-button>

            <el-button type="success" class="nall" @click.native.prevent="clickin(scope.row._id)">删除</el-button>

            <el-button type="danger" class="nall" @click.native.prevent="clicksee(scope.row._id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},

  methods: {
    getData() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.tableData = res.data;
          this.tableData.map(item=>{
            item.date=this.$dayjs(item.date).format("YYYY年MM月DD日HH时mm分ss秒") 
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    clicksee(val) {
      //console.log(val);
      this.$router.push({ name: "see", query: { id: val } });
    },

clickcompile(val){
  //console.log(val);
   this.$router.push({ name: "compile", query: { id: val } });
},


    clickin(ids) {

      this.$axios
        .req("/article/delete", {_id:ids})//=this.tableData._id 
        .then(res => {

          this.getData();
            this.$message({
              type:"success",
              message:"删除成功"
            })
          
        })
        //删除post请求中某个数据
        //1.找到所需要的数据的位置，然后尝试打印出来
        //2.
        .catch(err => {
          console.log(err);
        });
    }
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
}
</style>