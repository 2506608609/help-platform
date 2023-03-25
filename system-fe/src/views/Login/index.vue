<template>
  <div class="login_container">
    <div class="login_box">
      <div class="title">后台管理系统登陆界面</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
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
      loginForm: {
        username: "1",
        password: "1234",
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // console.log(await this.$http({
        // 	path:'/users/login',
        // 	method:'post',
        // 	params:this.loginForm}))
        const res = await this.$http({
          path: "/users/login",
          method: "post",
          params: this.loginForm,
        });
        console.log(res.data);

        if (res.data.code !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中

        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问

        //   1.2 token 只应在当前网站打开期间生效，所以将 token name保存在 sessionStorage 中

        //本地存储username和token
        window.localStorage.setItem("username", this.loginForm.username);
        window.localStorage.setItem("token", res.data.token);
        // console.log(res.data);

        //将用户信息存储到本地

        // //解析token里面的_id

        var token = res.data.token;
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        var obj = JSON.parse(window.atob(base64));
        // console.log(obj);
        //将obj存储在Vuex的user中
        this.$store.commit("setUsername", { state: res.data.rel });

        console.log(this.$store.state.user);
        // //会话存储_id(唯一标识)
        window.localStorage.setItem("_id", obj._id);
        // //存储token里的avatar
        window.localStorage.setItem("avatar", obj.avatar);
        // console.log(obj.avatar);

        // console.log(res.data._id);

        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  /*如果想做背景图片 可以给标签一个class 直接添加背景图*/
  position: relative;
  background: url("../../assets/bg.jpg") no-repeat;
  background-size: 100% 100%;

  /* background-color: #3e3e3e; */
}
.login-bg {
  width: 100%;
  height: 100%;
  background: #3e3e3e;
}
.login_box {
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
.login_box .title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 24px;
  color: white;
  border-bottom: 1px solid #ffffff;
}
.login_box .avatar_box {
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
.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
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
  background-color:rgba(255, 255, 255, 0.1);
}

</style>
