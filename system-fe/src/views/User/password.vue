
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-col :span="8"
          ><el-input v-model="username" disabled placeholder="用户名"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item
        ><el-col :span="8"
          ><el-input
            v-model="password"
            type="password"
             show-password
            placeholder="请输入密码"
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item
        ><el-col :span="8">
          <el-input
            v-model="password1"
            type="password"
             show-password
            placeholder="请再次输入密码"
          ></el-input
        ></el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="save" round>更新密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      password: "",
      password1: "",

      //  输入框正则验证
    };
  },
  methods: {
    save() {
      // console.log(this.password);
      // console.log(this.username);
      if (this.password === this.password1 && this.password) {
        this.$http({
          path: "users/update/pwd",
          method: "post",
          params: {
            username: this.username,
            password: this.password,
          },
        }).then((res) => {
          this.$message({
            duration: 2000,
            offset: 300,
            message: res.data.msg,
            type: res.data.code === 200 ? "success" : "error",
          });
        });
      } else {
        this.$message("两次密码不一样哦,或者密码为空");
      }
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
