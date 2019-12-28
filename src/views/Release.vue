<template>
  <el-card class="all">
    <div class="top">
      <div class="nus">
        <el-button type="danger" @click.native.prevent="clicksee( ruleForm)">查看</el-button>

        <el-button type="primary" @click="submitForm('ruleForm')">分布</el-button>
      </div>
      <el-form class="nuw">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract">
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>

          <div class="nuo">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author" placeholder="请选择" style=" width:150px;">
                <!-- <el-option></el-option> -->
              </el-input>
            </el-form-item>

            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择类目" style=" width:150px;">
                <el-option
                  v-for="item in sourcey"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择来源" style=" width:150px;">
                <el-option
                  v-for="item in sources"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="重要性" prop="star" class="demonstration">
              <!-- <div class="block">
  <span class="demonstration">默认不区分颜色</span>
  <el-rate v-model="value1"></el-rate>
              </div>-->

              <el-select v-model="ruleForm.star" placeholder="请选择重要性" style=" width:150px;">
                <el-option
                  v-for="item in sourcer"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <div class="block">
              <span class="demonstration">发布时间</span>
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                style=" width:150px;"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
        </el-form>
        <mavon-editor :ishljs="true" v-model="ruleForm.text" />
      </el-form>
      <el-button type="primary" class="release" @click="submitForm('ruleForm')">发布</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      markdownOption: {
        bold: true // 粗体
      },
      sourcey: [
        {
          value: "Vue",
          label: "Vue"
        },
        {
          value: "React",
          label: "React"
        },
        {
          value: "Node.js",
          label: "Node.js"
        },
        {
          value: "性能优化",
          label: "性能优化"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        },
        {
          value: "小程序",
          label: "小程序"
        },
        {
          value: "工具类",
          label: "工具类"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      sources: [
        {
          value: "原创",
          label: "原创"
        },
        {
          value: "转载",
          label: "转载"
        },
        {
          value: "与他人合作",
          label: "与他人合作"
        }
      ],
      sourcer: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
        {
          value: "4",
          label: "4"
        },
        {
          value: "5",
          label: "5"
        }
      ],
      handbook: "",
      arr: {},
      handbook: "",
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        text: "",
        date: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入文章标签", trigger: "blur" },
          { min: 3, message: "长度在 3 个字符以上", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请留下你的亲笔签名", trigger: "blur" }
        ],
        category: [
          { required: true, message: "请给出你的选择", trigger: "blur" }
        ],
        source: [
          { required: true, message: "请给出你的选择", trigger: "blur" }
        ],
        star: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
        text: [{ required: true, message: "请选择活动区域", trigger: "blur" }],
        date: [
          { required: true, message: "请让我记录你的足迹", trigger: "blur" }
        ]
      },

      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      date: ""
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("/article/create", {
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.ruleForm.text,
              date: this.ruleForm.date
            })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                //可以根据res打印然后以code进行判断条件
                 this.$message({
                  type: "success",
                  message: res.data
                });
                this.$router.push('/publish')
              }
              else {
                 this.$message({
                  type: "warning",
                  message: '您还没完善信息'
                });
              }
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
    clicksee(val) {
      this.$router.push({ name: "see", query: { arr: val } });
    ///编辑保存之前，需要进行不同页面预览需要传单个数组，然后进行查看
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang='scss'>
.all {
  // margin: 10px 10px;
  width: 90%;
  height: 600px;
  // border: 1px solid black;
}
.top {
  width: 100%;
  height: 40px;
  border: 1px solid white;
  background-color: royalblue;
}
.nus {
  float: right;
  margin-right: 30px;
}
.nuw {
  width: 100%;
  margin-top: 60px;
}
.nuo {
  display: flex;
  justify-content: space-around;
}
.frame {
  margin-left: 40px;
}
.mavonEditor {
  width: 100%;
}
.release {
  margin-left: 620px;
}
</style>