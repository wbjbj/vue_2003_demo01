<template>
  <div class="boxAll">
    <div class="first" v-for="rFirst in rightList.children" :key="rFirst.id">
      <div class="firstBox">
        <el-tag
          effect="dark"
          closable
          @close="delRight(rightList, rFirst.id)"
          >{{ rFirst.authName }}</el-tag
        >
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="secondAll">
        <div
          class="second"
          v-for="rSecond in rFirst.children"
          :key="rSecond.id"
        >
          <div class="secondBox">
            <el-tag
              type="success"
              effect="dark"
              closable
              @close="delRight(rightList, rSecond.id)"
              >{{ rSecond.authName }}</el-tag
            >
            <i class="el-icon-caret-right"></i>
          </div>
          <div class="thirdAll">
            <div
              class="third"
              v-for="rThird in rSecond.children"
              :key="rThird.id"
            >
              <el-tag
                type="warning"
                effect="dark"
                closable
                @close="delRight(rightList, rThird.id)"
                >{{ rThird.authName }}</el-tag
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["rightList"],
  created() {},
  mounted() {},
  methods: {
    async delRight(role, rightId) {
      const { data: res } = await this.$axios.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
        role.children = res.data;
      }
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
.boxAll {
  width: 100%;
  border-left: 1px #efefef solid;
  border-bottom: 1px #efefef solid;
  border-right: 1px #efefef solid;
  .first {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .firstBox {
      text-align: center;
      display: flex;
      border-top: 1px #efefef solid;
      border-right: 1px #efefef solid;
      .el-tag {
        display: inline-block;
        align-self: center;
        margin-left: 20px;
      }
      i {
        display: inline-block;
        align-self: center;
      }
    }
    .secondAll {
      flex: 1;
      display: inline-block;
      .second {
        width: 100%;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        border-top: 1px #efefef solid;
        .secondBox {
          width: 30%;
          text-align: center;
          display: inline-block;
          margin: auto 0;
          i {
            display: inline-block;
            align-self: center;
          }
        }
        .thirdAll {
          display: inline-block;
          flex: 1;
          .third {
            margin: 10px;
            float: left;
          }
        }
      }
    }
  }
}
</style>