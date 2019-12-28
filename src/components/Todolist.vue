<template>
  <div>
    <div class="todolist-rop">
      <div class="el-icon-arrow-down" @click="clickDoen"  :v-model="checkbos"></div>
      <div>todo list</div>
    </div>
    <div class="todolist-body">
      <div class="todolist-write" v-for="(item,index) in list1" :key="index">
        <input type="checkbox" v-model="item.checked" />
        {{item.name}}
        <span class="el-icon-circle-close" @click="clickIns(index)"></span>
      </div>
    </div>
    <div class="todolist-buttom">
      <div class='nus' >items left</div>
      <div class='nus' @click="clickAll">All</div>
      <div class='nus' @click="clickA">Active</div>
      <div class='nus' @click="clickc">completent</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
         arr1: [],
      checkbos:false,
      list1: [
        { name: "star this repository", checked: true },
        { name: "fork this repository", checked: false },
        { name: "follow author", checked: true },
        { name: "vue", checked: true },
        { name: "element-ui", checked: true },
        { name: "axios", checked: true },
        { name: "webpack", checked: true }
      ],
   
    };
  },
  components: {},
  methods: {
    clickDoen() {
      //定义一个按钮，给它一个布尔值，让它等于它相反布尔值.然后绑定数组，对数组进行判断是否全部被选中
      this.checkbox=!this.checkbox
      this.arr1.map(item => {
       
          item.checked=this.checkbox
        
        // else if(item.checked === true){
        //  item.checked =false;
        // }
        
        ///让本身不等于本身
        // if(item.checked===ture){
        //   console.log(2);
        //    item.checked=false;
        // }
        // else{
        //   item.checked=ture;
        // }
      });
    },

    clickIns(index) {
      this.list1.splice(index, 1);
    },
    clickAll() {
      this.list1 = this.arr1;
    },
    clickA() {
      this.list1 = this.arr1.filter(item => {
        return item.checked;
      });
    },
    clickc() {
      this.list1 = this.arr1.filter(item => {
        return item.checked === false;
      });
    }
  },
  mounted() {
    this.arr1 = this.list1;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.todolist-rop {
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: space-between;
  line-height: 30px;
}

.todolist-body {
  width: 100%;
  height: 400px;
  border-top: 1px solid black;
}
.todolist-buttom {
  width: 100%;
  height: 60px;
  border-top: 1px solid black;
  display: flex;
  justify-content: space-around;
}
.nus {
  width: 65px;
  height: 30px;
  font-size: 12px;
  text-align: center;
 
  margin-top: 5px;
  line-height: 30px;
}
.nus：hover {
 border-block: 1px solid black;

}
.todolist-write {
  width: 100%;
  height: 50px;

  line-height: 60px;
}
.el-icon-circle-close {
  width: 20px;
  height: 20px;
  display: none;
  line-height: 70px;
  float: right;
}
.todolist-write:hover .el-icon-circle-close {
  display: block;
}
</style>