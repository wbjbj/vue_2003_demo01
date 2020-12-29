<template>
  <el-aside :width="NavCollApse ? '64px' : '200px'">
    <div @click="NavCollApse = !NavCollApse" class="navConcoller">|||</div>
    <el-menu
      :unique-opened="true"
      :collapse-transition="false"
      :collapse="NavCollApse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="menuListIcon[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          :index="'/' + row.path"
          v-for="row in item.children"
          :key="row.id"
          >{{ row.authName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      menuListIcon: {
        125: "el-icon-user",
        103: "el-icon-help",
        101: "el-icon-shopping-bag-1",
        102: "el-icon-document",
        145: "el-icon-data-line",
      },
      NavCollApse: false,
    };
  },
  created() {
    this.getLeftNav();
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getLeftNav() {
      const { data: res } = await this.$axios.get("menus");
      if (res.meta.status === 200) {
        this.menuList = res.data;
      }
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.el-aside {
  background-color: rgba($color: #545c64, $alpha: 0.8);
  .navConcoller {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: rgba($color: #cccccc, $alpha: 0.8);
    height: 15px;
    font-size: 15px;
    line-height: 15px;
    margin: 5px 0;
    padding: 5px 0;
    background-color: rgba($color: #444c54, $alpha: 0.8);
  }
  .el-menu {
    border: none;
  }
}
</style>