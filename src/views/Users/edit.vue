<template>
  <el-dialog
    :title="IfAddUser ? '添加用户' : '修改'"
    :visible.sync="editChange"
    width="30%"
    :before-close="Close"
  >
    <el-form :model="users" v-if="IfAddUser">
      <el-form-item label="用户名" label-width="70px">
        <el-input v-model="users.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px">
        <el-input v-model="users.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="70px">
        <el-input v-model="users.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="70px">
        <el-input v-model="users.mobile"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="editUserMessage" v-if="!IfAddUser">
      <el-form-item label="邮箱" label-width="70px">
        <el-input v-model="editUserMessage.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="70px">
        <el-input v-model="editUserMessage.mobile"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="IfAddUser ? addUser() : editUser()"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      users: {
        email: "",
        mobile: "",
        password: "",
        username: "",
      },
    };
  },
  props: ["editChange", "IfAddUser", "editUserMessage"],
  created() {},
  mounted() {},
  methods: {
    Close() {
      this.$emit("close", false);
    },
    async addUser() {
      const { data: res } = await this.$axios.post("users", this.users);
      if (res.meta.status == 201) {
        this.$message.success(res.meta.msg);
        this.$emit("editOK", res);
        this.users.email = this.users.mobile = this.users.password = this.users.username =
          "";
        this.Close();
      } else {
        this.$message.error(res.meta.msg);
      }
    },
    async editUser() {
      const { data: res } = await this.$axios.put(
        `users/${this.editUserMessage.id}`,
        {
          email: this.editUserMessage.email,
          mobile: this.editUserMessage.mobile,
        }
      );
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.$emit("editOK", res);
      } else {
        this.$message.error(res.meta.msg);
      }
      this.Close();
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>