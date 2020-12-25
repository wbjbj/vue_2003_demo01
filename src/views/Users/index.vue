<template>
  <div class="back">
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="请输入内容" clearable v-model="query">
          <template slot="append">
            <el-button icon="el-icon-search" @click="getUserList"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="
            editChange = true;
            IfAddUser = true;
          "
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row.id, scope.row.mg_state)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="
              editUser = scope.row;
              editChange = true;
              IfAddUser = false;
            "
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUser(scope.row.id)"
          ></el-button>
          <el-tooltip content="分配角色" placement="top">
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="
                setting = true;
                settingUser = scope.row;
                getRolesList();
              "
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <Page :pages="pages" @changeSize="setSize" @changeNum="setNum"></Page>
    <Edit
      :editChange="editChange"
      :IfAddUser="IfAddUser"
      :editUserMessage="editUser"
      @close="(val) => (editChange = val)"
      @editOK="
        editUser = null;
        getUserList();
      "
    ></Edit>
    <Setting
      :setting="setting"
      :user="settingUser"
      :roleList="roleList"
      @close="(val) => (setting = val)"
      @editOK="getUserList"
    ></Setting>
  </div>
</template>

<script>
import Page from "@/components/Page";
import Edit from "./edit";
import Setting from "./Setting";
export default {
  data() {
    return {
      userList: [],
      query: "",
      pages: {
        num: 1,
        size: 2,
        total: 0,
        sizes: [1, 2, 5, 10],
      },
      editChange: false,
      IfAddUser: true,
      editUser: null,
      setting: false,
      settingUser: { username: "", id: 0 },
      roleList: [],
    };
  },
  components: {
    Page,
    Edit,
    Setting,
  },
  created() {
    this.getUserList();
  },
  mounted() {},
  methods: {
    async getUserList() {
      const { data: res } = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.pages.num}&pagesize=${this.pages.size}`
      );
      if (res.meta.status == 200) {
        this.pages.num = res.data.pagenum;
        this.pages.total = res.data.total;
        this.userList = res.data.users;
      }
    },
    setSize(val) {
      this.pages.size = val;
      this.getUserList();
    },
    setNum(val) {
      this.pages.num = val;
      this.getUserList();
    },
    async changeUserState(uid, type) {
      const { data: res } = await this.$axios.put(`users/${uid}/state/${type}`);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.getUserList();
      }
    },
    removeUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(`users/${id}`);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.pages.num = 1;
            this.getUserList();
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
    async getRolesList() {
      const { data: res } = await this.$axios.get("roles");
      if (res.meta.status == 200) {
        this.roleList = res.data;
        console.log(this.roleList);
      }
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>