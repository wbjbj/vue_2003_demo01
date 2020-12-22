<template>
  <el-container style="display:block;">
    <Header></Header>
    <el-container style="height: calc(100vh - 60px);">
      <Aside></Aside>
      <Main></Main>
    </el-container>
  </el-container>
</template>

<script>
import Main from './Main'
import Aside from './Aside'
import Header from './Header'
export default {
  data() {
    return {};
  },
  components: {
      Main,
      Aside,
      Header
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #545c64;
}

.el-main {
  background-color: #e9eef3;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>