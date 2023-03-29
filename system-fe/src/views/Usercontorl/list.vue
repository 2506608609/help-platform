<template>
  <div>
    <el-table :data="users" style="width: 100%" class="table">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="时间" prop="createTime"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          
          <el-button @click="update(scope.row)" type="text" size="small"
            >修改密码</el-button
          >
          <el-button @click="del(scope.row)" type="text" size="small"
            >注销用户</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件-->

    <el-pagination
      background=""
      layout="prev, pager, next"
      :total="count"
      :page-size="pageSize"
      :current-page="page"
      @current-change="changePage"
      style="margin-top: 20px"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      page: 1,
      pageSize: 0,
      count: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        path: "/users/find/all",
        method: "get",
        params: {
          page: this.page,
          //   author: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        // console.log(res.data.users);
        this.users = res.data.users;
        this.pageSize = res.data.pageSize;
        this.count = res.data.count;
        this.page = res.data.page;
      });
    },
    update(row) {
      this.$router.push({
        path: "/admin/usercontrol/update",
        query: {
          username: row.username,
        },
      });
    },
    del(row) {
      //此处的row即为所有的信息（）
    //   console.log(row._id);
      this.$confirm("确定要注销吗？", "提示", {
        confirmButtonText: "注销",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          path: "/users/del",
          method: "post",
          params: {
            _id: row._id,
          },
        })
          .then((res) => {
            // console.log(res);
            this.$message({
              //提示栏中信息提示：
              message: res.data.msg,
              //
              type: res.data.code === 200 ? "success" : "error",
            });
            if (res.data.code === 200) {
              this.getData();
            }
          })
          .catch(() => {});
      });
    },

    // 分页组件
    //实现下一页可以渲染下一页的数据
    changePage(page) {
      this.page = page;
      //   console.log(this.page);
      this.getData(this.page);

      //   console.log(page);
    },
  },
};
</script >


<style lang="scss" scoped>

/* 整个表格的宽度 */
.tableBox {
  width: 470px;
}
/* 标题行的内边距 */
::v-deep .tableBox th {
  padding: 3px;
}
/* 内容行的属性 */
::v-deep .tableBox td {
  padding: 0px !important;
  text-align: center;
}
/* 边框 */
::v-deep .el-table--border,
.el-table--group {
  border: 1px solid #8a8a8a;
}
/**
改变表格内竖线颜色
 */
::v-deep .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid #8a8a8a !important;
}
/**
改变表格内行线颜色
 */
::v-deep .el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #8a8a8a;
}
/* 中间线 */
::v-deep .el-table thead tr th {
  border-color: #8c939d !important;
}
/* 标题行的颜色 */
::v-deep.el-table th.el-table__cell {
  background-color:transparent !important;
  font-size: 14px;
  font-family: Source Han Sans SC;
  font-weight: bold;
  color: #ddf0ff;
}
/* 内容行的颜色 */
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
  border-radius: 10px;
}
::v-deep .el-table tr {
  background-color: transparent;
  color: #e2e6ec;
}
/* 鼠标经过时内容行的颜色 */
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}



</style>