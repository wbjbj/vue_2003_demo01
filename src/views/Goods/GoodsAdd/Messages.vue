<template>
  <el-form :model="goodsMessage" label-position="top" label-width="80px">
    <el-form-item label="商品名称">
      <el-input
        placeholder="请输入商品名称"
        v-model="goodsMessage.goods_name"
      ></el-input>
    </el-form-item>
    <el-form-item label="商品价格">
      <el-input type="number" v-model="goodsMessage.goods_price"></el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input type="number" v-model="goodsMessage.goods_weight"></el-input>
    </el-form-item>
    <el-form-item label="商品数量">
      <el-input type="number" v-model="goodsMessage.goods_number"></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-cascader
        v-model="goodsMessage.goods_cat"
        :options="cats"
        :props="propsDefault"
        @change="handleChange"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      cats: [],
      propsDefault: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
      },
    };
  },
  props: ["goodsMessage"],
  created() {
    this.getCatList();
  },
  mounted() {},
  methods: {
    async getCatList() {
      const { data: res } = await this.$axios.get("categories");
      if (res.meta.status == 200) {
        this.cats = res.data;
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    handleChange(value) {
      if (value.length != 3) {
        this.$message.error("必须选择三级分类");
        this.goodsMessage.goods_cat = [];
      }
      this.goodsMessage.attrs = [];
      this.showDefaultVal();
    },
    async showDefaultVal() {
      const { data: res } = await this.$axios.get(
        `categories/${this.goodsMessage.goods_cat[2]}/attributes?sel=only`
      );
      if (res.meta.status == 200) {
        res.data.map((item) => {
          this.goodsMessage.attrs.push({
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          });
        });
      }
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>