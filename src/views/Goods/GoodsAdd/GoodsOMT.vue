<template>
  <el-form label-position="top">
    <el-form-item
      :label="item.attr_name"
      v-for="item in message"
      :key="item.attr_id"
    >
      <el-input
        v-model="item.attr_vals"
        @input="show(item.attr_id, item.attr_vals)"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["message", "pushList"],
  created() {},
  mounted() {},
  methods: {
    show(id, val) {
      let indexs = this.FindVals(id);
      if (indexs != -1) this.pushList.attrs.splice(indexs, 1);
      this.pushList.attrs.push({ 'attr_id': id, 'attr_value': val });
    },
    FindVals(id) {
      let v = -1;
      this.pushList.attrs.map((item, index) => {
        if (item.attr_id == id) {
          v = index;
          return;
        }
      });
      return v;
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>