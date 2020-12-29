<template>
  <el-dialog
    title="修改地址"
    :visible.sync="showEdit"
    width="30%"
    :before-close="Close"
  >
    <el-form>
      <el-form-item label="省市区/县" label-width="80px">
        <el-cascader
          v-model="val"
          :options="cityOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" label-width="80px">
        <el-input v-model="placeWord"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="EditOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import cityOptions from "@/assets/city_data2017_element.js";
export default {
  props: ["showEdit"],
  data() {
    return {
      cityOptions: cityOptions,
      val: [],
      placeWord: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
    Close() {
      this.$emit("close");
    },
    EditOK() {
      console.log(this.val, this.placeWord);
      this.$message.success("修改成功!");
      this.Close();
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-cascader {
  width: 100%;
}
</style>