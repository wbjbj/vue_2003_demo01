<template>
  <el-dialog
    :title="AddEdit ? '添加角色' : '编辑角色'"
    :visible.sync="showEdit"
    width="30%"
    :before-close="Close"
  >
    <el-form :model="newRole" v-if="AddEdit">
      <el-form-item label="角色名称" label-width="70px">
        <el-input v-model="newRole.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="70px">
        <el-input v-model="newRole.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="editUser" v-if="!AddEdit">
      <el-form-item label="角色名称" label-width="70px">
        <el-input v-model="editUser.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="70px">
        <el-input v-model="editUser.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="AddEdit ? addRole() : editRole()"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      newRole: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  props: ["showEdit", "editUser", "AddEdit"],
  created() {},
  mounted() {},
  methods: {
    async addRole() {
      const { data: res } = await this.$axios.post("roles", this.newRole);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
        this.$emit("changeOK");
        this.Close();
      } else {
        this.$message.error(res.meta.msg);
      }
      this.newRole.roleName = "";
      this.newRole.roleDesc = "";
    },
    async editRole() {
      const { data: res } = await this.$axios.put(`roles/${this.editUser.id}`, {
        roleName: this.editUser.roleName,
        roleDesc: this.editUser.roleDesc,
      });
      if (
        res.meta.status == 200 &&
        this.editUser.roleName != "" &&
        this.editUser.roleDesc != ""
      ) {
        this.$message.success("编辑成功");
        this.$emit("changeOK");
        this.Close();
      } else if (this.editUser.roleName == "" || this.editUser.roleDesc == "") {
        this.$message.error("角色名称或角色描述不能为空！");
      }
    },
    Close() {
      this.$emit("close");
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>