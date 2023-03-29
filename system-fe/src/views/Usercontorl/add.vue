
<template>
  <div>
    <el-form>
      <el-form-item
        ><el-col :span="8"
          ><el-input
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item
        ><el-col :span="8"
          ><el-input
            v-model="form.password"
            type="text"
            placeholder="请输入密码"
          ></el-input
        ></el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="save" round>添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },

      //  输入框正则验证
    };
  },
  methods: {
    save() {
      console.log(this.form);
      let date = new Date();
      this.$http({
        path: "/users/reg",
        method: "post",
        params: {
          username: this.form.username,
          password: this.form.password,
          createTime: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          //页面跳转到列表页
          // this.$router.push("/admin/usercontrol/list");
        } else {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
      });

       
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input ::v-deep .el-input__inner {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>