<template>
  <el-header>
    <el-image
      style="width: 60px; height: 60px"
      src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1827257588,2159151289&fm=26&gp=0.jpg"
      fit="fill"
    ></el-image>
    <h2>后台管理系统</h2>
  </el-header>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-header{
    .el-image{
        float: left;
        border-radius: 50%;
        margin-left: 60px;
    }
    h2{
        float: left;
        height: 60px;
        line-height: 60px;
        margin-left: 60px;
        color: #ccc;
    }
}
</style>