<template>
  <div>
    <el-table :data="comments">
      <el-table-column>
        <template slot-scope="scope">
          <div class="comment-list">
            <div style="text-align: ">
              <el-image
                style="width: 60px; height: 60px; border-radius: 100%"
                :src="scope.row.avatar"
              ></el-image>
              <span style="text-align: center">{{ scope.row.username }}</span>
              <span style="font-size: large"
                >回复了标题为<span style="color: pink">{{
                  scope.row.title
                }}</span
                >的帖子:
              </span>

              <span style="font-size: large; color: pink">{{
                scope.row.content
              }}</span>
            </div>
            <div>回复时间{{ scope.row.createTime }}</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="reply(scope.row)" type="text" size="small"
            >回复
          </el-button>
          <el-button @click="del(scope.row)" type="text" size="small"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background=""
      layout="prev, pager, next"
      :total="count"
      :page-size="pageSize"
      :current-page="page"
      @current-change="changePage"
    ></el-pagination>

    <div class="box" v-show="rel">
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
      comments: [],
      page: 1,
      pageSize: 0,
      count: 0,
      rel: false,
      rep: "",
      form: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.$http({
        path: "/comment/admin/find",
        method: "get",
        params: {
          page: this.page,
          author: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        // console.log(res);
        this.comments = res.data.result;
        this.page = res.data.page;
        this.pageSize = res.data.pageSize;
        this.count = res.data.count;
      });
    },

    reply(row) {
      this.rel = true;
      // console.log(row);
      return (this.form = row);
    },
    save() {
      this.rel = false;
      let date = new Date();
      console.log(this.form);
      this.$http({
        path: "/comment/add",
        method: "post",
        params: {
          username: window.localStorage.getItem("username"),
          author: this.form.username,
          content: this.rep,
          avatar: window.localStorage.getItem("avatar"),
          title: this.form.title,
          createTime: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          helpmsgTitle: this.form.helpmsgTitle,
        },
      }).then((res) => {
        this.$message({
          message: res.data.msg,
          type: res.data.code === 200 ? "success" : "error",
        });
      });
    },

    del(row) {
      //此处的row即为所有的信息（）
      console.log(row._id);
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http({
          path: "/comment/del",
          method: "post",
          params: {
            _id: row._id,
          },
        })
          .then((res) => {
            this.$message({
              //提示栏中信息提示：
              message: res.data.msg,

              type: res.data.code === 200 ? "success" : "error",
            });
            if (res.data.code === 200) {
              this.getData();
            }
          })
          .catch(() => {});
      });
    },

    changePage(page) {
      this.page = page;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
}
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
  background-color: transparent !important;
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
