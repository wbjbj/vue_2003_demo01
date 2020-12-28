<template>
  <el-form label-position="top">
    <el-form-item
      v-for="item in message"
      :key="item.attr_id"
      :label="item.attr_name"
    >
      <el-checkbox
        v-for="(val, index) in item.attr_vals.split(',')"
        v-show="!!item.attr_vals"
        :key="index"
        v-model="Many"
        :label="val"
        bord
        @change="show(item.attr_id, val)"
      ></el-checkbox>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      Many: [],
    };
  },
  props: ["message", "pushList"],
  created() {},
  mounted() {},
  methods: {
    show(id, val) {
      if (this.Many.indexOf(val) != -1) {
        this.pushList.attrs.push({ 'attr_id': id, 'attr_value': val });
      } else {
        let indexs = this.FindVals(id, val);
        if (indexs != -1) this.pushList.attrs.splice(indexs, 1);
      }
    },
    FindVals(id, val) {
      let v = -1;
      this.pushList.attrs.map((item, index) => {
        if (item.attr_id == id && item.attr_value == val) {
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