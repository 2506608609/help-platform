<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input type="" v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>
     
      <el-form-item>
        <el-button type="success" round @click="submit">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  data() {
    return {
      form: {
        _id: "",
        title: "",
        content: "",
      },
      editor: null,
    };
  },
  created() {
      let _id = this.$route.query._id;
    // console.log(_id);
    //此处代码为异步请求，该代码中的then会在mounted中代码之后，但是该钩子函数已经失效了，所以
    this.$http({
      path: "/hnotice/findOneHnotice",
      method: "post",
      params: {
        _id,
      },
    }).then((res) => {
      console.log(res.data);
      this.form = res.data.rel;
      // this.form.content=res.data.result.content
      console.log("created come out");
    });
  },
  watch: {
    form: {
      handler(val) {
        //初始化富文本编辑器内容
        this.editor.txt.html(val.content);
        console.log("mounted come out");
      },
      deep: true,
    },
  },
  mounted() {
    //创建wangEditor实例
    this.editor = new Editor("#editor");
    //配置上传图片的接口地址
    this.editor.config.uploadImgServer = `http://localhost:3000/upload/editor/img`;
    this.editor.config.uploadFileName = "editorfile";
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.token,
    };
    //设置富文本编辑器高度
    // this.editor.config.hight = 600
    //设置提示文字
    this.editor.config.placeholder = "请输入内容";
    this.editor.create();
  },
  methods: {
    submit() {
      //获取富文本编辑器的内容
      let content = this.editor.txt.html();
      // console.log(content)
      this.$http({
        path: "/hnotice/updateHnotice",
        method: "post",
        params: {
          _id: this.form._id,
          title: this.form.title,
          // createTime:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          
          content,
          
        },
      }).then((res) => {
        //刷新页面返回原路径  
         this.$router.push("/admin/notice/del")
          
        this.$message({
          message: res.data.msg,
          type: res.data.code === 200 ? "success" : "error",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 ::v-deep .el-input__inner {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

 ::v-deep .el-radio__inner{
   color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
::v-deep .w-e-text-container{
   color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>