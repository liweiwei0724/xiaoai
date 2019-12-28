<template>
  <div class="all">
    <div>
      <h1>支持拖曳</h1>
    </div>
    <div>
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>




   <div id="app">
   <button class="btn" @click="toggleShow"  type="primary">上传图片</button>
   <my-upload  
   @crop-success="cropSuccess" 
   @crop-upload-success="cropUploadSuccess"
   @crop-upload-fail="cropUploadFail"
   v-model="show" 
   :width="200" 
   :height="200" 
   img-format="png" 
   :size="size"
   langType='zh'
   :noRotate='false'
   field="file"
   url="/api/upload"></my-upload>
   <img :src="imgDataUrl">
 </div>
  </div>
</template>
 
  
<script>
import myUpload from 'vue-image-crop-upload';
export default {
  data() {
    return {
      fileList: [],
        imgDataUrl: "",
        show: false,
        size:2.1,
      
    };
  },
  components: {
    
     myUpload
  },
  methods: {
            toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field) {
            console.log('-------- crop success --------',imgDataUrl, field);
        },
        //上传成功回调
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            this.imgDataUrl = jsonData.files.file;
            console.log(jsonData);
            console.log('field: ' + field);
        },
        //上传失败回调
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log('上传失败状态'+ status);
            console.log('field: ' + field);
        }
    
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: 500px;
  margin: 10px 10px;
  border: 1px solid black;
}
</style>