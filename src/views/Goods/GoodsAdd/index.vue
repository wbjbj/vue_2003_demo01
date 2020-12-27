<template>
  <div class="back">
    <el-steps :active="active - 0" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs v-model="active" @tab-click="handleClick" tabPosition="left">
      <el-tab-pane label="基本信息" name="0">
        <Messages></Messages>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <GoodsOM></GoodsOM>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <GoodsOMT></GoodsOMT>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <GoodsImage></GoodsImage>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Messages from "./Messages";
import GoodsOM from "./GoodsOM";
import GoodsOMT from "./GoodsOMT";
import GoodsImage from "./GoodsImage";
export default {
  components: {
    Messages,
    GoodsOM,
    GoodsOMT,
    GoodsImage,
  },
  data() {
    return {
      active: "0",
    };
  },
  created() {},
  mounted() {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>