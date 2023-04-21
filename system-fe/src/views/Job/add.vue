<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>

       <el-form-item label="描述">
        <el-input v-model="form.details" placeholder="详细描述" />
      </el-form-item>
      <el-form-item label="分类">
        ><el-col :span="8"
          ><el-input v-model="form.classify" placeholder="请输入类型">
          </el-input
        ></el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success" round @click="submit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//引入wangeditor
import Editor from "wangeditor";

export default {
  data() {
    return {
      form: {
        details: "",
        title: "",
        content: "",
        classify: "",
        author: this.$store.state.user.state.username,
        avatar: window.localStorage.getItem("avatar"),
      },
      editor: null,
    };
  },
  mounted() {
    console.log(this.$store.state.user.state.username);
    // 创建editor对象
    this.editor = new Editor("#editor");
    // 配置服务器端地址
    this.editor.config.uploadImgServer =
      "http://localhost:3000/upload/editor/img";
    // 配置自定义参数
    this.editor.config.uploadFileName = "editorfile";
    // 配置请求头
    this.editor.config.uploadImgHeaders = {
      authorization: "Bearer " + localStorage.token,
    };
    //设置高度
    this.editor.config.height = 500;

    // 配置提示文字
    this.editor.config.placeholder = "请输入内容";

    this.editor.create();
  },
  methods: {
    submit() {
      //获取内容
      let content = this.editor.txt.html();
      console.log(content);
      let date = new Date();
      this.$http({
        path: "/job/add",
        method: "post",
        params: {
          id: Date.now(),
          title: this.form.title,
          createTime: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `,
          content: content,
          classify: this.form.classify,
          author: this.form.author,
          avatar: this.form.avatar,
          details: this.form.details,
        },
      }).then((res) => {
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

::v-deep .el-radio__inner {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
::v-deep .w-e-text-container {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>