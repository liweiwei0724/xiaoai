<template>
  <el-card class="Unread">
    <el-tabs v-model="activeName" @tab-click="handleClick"> 
      <el-tab-pane :label="`未读消息(${arr1.length})`" name="first">
       
        <div v-for="(item,index) in arr1" :key="index" class="one">
          <div>{{item.title}}</div>
          <div class="nme">
            <div>{{item.time}}</div>
            <div>
              <el-button @click="clickin(item)">被标记</el-button>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="clickIn" class='button'>全部被标记</el-button>
      </el-tab-pane>




      <el-tab-pane :label="`已读消息(${arr2.length})`" name="second">
   
        <div v-for="(item,index) in arr2" :key="index" class="one">
          <div>{{item.title}}</div>
          <div class="nme">
            <div>{{item.time}}</div>
            <div>
              <el-button @click="clickln(item)">删除</el-button>
            </div>
          </div>
          <div v-if='arr2.item===""'>
          暂无数据
        </div>
        </div>
        <el-button type="primary" @click="clickdn" class='button'>全部删除</el-button>
        
      </el-tab-pane>



      <el-tab-pane :label="`回收站(${arr3.length})`" name="third">
       
        <div v-for="(item,index) in arr3" :key="index" class="one">
          <div>{{item.title}}</div>
          <div class="nme">
            <div>{{item.time}}</div>
            <div>
              <el-button @click="clickvn(item)">还原</el-button>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="clickun(item)" class='button'>清空垃圾站</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      arr1: [],
      arr2: [],
      arr3: [],
     
      arr: [
        {
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行维护",
          time: "2018-04-19 20:00：00",
          flag: 0
        },
        {
          title: "今晚12点整点发大红包，先到先得",
          time: "2018-04-19 21:00：00",
          flag: 0
        },
        {
          title: "今晚12点整点发大红包，先到先得",
          time: "2018-04-19 21:00：00",
          flag: 1
        },
        {
          title: "今晚12点整点发大红包，先到先得",
          time: "2018-04-19 21:00：00",
          flag: 2
        },
        {
          title: "今晚12点整点发大红包，先到先得",
          time: "2018-04-19 21:00：00",
          flag: 1
        },
        {
          title: "今晚12点整点发大红包，先到先得",
          time: "2018-04-19 21:00：00",
          flag: 2
        }
      ]
    };
  },

  components: {},
  methods: {
    handleClick(item) {
      this.arr1 = this.arr.filter((item) => {
        return item.flag === 0;
      });
      this.arr2 = this.arr.filter((item) => {
        return item.flag === 1;
      });
      this.arr3 = this.arr.filter((item) => {
        return item.flag === 2;
      });
    },
    //使用数组过滤出那些定义的数据 ，从而形成新数组

    clickin(item) {
      item.flag = 1;
      this.handleClick();
    },
    clickIn() {
      this.arr1.map(item => {
        if (item.flag === 0) {
          item.flag = 1;
        }
      });
      this.handleClick();
    },
    clickln(item) {
      item.flag = 2;
    },
    clickdn() {
      this.arr2.map(item => {
        if (item.flag === 1) {
          item.flag = 2;
        }
      });
      this.handleClick();
      //点击之后可以重新运行新的数组
    },
    clickvn(item) {
      item.flag = 1;
    },
    clickun(item) {
     this.arr3.filter(item=>{
       this.arr3=''

     })
    }
  },
  mounted() {

  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.Unread {
  width: 100%;
  height: 100%;
  
}
.nme {
  display: flex;
  justify-content: space-between;
}
.one {
  width: 100%;
  height: 50px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
}
.button{
  margin-top: 10px;
}

</style>



// 这部分
// 首先给每个部分的数据进行单独的（flag赋值）




