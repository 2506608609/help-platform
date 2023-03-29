<template>
  <div>
    <el-table :data="comments">
      <el-table-column>
        <template slot-scope="scope">
          <div class="comment-list">
            <div>
              <el-tag type="info" size="small" effect="plain">会员</el-tag>
              {{ scope.row.username }} 评论了你的文章
              {{ scope.row.articleTitle }}
            </div>
            <div>
              {{ scope.row.createTime }}
            </div>
          </div>
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
    };
  },
  created() {
    this.getData();
  },
  //提取方法到methods中，减少created的代码量
  methods: {
    //ajax向后端发送请求（对于author的全部评论信息）
    getData() {
      this.$http({
        path: "/comment/admin/find",
        method: "get",
        params: {
          page: this.page,
          author: window.localStorage.getItem("username"),
        },
      }).then((res) => {
        console.log(res);
        this.comments = res.data.result;
        this.page = res.data.page;
        this.pageSize = res.data.pageSize;
        this.count = res.data.count;
      });
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
  },
};
</script>

<style>
.comment-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
