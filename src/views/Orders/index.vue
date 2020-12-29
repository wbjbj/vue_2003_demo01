<template>
  <div class="back">
    <el-input placeholder="请输入内容" clearable v-model="query">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="getOrderList"
      ></el-button>
    </el-input>
    <el-table :data="orderList" stripe style="margin: 10px 0">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column label="订单编号" prop="order_number" min-width="150px">
      </el-table-column>
      <el-table-column label="订单价格" prop="order_price"> </el-table-column>
      <el-table-column label="是否付款">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.order_pay == '0' ? 'danger' : ''"
            effect="dark"
          >
            {{ scope.row.order_pay == "0" ? "未付款" : "已付款" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send"> </el-table-column>
      <el-table-column label="下单时间" min-width="150px">
        <template slot-scope="scope">
          {{ scope.row.create_time | putTimeString }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-tooltip
            class="item"
            effect="dark"
            content="修改订单地址"
            placement="top"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEdit = true"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="物流信息"
            placement="top"
          >
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location"
              @click="showTimeLines = true"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <Page :pages="pages" @changeSize="setSize" @changeNum="setNum"></Page>
    <EditPlace :showEdit="showEdit" @close="showEdit = false"></EditPlace>
    <ShowTimeLine
      :showTimeLines="showTimeLines"
      @close="showTimeLines = false"
    ></ShowTimeLine>
  </div>
</template>

<script>
import Page from "@/components/Page";
import EditPlace from "./EditPlace";
import ShowTimeLine from "./ShowTimeLine";
export default {
  components: { Page, EditPlace, ShowTimeLine },
  data() {
    return {
      orderList: [],
      query: "",
      pages: {
        num: 1,
        size: 10,
        total: 0,
        sizes: [10, 15, 20, 25],
      },
      showEdit: false,
      showTimeLines: false,
    };
  },
  created() {
    this.getOrderList();
  },
  mounted() {},
  methods: {
    async getOrderList() {
      console.log(this.query);
      const { data: res } = await this.$axios.get(
        `orders?query=${this.query}&pagenum=${this.pages.num}&pagesize=${this.pages.size}`
      );
      if (res.meta.status == 200) {
        this.orderList = res.data.goods;
        this.pages.num = Number(res.data.pagenum);
        this.pages.total = res.data.total;
      }
    },
    setSize(val) {
      this.pages.size = val;
      this.getOrderList();
    },
    setNum(val) {
      this.pages.num = val;
      this.getOrderList();
    },
  },
  computed: {},
  filters: {
    putTimeString(num) {
      let date = new Date(num);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
};
</script>

<style lang='scss' scoped>
.el-input {
  width: 500px;
}
</style>