<template>
  <div class="back">
    <div id="main" :style="{ width: '100%', height: '500px' }"></div>
  </div>
</template>

<script>
const _ = require("lodash");
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.putEcharts();
  },
  methods: {
    async putEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      const { data: res } = await this.$axios.get("reports/type/1");
      const result = _.merge(res.data, this.options);
      myChart.setOption(result);
      console.log(result);
    },
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
</style>