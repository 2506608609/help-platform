<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.classify" label="求助">求助</el-radio>
        <el-radio v-model="form.classify" label="分享">分享</el-radio>
        <el-radio v-model="form.classify" label="交流">交流</el-radio>
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
        title: "",
        content: "",
        classify: "",
        author: this.$store.state.user.state.username,
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
        path: "/helpmsg/addHelpmsg",
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

<style>
</style>