<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in $route.meta.bread"
      :key="index"
      >{{ item }}</el-breadcrumb-item
    >
  </el-breadcrumb>
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
.el-breadcrumb {
  padding-bottom: 10px;
  .el-breadcrumb__item {
    user-select: none;
  }
}
</style>