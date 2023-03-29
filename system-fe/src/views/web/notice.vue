<template>
  <div>
    <div style="height: 60px;"></div>
    <el-carousel :interval="4000" type="card" height="600px">
      <el-carousel-item v-for="item in content" :key="item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      time: "",
      content: [],
     
    };
  },
  methods: {
    getData() {
      this.$http({
        path: "/hnotice/findHnotice",
        method: "get",
      }).then((res) => {
        //过滤掉除content的其他数据
        // console.log(res.data.hnotice);

        const urls = res.data.hnotice.map((item) => {
          const regex = /src="([^"]*)"/;
          const match = item.content.match(regex);
          return match[1];
        });
        this.content = urls;
        console.log(this.content[0]);
      });
    },
  },
};
</script>

<style>

img {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #d67316;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #afbfd4;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>