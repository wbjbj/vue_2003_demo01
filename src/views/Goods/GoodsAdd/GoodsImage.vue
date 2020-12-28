<template>
  <div>
    <el-upload
      action="https://www.liulongbin.top:8888/api/private/v1/upload"
      list-type="picture-card"
      :headers="imgUrlHeader"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="putSueccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrlHeader: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
  },
  props: ["goodsImage"],
  created() {},
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      let indexs = this.FindVals("/" + file.response.data.tmp_path);
      if (indexs != -1) return this.goodsImage.splice(indexs, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    putSueccess(res, file, fileList) {
      if (res.meta.status == 200) {
        this.goodsImage.push({ pic: "/" + res.data.tmp_path });
      }
    },
    FindVals(key) {
      let v = -1;
      this.goodsImage.map((item, index) => {
        if (item.pic == key) {
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