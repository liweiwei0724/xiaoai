<template>
<div class='all'>
   <el-card class="register">
    <div class="singn">
      <div class="rrgister-top">欢迎来到小爱后台管理系统</div>
      <div class="rrgister-body">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          

          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          
        >
          <el-form-item label="请输入用户名称:" prop="username" style="width:500px;">
            <el-input v-model.number="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码:" prop="password" style="width:500px;">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <div style="display: flex;">
            <el-form-item label="验证码:" prop="code" size="small" style="width:300px;">
              <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
            </el-form-item>
            <div @click="getCode" v-html="codeimg" class='getcode'></div>
          </div>
          <el-form-item class='all-primary'>
            <el-button type="primary" @click="clickr('/Register')" class='primary'>立即注册</el-button>
            <el-button @click="submitForm('ruleForm')" class="immediately">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</div>
 
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (Number.isInteger(value)) {
          callback(new Error("请输入数字值或字母"));
        }
        // else if(!Chinese){
        //   return callbach(new Error('请输入字母或数字'))
        // }
        else {
          callback();
        }
      }, 1000);
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkpass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      codeimg: "",
      ruleForm: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        password: [
           { validator: checkAge, trigger: "blur" },
          {  trigger: "blur" },
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {  min: 6, message: "你的密码必须超过六位数", trigger: "blur" }
        ],
        username:[
           { validator: checkAge, trigger: "blur" },
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code:[
          { validator: checkAge, trigger: "blur" },
            { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    clickr(val) {
      this.$router.push(val);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              code: this.ruleForm.code
            })
            .then(res => {
              console.log(res);
              if (res.code !== 200) {
                this.$message({
                  type: "warning",
                  message: res.message
                });
              } else {
                this.$message({
                  type: "seccess",
                  message: res.message
                });
               
                ////储存分三种
                localStorage.setItem("name", this.ruleForm.username);
                localStorage.setItem('time',this.$dayjs().format("YYYY年MM月DD日HH时mm分ss秒"));

// this.$dayjs(item.date).format("YYYY年MM月DD日HH时mm分ss秒")+
                // localStorage.getItem('name')
                // localStorage.removeItem('name')
                //清除本地储存
                this.$router.push("/");
              }
              //  else if(res.code===200){
              //
              //  }
              //     localStorage.name=this.username
              //     localStorage.password=this.password
              // this.$message({

              //   type: "seccess",
              //   message: "欢迎来到我的世界"
              // });
              // this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getCode() {
      this.$axios
        .req("/captcha")
        .then(res => {
          this.codeimg = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCode();
    //   if(localStorage.name){
    //   this.name=localStorage.getItem("name")
    // }
    // if(localStorage.password){
    //   this.name=localStorage.getItem("password")
    // }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all{
  width: 100%;
  height: 900px;
  overflow: hidden;
  background:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577438499546&di=84d53835513d03ebb4167d9fa9373ebe&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F4f7ce5a8526cacb5d53e614421a2f5bbdf31d2cc.jpg) 
}
.register {
  width: 650px;
  height: 500px;
  text-align: center;
 
 
  margin: 200px auto;
}
.getcode{
  margin:-20px 50px;
}
.primary{
  margin-right: 150px;
}
.rrgister-top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
  border-bottom: 1px solid grey;
}
.all-primary{
  margin-right: 100px;
}
.rrgister-body {
  margin-top: 100px;
}
// .photo {
//   width: 150px;
//   height: 70px;
//   margin-left: 50px;
//   border: 1px solid black;
// }
</style>