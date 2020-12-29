<template>
  <div
    class="loginBox"
    :style="
      $store.state.cnModel
        ? 'background: url(' +
          require('../assets/loginBack.jpg') +
          ');background-repeat: no-repeat;background-size: 100% 100%;'
        : 'background-image: none;'
    "
  >
    <el-button class="cnModel" type="danger" size="mini" @click="changeModel"
      >LSP@Model</el-button
    >
    <el-form :model="userList" class="demo-form-inline">
      <el-image
        style="width: 100px; height: 100px"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1827257588,2159151289&fm=26&gp=0.jpg"
        fit="fill"
      ></el-image>
      <el-form-item label="用户名" label-width="70px">
        <el-input
          v-model="userList.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px">
        <el-input
          v-model="userList.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%"
          >立即登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: {
        username: "admin",
        password: "123456",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    async login() {
      const { data: res } = await this.$axios.post("login", this.userList);
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        this.$store.commit("putToken", res.data.token);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      }
    },
    changeModel() {
      this.$store.commit("changecnModel");
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.loginBox {
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #c4c4c4;
  .cnModel {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .el-form {
    width: 600px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -300px;
    background-image: url("../assets/loginForm.gif");
    background-position: bottom;
    background-size: 80% 20%;
    background-repeat: no-repeat;
    background-color: #fff;
    padding: 70px 50px;
    box-sizing: border-box;
    border-radius: 30px;
    .el-image {
      position: absolute;
      top: -70px;
      left: 50%;
      margin-left: -55px;
      border-radius: 50%;
      border: 5px lightsalmon solid;
    }
  }
}
</style>