<template>
  <div class="back">
    <div class="add">
      <el-button type="primary" @click="dialogFormVisible = true"
        >添加分类</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column type label="#" prop="set_id" width="50">
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" min-width="100">
      </el-table-column>
      <el-table-column label="是否有效">
        <template>
          <i class="el-icon-success"></i>
        </template>
      </el-table-column>
      <el-table-column label="当前层级">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="
              scope.row.cat_level == 0
                ? ''
                : scope.row.cat_level == 1
                ? 'success'
                : 'warning'
            "
          >
            {{
              scope.row.cat_level == 0
                ? "一级"
                : scope.row.cat_level == 1
                ? "二级"
                : "三级"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="update(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="del(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-cascader
          v-model="value"
          :options="tableData"
          @change="handleChange"
          :props="props"
        ></el-cascader>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改分类" :visible.sync="upfromflag">
      <el-form :model="upform">
        <el-form-item label="分类名称">
          <el-input v-model="upform.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upfromflag = false">取 消</el-button>
        <el-button type="primary" @click="okupdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      value: "",
      form: {
        cat_name: "",
        cat_pid: "",
        cat_level: 0,
      },
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      upform: {
        cat_name: "",
      },
      upfromflag: false,
    };
  },
  created() {},
  mounted() {
    this.Categories();
  },
  methods: {
    async Categories() {
      const { data: res } = await this.$axios.get(
        `categories?pagenum=${1}&pagesize=${5}`
      );
      if (res.meta.status == 200) {
        this.tableData = res.data.result;
        this.tableData.map((item, index) => {
          if (item.cat_level == 0) {
            item.set_id = index + 1;
          }
        });
      }
    },
    handleChange(arr) {
      if (arr.length == 2 || arr.length == 3) {
        this.form.cat_level = 2;
        this.form.cat_pid = arr[1];
      } else {
        if (arr.length == 1) {
          this.form.cat_level = 1;
          this.form.cat_pid = arr[0];
        } else {
          this.form.cat_level = 0;
          this.form.cat_pid = 0;
        }
      }
    },
    async add() {
      let res = await this.$axios.post(`categories`, {
        cat_pid: this.form.cat_pid,
        cat_name: this.form.cat_name,
        cat_level: this.form.cat_level,
      });
      if (res.meta.status == 201) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.Categories();
        this.dialogFormVisible = false;
      }
    },
    async update(id) {
      let res = await this.$axios.get(`categories/${id}`);
      (this.upfromflag = true), (this.upform = res.data);
    },
    async okupdate() {
      let res = await this.$axios.put(`categories/${this.upform.cat_id}`, {
        cat_name: this.upform.cat_name,
      });
      if (res.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.upfromflag = false;
        this.Categories();
      }
    },
    async del(id) {
      let res = await this.$axios.delete(`categories/${id}`);
      if ((res.meta.status = 200)) {
        this.$message({
          type: "success",
          message: res.meta.msg,
        });
        this.Categories();
      } else {
        this.$message({
          type: "error",
          message: res.meta.msg,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.el-icon-error {
  background: red;
  color: #fff;
}
.el-icon-success {
  color: green;
}
.el-table {
  margin-top: 10px;
}
</style>