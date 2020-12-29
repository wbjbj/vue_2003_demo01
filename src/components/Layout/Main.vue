<template>
  <el-main>
    <Bread v-if="$route.path != '/home'"></Bread>
    <router-view> </router-view>
  </el-main>
</template>

<script>
import Bread from "./Bread";
export default {
  data() {
    return {};
  },
  components: {
    Bread,
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style lang='scss' scoped>
.back {
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
}
</style>