<template>
  <div>
    <el-input placeholder="请输入内容" v-model="search" clearable></el-input>
    <el-table
      ref="singleTable"
      :data="list.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column property="NAME" label="名称" width="450"></el-table-column>
      <el-table-column property="GOODS_SERIAL_NUMBER" label="商品编号" width="320"></el-table-column>
      <el-table-column property="ORI_PRICE" label="原价" width="220"></el-table-column>
      <el-table-column property="PRESENT_PRICE" label="现价" width="220"></el-table-column>
      <el-table-column property="address" label="操作" width="220">
        <template slot-scope="scope">
          <el-button class="el-icon-edit" type="success" @click="sss(scope.row)">修改</el-button>

          <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="名称：" :label-width="formLabelWidth">
                <el-input v-model="form.NAME" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="原价：" :label-width="formLabelWidth">
                <el-input v-model="form.ORI_PRICE" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="现价：" :label-width="formLabelWidth">
                <el-input v-model="form.PRESENT_PRICE" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <!-- <el-button class='el-icon-edit' type="success" @click='clickauW'>
             
          修改</el-button>-->

          <el-button
            class="el-icon-delete"
            type="danger"
            @click.native.prevent="clicktn(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 15, 20, 40]"
        :page-size="0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>





    <!-- 导入xis -->


    <div style=" display: flex;">
         <download-excel
    class = "export-excel-wrapper"
    :data = "list.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
    :fields = "list.fields"
    type='xls'
    name = "导入xls"
    >
    <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
    <!-- <el-button type="primary" size="small">导出EXCEL</el-button> -->
</download-excel>
 <!-- <download-excel
    class = "export-excel-wrapper"
    :data = "list"
    :fields = "list_fields"
    type='csv'
    name = "导入csv"
    style=" display: flex; background-color:red;"
    > -->
    <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
    <!-- <el-button type="primary" size="small">导出EXCEL</el-button> -->
<!-- </download-excel> -->
    </div>
 
    <!-- <el-button type="success">导入xis</el-button>
    <el-button type="danger">导出csv</el-button> -->
  </div>
</template>

<script>
import{log} from "util"
export default {
  data() {
    return {
          list_fields: {
          "Complete name": "name", //常规字段
          Telephone: "phone.mobile", //支持嵌套属性
          "Telephone 2": {
            field: "phone.landline",
            //自定义回调函数
            callback: value => {
              return `Landline Phone - ${value}`;
            }
          }
        },
       
        // list_meta: [
        //   [{
        //     " key ": " charset ",
        //     " value ": " utf- 8 "
        //   }]
        // ],



      ove: [],
      search: "",
      list: [],
      currentPage: 1,
      pagesize: 10,
      form: {},

      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      arr: {}
    };
  },
  components: {},
  methods: {
    sss(row) {
      this.dialogFormVisible = true;
   
    
        this.form = row;
    
    },

    // clickauW() {
    //   console.log(1);
    //   this.$prompt("请输入邮箱", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputPattern: "",
    //     inputErrorMessage: "修改不能为空不正确"
    //   })
    //     .then(({ value }) => {
    //       this.$message({
    //         type: "success",
    //         message: "名称: " + value
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "取消输入"
    //       });
    //     });
    // },

    clicktn(index) {
      this.list.splice(index, 1);
    },
    clickauw() {},
    getData() {
      this.$axios
        .req("/tableData")
        .then(ser => {
          this.list = ser.data;
          this.ove = this.list;
          // console.log(ser.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    }
  },
  mounted() {
    this.getData();
    this.arr = this.list;
  },
  watch: {
    search(val) {
      this.list = this.ove.filter(item => {
        console.log(1);
        return JSON.stringify(item).includes(val);
      });
    }
  },
  computed: {}
};
</script>


<style scoped lang='scss'>
.export-excel-wrapper{
  width: 160px;
  height: 30px;
  line-height: 30px;

  text-align: center;
  color: white;
  background-color: green;
  border-radius: 4px;
  
}
</style>