<template>
  <div class="logout">
    <h1>期待您下次光临</h1>
    <!-- <el-button   @click="clickren">确定退出</el-button> -->
     <el-button type="text" @click="open">
     <el-button > 确定退出</el-button>
       </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: {}
    };
  },
  components: {},
  methods: {
     open() {
        this.$confirm('是否在离开此页面？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '退出成功'
            });
            this.$router.push('/sign');
      
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
                   
      this.$axios
        .req("/user/logout")
        .then(res => {
          localStorage.removeItem("name");
          localStorage.removeItem("time");
        })
        .catch(err => {
          console.log(err);
        });

      },
   
    // clickren() {
    //   this.$router.push('/sign');
    // },
    // getData() {
    //   this.$axios
    //     .req("/user/logout")
    //     .then(res => {
    //       localStorage.removeItem("name");
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  mounted() {
   
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.logout {
  text-align: center;
  margin-top: 200px;
}
</style>