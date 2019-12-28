<template>
  <div class="all">
    <div class="top">
      <el-button type="primary" style="height:40px;" @click="clickblack">返回</el-button>
      <div class="FLE">
        <div>
          <h1>{{list.title}}</h1>
        </div>
        <div>
          <h3>摘要：{{list.abstract}}</h3>
        </div>
        <div style="color:gray;">发表于:{{getTime(list.date)}}</div>
      </div>
    </div>

    <el-card>
      <div v-html="list.text" class="buttom"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    };
  },
  components: {},
  methods: {
    clickblack() {
     history.back()
     // history.back()返回上一步或者用 history.go()里面传值是负数
    },
    //  getData() {
    //   this.$axios
    //     .req('/article/allArticle/')
    //     .then(res => {
    //       this.list = res.data;
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    postDate() {
      if (this.$route.query.id) {
        this.$axios
          .req("/article/article", {
            _id: this.$route.query.id
          })
          .then(res => {
            this.list = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
      else if(this.$route.query.arr){
        this.list= this.$route.query.arr
        //接收数据时需要判断数据从哪个页面传过来的，1.储存好的数据。直接用post或get请求，直接调用
        //2.没有储存的，可以直接传整个数组，进行接受
      }
    },

    getTime(time) {
      return this.$dayjs(time).format("YYYY年MM月DD日HH时mm分ss秒");
    }
    ///需要dayjs封装this.$dayjs(time).format定式
  },
  mounted() {
    this.postDate();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 90%;
  height: 100%;

  margin: 10px 10px;
}
.top {
  width: 100%;
  height: 200px;

  display: flex;
}
.buttom {
  width: 100%;
  height: 250px;
}
.FLE {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>