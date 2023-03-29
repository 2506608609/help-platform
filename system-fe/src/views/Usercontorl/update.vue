
<template>
  <div>
    <el-form>
      <el-form-item>
        <el-col :span="8"
          ><el-input
            v-model="form.username"
            disabled
            placeholder="用户名"
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
        <el-button type="success" @click="save" round>修改密码</el-button>
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
  created() {
    let username = this.$route.query.username;
    console.log(username);
    this.$http({
      path: "/users/find/one",
      method: "get",
      params: {
        username: username,
      },
    }).then((res) => {
      console.log(res.data);
      this.form = res.data.rel;
      // this.form.content=res.data.result.content
      // console.log("created come out");
    });
  },
  methods: {
    save() {
      // console.log(this.password);
      // console.log(this.username);
      
        this.$http({
          path: "users/update/pwd",
          method: "post",
          params: {
            username: this.form.username,
            password: this.form.password,
          },
        }).then((res) => {
          this.$message({
            duration: 2000,
            offset: 300,
            message: res.data.msg,
            type: res.data.code === 200 ? "success" : "error",

          
          });
          this.$router.push("/admin/usercontrol/list");
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