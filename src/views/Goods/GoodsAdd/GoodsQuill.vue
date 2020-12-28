<template>
  <quill-editor ref="myQuillEditor" @change="changed" v-model="condent" />
</template>

<script>
export default {
  data() {
    return {
      condent: "",
    };
  },
  methods: {
    changed() {
      this.$emit("edit", this.condent);
    },
  },
  computed: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.quill-editor {
  height: 300px;
  margin-bottom: 80px;
}
</style>