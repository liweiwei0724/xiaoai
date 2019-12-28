<template>
  <div>
    <div class="top">
      <div class="top-right">欢迎来{{name}}到后台管理系统</div>
      <div class="top-left">
        <div></div>
        <div>{{getTime()}},亲爱的{{name}}上次登入时间：{{time}}</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      time: "",
      time1: ""
    };
  },
  components: {},
  methods: {
    getTime1() {
      this.time =localStorage.getItem("time")
    },
    getTime() {
      // let timestamp = (new Date()).valueOf();
      // let T = new Date(time1);
      let times = this.$dayjs().format("HH");
      if (Math.ceil(times) > 6 && Math.ceil(times) < 12) {
        return "早上好";
      } else if (Math.ceil(times) < 14 && Math.ceil(times) > 12) {
        return "中午好";
      } else if (Math.ceil(times) < 18 && Math.ceil(times) > 14) {
        return "下午好";
      } else if (Math.ceil(times) < 24 && Math.ceil(times) > 14) {
        return "晚上好";
      } else {
        return "您需要注意休息,晚安";
      }
    }
  },
  mounted() {
    //  if(localStorage.name){
    this.name = localStorage.getItem("name");
    this.getTime1()
    // }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped >
.top {
  width: 100%;
  height: 50px;
  font-size: 13px;
  background-color: #2a587b;
  display: flex;
  justify-content: space-between;
  color: white;
}
.top-right {
  width: 300px;
  height: 100%;

  line-height: 50px;
  text-align: center;
}
.top-left {
  width: 500px;
  height: 100%;
}
.top-left > div {
  line-height: 50px;
}
</style>