<template>
  <el-form :model="goodsMessage">
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
      goodsMessage: {
        goods_name: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: [],
      },
      cats: [
        {
          value: "zhinan",
          label: "指南",
        },
      ],
      propsDefault: {
        expandTrigger: "hover",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>