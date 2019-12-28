<template>
 <div class='all'>
   <top> </top>
   <div style="display:flex">
      <left style="flex:1"></left>
   <router-view style="flex:7"></router-view> 
   </div>
  
 </div>
</template>

<script>
import top from "../components/commen/top"
import left from "../components/commen/left"
 export default {
   data () {
     return {

     }
   },
   components: {
       top,
       left
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style lang='scss'>

</style>