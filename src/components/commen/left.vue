<template>
 <div>
<div class='left'>
  <el-row>
   <el-col >
    
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      
      >
      
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
        <span slot="title" @click='clickT("/")'>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title" @click='clickp("/Paging")'>分页表格</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title"  @click='clicker("/Label")'>标签页</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title"  @click='clickar("/Upload")'>图片上传</span>
      </el-menu-item>
       <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title" @click='clickhr("/Publish")'>已发表</span>
      </el-menu-item>
       <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title" @click='clickrelease("/Release")'>发布文章</span>
      </el-menu-item>
       <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title" @click='clickcount("/Count")'>统计</span>
      </el-menu-item>
       <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title" @click="clickdsa('/Export')" >导出excel</span>
      </el-menu-item>
       <el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span slot="title" @click="clickReturn('/Logout')">退出系统</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
 

</div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
 clickar(val){
        this.$router.push(val)
      },
      clickReturn(val){
        this.$router.push(val)
      },
      clickp(val){
        this.$router.push(val)
      },
       clickS(val){
        this.$router.push(val)
      },
      clickdsa(val){
        this.$router.push(val)
      },
       clickT(val){
     this.$router.push(val)
   },
     clicker(val){
     this.$router.push(val)
   },
   clickrelease(val){
     this.$router.push(val)
   },
   clickhr(val){
     this.$router.push(val)
   },
   clickcount(val){
     this.$router.push(val)
   },
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>




</style>