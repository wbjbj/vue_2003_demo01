<template>
  <div class="back">
    <el-alert
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      effect="dark"
      show-icon
    >
    </el-alert>
    <el-form>
      <el-form-item label="选择商品分类">
        <el-cascader
          v-model="value"
          :options="goodsCategoriesList"
          :props="defaultProps"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- <el-tabs type="border-card" @tab-click="">
      <el-tab-pane label="动态参数" name="many">用户管理</el-tab-pane>
      <el-tab-pane label="静态属性" name="only">配置管理</el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
      },
      goodsCategoriesList: [],
      value: [],
      getCatId: 0,
      om: "many",
    };
  },
  created() {
    this.getGoodsCategoriesList();
  },
  mounted() {},
  methods: {
    handleChange() {
      if (this.value.length != 3) return (this.getCatId = this.value = []);
      this.getCatId = this.value[2];
    },
    async getGoodsCategoriesList() {
      const { data: res } = await this.$axios.get("categories");
      if (res.meta.status == 200) {
        this.goodsCategoriesList = res.data;
      }
    },
    async getAttributes() {
      const { data: res } = await this.$axios.get(
        `categories/${this.getCatId}/attributes`,
        {
          sel: this.om,
        }
      );
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-alert {
  margin-bottom: 10px;
}
</style>