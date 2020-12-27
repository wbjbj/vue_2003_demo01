<template>
  <div class="back">
    <el-form inline>
      <el-form-item>
        <el-input
          placeholder="请输入搜索内容"
          style="width: 400px"
          v-model="query"
        >
          <template slot="append">
            <el-button icon="el-icon-search" @click="getgoodsList"></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$router.push('/goods/add')"
          >添加商品</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="goodsList">
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="商品名称" prop="goods_name" width="900px">
      </el-table-column>
      <el-table-column label="商品价格(元)" prop="goods_price">
      </el-table-column>
      <el-table-column label="商品重量" prop="goods_weight"> </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | putTimeString }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="mini"
            @click="editGoods(scope.row)"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="removeGoods(scope.row.goods_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page
      :pages="pages"
      @changeSize="
        (val) => {
          pages.size = val;
          getgoodsList();
        }
      "
      @changeNum="
        (val) => {
          pages.num = val;
          getgoodsList();
        }
      "
    ></Page>
  </div>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: { Page },
  data() {
    return {
      query: "",
      goodsList: [],
      pages: {
        num: 1,
        size: 10,
        total: 0,
        sizes: [5, 10, 15, 20],
      },
    };
  },
  created() {
    this.getgoodsList();
  },
  mounted() {},
  methods: {
    async getgoodsList() {
      const { data: res } = await this.$axios.get(
        `goods?query=${this.query}&pagenum=${this.pages.num}&pagesize=${this.pages.size}`
      );
      if (res.meta.status == 200) {
        this.goodsList = res.data.goods;
        this.pages.num = Number(res.data.pagenum);
        this.pages.total = res.data.total;
      }
    },
    removeGoods(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$axios.delete(`goods/${id}`);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.pages.num = 1;
            this.getgoodsList();
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
    editGoods(row) {
      console.log(row);
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
</style>