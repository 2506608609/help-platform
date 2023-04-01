<template>
  <div class="control">
    <div class="views">
      <el-table :data="talk">
        <el-table-column>
          <template slot-scope="scope">
            <div class="comment-list">
              <div style="text-align: ">
                <el-image
                  style="width: 60px; height: 60px; border-radius: 100%"
                  :src="scope.row.avatar"
                ></el-image>
                <span style="text-align: center">{{ scope.row.username }}</span>
                <div>{{ scope.row.createTime }}说了:</div>
                <span style="font-size: large; color: pink">{{
                  scope.row.content
                }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="talk">
      <el-input
        v-model="content"
        type="text"
        placeholder="说点好听的"
      ></el-input>
      <el-button type="success" @click="save">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      talk: [],
      content: "",
    };
  },
  created() {
    this.settime();
    // this.getData();
  },
  beforeDestroy() {
    this.$once("hook:beforeDestroy", () => {
      clearInterval(this.timer);
    });
  },
  methods: {
    getData() {
      this.$http({
        path: "/talk/find",
        method: "get",
      }).then((res) => {
        console.log(res);
        this.talk = res.data.rel;
      });
    },
    settime() {
      this.timer = setInterval(() => {
        console.log("开始了");
        this.getData();
      }, 1000);
    },
    save() {
      let date = new Date();
      this.$http({
        path: "/talk/add",
        method: "post",
        params: {
          username: window.localStorage.getItem("username"),
          avatar: window.localStorage.getItem("avatar"),
          createTime: `${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}-${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} `,
          content: this.content,
        },
      });
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  height: 100%;
  overflow: auto;
}
.views {
  height: 800px;
  overflow: auto;
}
.talk {
  height: 3.75rem;
  //   background-color: pink;
  // overflow: hidden;
  display: flex;
}

.control::-webkit-scrollbar {
  display: none;
}
.views::-webkit-scrollbar {
  display: none;
}

::v-deep .el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  height: 3.75rem;
}
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