<template>
  <div class="reg_container">
    <div class="reg_box">
      <div class="title">后台管理系统登陆界面</div>
      <el-form
        ref="loginFormRef"
        :model="Form"
        label-width="0px"
        class="reg_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="Form.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="Form.password"
            show-password
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input
            v-model="Form.password1"
            show-password
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="save">注册</el-button>
          <el-button type="primary" @click="resetLoginForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      Form: {
        username: "",
        password: "",
        password1: "",
      },
     
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$router.push("/login");
    },
    save() {
      console.log(this.form);

      if (this.Form.password === this.Form.password1 && this.Form.password) {
        let date = new Date();
        this.$http({
          path: "/users/reg",
          method: "post",
          params: {
            username: this.Form.username,
            password: this.Form.password,
            createTime: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}-${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.$router.push("/login");
          } else {
            this.$message({
              message: "注册失败",
              type: "error",
            });
          }
        });
      } else {
        this.$message("两次密码不一样哦,或者密码为空");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.reg_container {
  width: 100%;
  height: 100%;
  /*如果想做背景图片 可以给标签一个class 直接添加背景图*/
  position: relative;
  background: url("../../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;

  /* background-color: #3e3e3e; */
}
.reg-bg {
  width: 100%;
  height: 100%;
  background: #3e3e3e;
}
.reg_box {
  width: 400px;
  height: 270px;
  background: hsla(0, 0%, 100%, 0.1);
  border: 1px solid #f7f7f7;
  border-radius: 5px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.reg_box .title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 24px;
  color: white;
  border-bottom: 1px solid #ffffff;
}
.reg_box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.reg_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.reg_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
.el-input ::v-deep .el-input__inner {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}
::v-deep .el-form-item {
  margin-bottom: 11px;
}
</style>
