<!--
 * @Descripttion: 
 * @version: 
 * @Author: CoderHD
 * @Date: 2021-10-26 21:29:58
 * @LastEditors: CoderHD
 * @LastEditTime: 2021-10-30 00:20:44
-->
<template>
  <el-container>
    <el-header>
      <div class="sys-title">后台管理系统</div>
      <div class="header-right">
        <el-link :underline="false" style="margin-right: 20px"
          >网站首页</el-link
        >
        <el-avatar size="medium" :src="avatar_url"></el-avatar>
        <el-link :underline="false">{{ username }}</el-link>
        <el-link :underline="false">退出</el-link>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true" active-text-color="#ffd04b">
          <el-submenu index="/admin/users">
            <template slot="title">
              <span>个人中心</span>
            </template>
            <el-menu-item index="/admin/users/personal">个人资料</el-menu-item>
            <el-menu-item index="/admin/users/password">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="/admin/article">
            <template slot="title">
              <span>求助管理</span>
            </template>
            <el-menu-item index="/admin/article/add">发布求助</el-menu-item>
            <el-menu-item index="/admin/article">求助列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/comment">
            <template slot="title">
              <span>留言管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/fans">
            <template slot="title">
              <span>关注管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/star">
            <template slot="title">
              <span>点赞管理</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: window.localStorage.getItem("username"),
      avatar_url: window.localStorage.getItem("avatar"),
    };
  },
  beforeDestroy() {
    console.log("beforeDestory 执行了");
    this.avatar_url = window.localStorage.getItem("avatar");
  },
};
</script>

<style>
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
  font-size: 20px;
  padding: 0 15px;
  height: 80px !important;
}
.el-header img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  /* margin: 15px 0px 15px 15px; */
}
.el-header div {
  display: flex;
  align-items: center;
  
}
.el-header div span {
    display: flex;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
.el-aside {
background-color: #eaedf1;
}
.el-aside .el-menu {
  border-right: none;
  
  background-color: #eaedf1;
}
.el-main {
  background-color: #fff;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color:pink;
  text-align: center;
  letter-spacing: 0.2 em;
  cursor: pointer;
}
</style>
