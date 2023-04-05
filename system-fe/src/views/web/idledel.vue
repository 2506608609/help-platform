<template>
  <div class="box">
    <div class="middle">
      <div class="left">
        <el-image
          style="width: 100%; height: 100%"
          :src="form.content"
        ></el-image>
      </div>

      <div class="right">
        <h1 style="color: black">详情</h1>
        <span>标题: {{ form.title }}</span>
        <span>价格: {{ form.price }}</span>
        <span>状态: {{ form.state }}</span>
        <span>发布人: {{ form.author }}</span>

        <el-button type="primary" @click="reply">咨询一下</el-button>
      </div>
    </div>

    <div class="rep" v-show="rel">
      <el-col :span="18"
        ><el-input v-model="rep" type="text" placeholder="回复"></el-input>
      </el-col>

      <el-button type="success" @click="save">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rel: false,
      rep: "",
    };
  },

  methods: {
    reply() {
      this.rel = true;
      console.log(this.form);
    },
    save() {
      this.rel = false;
      let date = new Date();

      this.$http({
        path: "/comment/add",
        method: "post",
        params: {
          username: window.localStorage.getItem("username"),
          author: this.form.author,
          avatar: this.form.avatar,
          content: this.rep,
          title: this.form.title,
          createTime: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        },
      }).then((res) => {
        this.$message({
          message: res.data.msg,
          type: res.data.code === 200 ? "success" : "error",
        });
      });
    },
  },

  created() {
    let _id = this.$route.query._id;
    console.log(_id);
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
      const text = res.data.rel.content;
      const pattern = /<img src="([^"]+)"/;
      const match = text.match(pattern);
      this.form.content = match[1];
      console.log(this.form.content);

      // this.form.content=res.data.result.content
      // console.log("created come out");
      // console.log(this.form);
    });
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  display: flex;
  margin: auto;
  align-content: center;
  justify-content: center;
}
.box > .middle {
  width: 900px;
  height: 600px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
}

.box > .middle > .left {
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: auto;
  display: flex;
}
.box > .middle > .right {
  width: 300px;
  height: 600px;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  //   align-items: center;
}

.rep {
  width: 900px;
  height: 100px;
  // background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: 60px;
  text-align: center;
}

::v-deep .el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>