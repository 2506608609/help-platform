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
        id: 0,
        _id: "",
        title: "",
        stemfrom: "",
        author: window.localStorage.getItem("username"),
        content: "",
      },
      editor: null,
    };
  },
  created() {
    let id = this.$route.query.id;
    //此处代码为异步请求，该代码中的then会在mounted中代码之后，但是该钩子函数已经失效了，所以
    this.$http({
      path: "/helpmsg/findOneHelpmsg",
      method: "get",
      params: {
        id,
      },
    }).then((res) => {
      console.log(res.data);
      this.form = res.data.result;
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
        path: "/helpmsg/updateHelpmsg",
        method: "post",
        params: {
          id: this.form.id,
          title: this.form.title,
          // createTime:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          stemfrom: this.form.stemfrom,
          content,
          // author:this.form.author,
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

<style></style>