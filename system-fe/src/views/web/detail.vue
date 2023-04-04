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
        <h1 style="color: pink">详情</h1>
        <span>标题:{{ form.title }}</span>

        <span>发布人:{{ form.author }}</span>
        <span>发布时间:{{ form.createTime }}</span>

        <el-button type="primary" @click="111">咨询一下</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    let _id = this.$route.query._id;
    console.log(_id);
    //此处代码为异步请求，该代码中的then会在mounted中代码之后，但是该钩子函数已经失效了，所以
    this.$http({
      path: "/job/findone",
      method: "post",
      params: {
        _id,
      },
    }).then((res) => {
      console.log(res.data);

      this.form = res.data.result;
      const text = res.data.result.content;
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
</style>