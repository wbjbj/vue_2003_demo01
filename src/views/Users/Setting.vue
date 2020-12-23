<template>
  <el-dialog
    title="提示"
    :visible.sync="setting"
    width="30%"
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="用户ID" label-width="70px">
        <el-input v-model="user.id" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="用户名称" label-width="70px">
        <el-input v-model="user.username" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="角色" label-width="70px">
        <el-select v-model="choseRole" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="EditOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      choseRole: "",
    };
  },
  props: ["setting", "user", "roleList"],
  created() {
    console.log(this.setting, this.user, this.roleList);
  },
  mounted() {},
  methods: {
    handleClose() {
      this.Close();
    },
    Close() {
      this.$emit("close", false);
      this.choseRole = "";
    },
    async EditOk() {
      const { data: res } = await this.$axios.put(
        `users/${this.user.id}/role`,
        {
          rid: this.choseRole,
        }
      );
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.Close();
      } else {
        this.$message.error(res.meta.msg);
      }
      this.Close();
      this.$emit("editOK");
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>