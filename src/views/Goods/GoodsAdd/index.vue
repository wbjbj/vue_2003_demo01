<template>
  <div class="back">
    <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
    <el-steps :active="active - 0" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs v-model="active" :before-leave="beforeLeave" tabPosition="left">
      <el-tab-pane label="基本信息" name="0">
        <Messages :goodsMessage="GoodsAddList"></Messages>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <GoodsOM :message="attrList" :pushList="GoodsAddList"></GoodsOM>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <GoodsOMT :message="attrList" :pushList="GoodsAddList"></GoodsOMT>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <GoodsImage :goodsImage="GoodsAddList.pics"></GoodsImage>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <GoodsQuill
          @edit="(val) => (GoodsAddList.goods_introduce = val)"
        ></GoodsQuill>
        <el-button @click="addGood">添加商品</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Messages from "./Messages";
import GoodsOM from "./GoodsOM";
import GoodsOMT from "./GoodsOMT";
import GoodsImage from "./GoodsImage";
import GoodsQuill from "./GoodsQuill";
export default {
  components: {
    Messages,
    GoodsOM,
    GoodsOMT,
    GoodsImage,
    GoodsQuill,
  },
  data() {
    return {
      active: "0",
      GoodsAddList: {
        goods_name: "",
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      attrList: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    beforeLeave(activeName, oldActiveName) {
      if (activeName != "0" && this.GoodsAddList.goods_cat.length != 3) {
        this.$message.error("请选择商品分类");
        this.GoodsAddList.goods_cat = [];
        return false;
      }
      if (activeName == "1" || activeName == "2") this.getAttrList(activeName);
    },
    async getAttrList(activeName) {
      const { data: res } = await this.$axios.get(
        `categories/${this.GoodsAddList.goods_cat[2]}/attributes?sel=${
          activeName == "1" ? "many" : "only"
        }`
      );
      if (res.meta.status == 200) this.attrList = res.data;
    },
    async addGood() {
      this.GoodsAddList.goods_price = Number(this.GoodsAddList.goods_price);
      this.GoodsAddList.goods_number = Number(this.GoodsAddList.goods_number);
      this.GoodsAddList.goods_weight = Number(this.GoodsAddList.goods_weight);
      console.log(this.GoodsAddList.goods_cat);
      this.GoodsAddList.goods_cat = this.GoodsAddList.goods_cat.join(",");
      const { data: res } = await this.$axios.post("goods", this.GoodsAddList);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
      } else {
        this.$message.error(res.meta.msg);
      }
      this.$router.push("/goods");
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