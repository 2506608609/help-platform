<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="标题">
        <el-input
          v-model="form.title"
          autofocus="true"
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="内容">
        <div id="editor"></div>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-model="form.price" placeholder="请输价格" />
      </el-form-item>

       <el-form-item label="描述">
        <el-input v-model="form.details" placeholder="详细描述" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.classify" label="出售">出售</el-radio>
        <el-radio v-model="form.classify" label="求购">求购</el-radio>
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
        details: "",
        _id: "",
        title: "",
        price: "",
        author: window.localStorage.getItem("username"),
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
      path: "/idle/findone",
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
      console.log(this.form.price);
      this.$http({
        path: "/idle/update",
        method: "post",
        params: {
          _id: this.form._id,
          title: this.form.title,
          // createTime:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          classify: this.form.classify,
          price: this.form.price,
          details: this.form.details,
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