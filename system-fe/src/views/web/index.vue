<template>
  <el-container>
    <el-header>
      <div class="sys-title" v-if="admin">校园万事屋</div>
      <div class="sys-menu">
        <span @click="toweb">首页</span>
        <span @click="tonotice">公告</span>
        <span @click="tohelpmsg">求助</span>
        <span @click="toshare">聊天室</span>
      </div>
      <div class="header-right">
        <el-link
          :underline="false"
          style="margin-right: 20px"
          @click="toHome"
          v-if="admin"
          >后台管理</el-link
        >
        <el-link
          :underline="false"
          style="margin-right: 20px"
          @click="toHome"
          v-if="!admin"
          >个人中心</el-link
        >
        <el-avatar size="medium" :src="avatar_url"></el-avatar>
        <span v-show="admin">管理员:</span>
        <span v-show="admin">{{ username }}</span>
        <span v-show="!admin">用户:</span>
        <el-link :underline="false" @click="isexit">退出</el-link>
      </div>
    </el-header>
    <el-main>
      <router-view> </router-view> </el-main
    ><el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      admin: false,
      username: window.localStorage.getItem("username"),
      avatar_url: window.localStorage.getItem("avatar"),
    };
  },
  created() {
    console.log("created 执行了");
    this.admin = this.$store.state.user.state.admin;
    console.log(this.admin);
  },
  methods: {
    toHome() {
      this.$router.push("/admin/users/personal");
    },
    toweb() {
      this.$router.push("/web/home");
    },
    tonotice() {
      this.$router.push("/web/notice");
    },
    tohelpmsg() {
      this.$router.push("/web/helpmsg");
    },
    toshare() {
      this.$router.push("/web/talk");
    },

    isexit() {
      this.$confirm("确定退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("avatar");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-header {
  background-image: url(../../assets/3.jpg);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 28px;
  padding: 0 15px;
  height: 80px !important;
}
.el-header img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  /* margin: 15px 0px 15px 15px; */
}
.sys-menu {
  flex: 2;

  align-items: end;
  display: flex;
}
.sys-menu > span {
  color: #ffffff;
  display: flex;
  align-items: end;
  width: 60px;
  height: 60px;
  font-size: 18px;
  margin-right: 10px;
  margin-left: 15px;
}
.sys-menu > span:hover {
  // color: pink;
  font-weight: 700;
}
.sys-menu > span:active {
  // color: pink;
  font-weight: 700;
}
.el-header div {
  display: flex;
  align-items: center;
}

.el-header .header-right > span {
  color: #ffffff;
  display: flex;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 15px;
  margin-right: 10px;
  margin-left: 15px;
}
.el-header div a {
  color: #ffffff;
  display: flex;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
.el-main {
  background-image: url(../../assets/bg.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0;
}

.el-footer {
  // position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #b3c0d1;
  text-align: center;
  background-image: url(../../assets/3.jpg);
  line-height: 60px;
}
</style>