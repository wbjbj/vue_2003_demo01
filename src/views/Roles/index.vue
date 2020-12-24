<template>
  <div class="back">
    <el-button
      style="margin-bottom: 10px"
      type="primary"
      @click="
        showEdit = true;
        AddEdit = true;
      "
      >添加角色</el-button
    >
    <el-table :data="rolesList" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <treeShell :rightList="props.row"></treeShell>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="
              showEdit = true;
              AddEdit = false;
              editUser = scope.row;
            "
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="removeRole(scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="
              checked = putChecked(scope.row.children);
              setingShow = true;
              settingRole = scope.row;
            "
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Edit
      :showEdit="showEdit"
      :editUser="editUser"
      :AddEdit="AddEdit"
      @close="showEdit = false"
      @changeOK="getRolesList"
    ></Edit>
    <SettingTree
      v-if="setingShow"
      :setingShow="setingShow"
      :settingRole="settingRole"
      :checked="checked"
      @close="setingShow = false"
      @changeOK="getRolesList"
    ></SettingTree>
  </div>
</template>


<script>
import Edit from "./edit";
import treeShell from "./treeShell";
import SettingTree from "./SettingTree";
export default {
  data() {
    return {
      rolesList: [],
      showEdit: false,
      editUser: null,
      AddEdit: true,
      setingShow: false,
      settingRole: null,
      checked: [],
    };
  },
  components: {
    treeShell,
    Edit,
    SettingTree,
  },
  created() {
    this.getRolesList();
  },
  mounted() {},
  methods: {
    async getRolesList() {
      const { data: res } = await this.$axios.get("roles");
      if (res.meta.status == 200) {
        this.rolesList = res.data;
      }
    },
    removeRole(role) {
      this.$confirm("此操作将永久删除该用户角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(`roles/${role.id}`);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.getRolesList();
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    putChecked(tree) {
      let keys = [];
      tree.map((item) => {
        if (item.children) {
          keys = keys.concat(this.putChecked(item.children));
        } else {
          keys.push(item.id);
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