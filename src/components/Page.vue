<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pages.num"
    :page-sizes="pages.sizes"
    :page-size="pages.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pages.total"
  >
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["pages"],
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("changeSize", val);
    },
    handleCurrentChange(val) {
      this.$emit("changeNum", val);
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>