<template>
  <el-dialog
    title="提示"
    :visible.sync="setingShow"
    width="30%"
    :before-close="Close"
  >
    <el-tree
      :data="settingList"
      show-checkbox
      node-key="id"
      :default-expanded-keys="expanded"
      :default-checked-keys="checked"
      :props="defaultProps"
      ref="tree"
    >
    </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="choseSets">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      settingList: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },
      expanded: [],
    };
  },
  props: ["setingShow", "settingRole", "checked"],
  created() {
    this.getSettingList();
  },
  mounted() {},
  methods: {
    async choseSets() {
      let treeKeys = [];
      this.$refs.tree.getCheckedNodes().map((item) => {
        treeKeys.push(item.id);
      });
      const { data: res } = await this.$axios.post(
        `roles/${this.settingRole.id}/rights`,
        {
          rids: treeKeys.join(","),
        }
      );
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.$emit("changeOK");
        this.Close();
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    Close() {
      this.$emit("close");
    },
    async getSettingList() {
      const { data: res } = await this.$axios.get("rights/tree");
      if (res.meta.status == 200) {
        this.settingList = res.data;
        this.expanded = this.getLeafKey(this.settingList);
      }
    },
    getLeafKey(tree) {
      let keys = [];
      tree.map((item) => {
        keys.push(item.id);
        if (item.children) {
          keys = keys.concat(this.getLeafKey(item.children));
        }
      });
      return keys;
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>