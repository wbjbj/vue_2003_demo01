<template>
  <el-header>
    <el-image
      style="width: 60px; height: 60px"
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1827257588,2159151289&fm=26&gp=0.jpg"
      fit="fill"
    ></el-image>
    <h2>后台管理系统</h2>
    <el-button type="warning" @click="logOut">退出</el-button>
  </el-header>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    logOut() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          window.sessionStorage.removeItem("token");
          this.$store.commit("removeToken", "");
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
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  .el-image {
    float: left;
    border-radius: 50%;
    margin-left: 60px;
  }
  h2 {
    float: left;
    height: 60px;
    line-height: 60px;
    margin-left: 60px;
    color: #ccc;
  }
  .el-button {
    float: right;
    margin: 10px;
  }
}
</style>