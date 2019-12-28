<template>
 <div class='statisti'>
<div class='statisti-top'>
  <div class='statisti-top1' style=" display: flex;">
    <div style='flex:1 ;background-color:#7CCABF;'>今日文章</div>
     <div style='flex:1;background-color:#E88A87;'>原创文章</div>
      <div  style='flex:1;background-color:#8375A3;'>新留言</div>
       <div style='flex:1;background-color:#9FCEC1;'>新消息</div>
  </div>
  <div style=" display: flex;" class='statisti-photo'>
<div style='flex:1'> <ve-pie :data="chartDatap" :Settings="chartSettingsp"></ve-pie></div>
<div style='flex:1'></div>
  </div>
  <div></div>
</div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
 chartDatap: {
        columns: ["name", "data"],
        rows: []
      },
      chartSettingsp: {
        metrics: ["data"],
        dimension: ["name"]
      },
     }
   },
   components: {

   },
   methods: {
  getData7() {
      this.$axios
        .req("/ringChat")
        .then(res => {
          this.chartDatap.rows = res.data;
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
   },
   mounted() {
    this.getData7()
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.statisti{
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
.statisti-top{
  width: 98%;
  margin: 10px 10px;
}
.statisti-top1>div{
  text-align: center;
 
  height: 40px;
  border: 1px solid black;
}
.statisti-photo>div{
  height: 400px;
  border: 1px solid black;
}
</style>