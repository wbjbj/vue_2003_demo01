<template>
  <el-dialog
    title="物流进度"
    :visible.sync="showTimeLines"
    width="50%"
    :before-close="Close"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="index == 0 ? 'el-icon-location' : ''"
        :type="index == 0 ? 'success' : ''"
        :timestamp="activity.time"
      >
        {{ activity.context }}
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="Close">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["showTimeLines"],
  data() {
    return {
      activities: [],
    };
  },
  created() {
    this.getTimeOrder();
  },
  mounted() {},
  methods: {
    async getTimeOrder() {
      const { data: res } = await this.$axios.get(
        `/kuaidi/${804909574412544580}`
      );
      if (res.meta.status == 200) {
        this.activities = res.data;
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