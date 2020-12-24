<template>
  <div class="back">
    <el-table
      stripe
      :data="rightList"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="权限路径"></el-table-column>
      <el-table-column label="权限等级">
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="
              scope.row.level == '0'
                ? ''
                : scope.row.level == '1'
                ? 'success'
                : 'warning'
            "
            >{{
              scope.row.level == "0"
                ? "一级"
                : scope.row.level == "1"
                ? "二级"
                : "三级"
            }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: [],
    };
  },
  created() {
    this.getRightList();
  },
  mounted() {},
  methods: {
    async getRightList() {
      const { data: res } = await this.$axios.get("rights/list");
      if (res.meta.status == 200) {
        this.rightList = res.data;
      }
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>