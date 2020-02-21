<template>
  <div class="blog-management-container">
    <el-button type="success" size="mini" @click="handleEidtBlog">新增</el-button>
    <el-table :data="blogs" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" width="100"></el-table-column>
      <el-table-column prop="views" label="浏览量" width="100"></el-table-column>
      <el-table-column prop="likes" label="点赞" width="100"></el-table-column>
      <el-table-column prop="albumName" label="专辑"></el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <span v-for="tag in scope.row.tagDetails" :key="tag.id">[{{tag.tagName}}]</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="种类(type)" align="center"></el-table-column>
      <el-table-column label="公开" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.hide === 1" class="el-icon-lock"></i>
          <i v-else class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column label="首页显示" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.notPush === 1" class="el-icon-close-notification"></i>
          <i v-else class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column prop="orderFactor" label="排序因子" align="center"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEidtBlog(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">操作</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination 
    layout="total, prev, pager, next" 
    :total="total"
    :pageSize="pageSize"
    @current-change="handleCurrentChange"
    >

    </el-pagination>

    <opDialog
      :dialogVisible.sync="opDialogVisibile"
      :defaultData="opDefaultData"
      @success="refreshData"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import opDialog from "./opDialog";

export default {
  data() {
    return {
      loading: false,
      opDialogVisibile: false,
      opDefaultData: null,
      pageNum: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapGetters("content/blogs", ["blogs","total"])
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    ...mapActions("content/blogs", ["fetchBlogs", "deleteBlog"]),
    /**
     * 刷新表格数据
     */
    refreshData() {
      this.loading = true;
      this.fetchBlogs({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: 1
      }).then(() => (this.loading = false));
    },
    /**
     * 分页改变
     */
    handleCurrentChange(newPage){
      this.pageNum = newPage
      this.refreshData()
    },
    /**
     * 删除和修改,新增操作
     */
    handleEdit(row) {
      this.opDefaultData = row;
      this.opDialogVisibile = true;
    },
    handleOp(row) {
      this.opDefaultData = row;
      this.opDialogVisibile = true;
    },
    handleDelete(row) {
      const id = row.id;
      this.deleteBlog({ id })
        .then(() => {
          this.$message.success({ message: "删除成功" });
          this.refreshData();
        })
        .catch(err =>
          this.$message.error({ message: err.response.data.msg || err })
        );
    },
    handleEidtBlog(row){
      const params = {}
      if(row){
        params.id = row.id
      }
      this.$router.push({ path: '/blog-edit', query: params })
    }
  },
  components: {
    opDialog
  }
};
</script>

<style lang="less" scoped>
.blog-management-container {
  .el-icon-lock {
    color: red;
  }
  .el-icon-close-notification {
    color: orange;
  }
  .el-icon-check {
    color: green;
  }
}
</style>