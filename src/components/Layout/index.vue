<template>
  <el-container style="display: block">
    <div
      class="backs"
      :style="
        $store.state.cnModel
          ? 'background: url(' +
            require('../../assets/loginBack.jpg') +
            ');background-repeat: no-repeat;background-size: 100% 100%;'
          : 'background-image: none;'
      "
    >
      <Header></Header>
      <el-container style="height: calc(100vh - 60px)">
        <Aside></Aside>
        <Main></Main>
      </el-container>
    </div>
  </el-container>
</template>

<script>
import Main from "./Main";
import Aside from "./Aside";
import Header from "./Header";
export default {
  data() {
    return {
      cnModel: false,
    };
  },
  components: {
    Main,
    Aside,
    Header,
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: rgba($color: #545c64, $alpha: 0.8);
}

.el-main {
  background-color: rgba($color: #e9eef3, $alpha: 0.8);
}

body > .el-container {
  margin-bottom: 40px;
  position: relative;
}
.backs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  z-index: 99;
}
</style>