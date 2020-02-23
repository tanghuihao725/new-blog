<template>
  <div class="message-management-container">
    <p class="tips">目前只开通了首页留言功能 共有 {{messagesTotal}} 条留言</p>

    <el-table :data="messages" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <!-- <el-table-column prop="fromType" label="来自"></el-table-column> -->
      <el-table-column prop="nickname" label="用户"></el-table-column>
      <!-- <el-table-column prop="blogId" label="博客id"></el-table-column> -->
      <el-table-column prop="body" label="内容"></el-table-column>
      <el-table-column prop="contact" label="联系方式"></el-table-column>
      <el-table-column prop="hide" label="hide"></el-table-column>
      <el-table-column prop="picked" label="是否精选">
        <template slot-scope="scope">
          <span v-if="!!scope.row.picked" style="color:orange">
            <i class="el-icon-star-on"></i>
          </span>
          <span v-else style="color:#666">
            <i class="el-icon-star-off"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="orderFactor" label="排序因子"></el-table-column>
      <el-table-column prop="createdAt" label="留言时间"></el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button
            @click="handlePick(scope.row)"
            type="text"
            size="small"
          >{{scope.row.picked ? '取消精选' : '设为精选'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

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
      opDefaultData: null
    };
  },
  computed: {
    ...mapGetters("content/messages", ["messages", "messagesTotal"])
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    ...mapActions("content/messages", [
      "fetchMessages",
      "deleteMessage",
      "updateMessage"
    ]),
    /**
     * 刷新表格数据
     */
    refreshData() {
      this.loading = true;
      this.fetchMessages({
        type: "0"
      }).then(() => (this.loading = false));
    },
    /**
     * 删除和修改,新增操作
     */
    handleEdit(row) {
      this.opDefaultData = row;
      this.opDialogVisibile = true;
    },
    handleDelete(row) {
      const id = row.id;
      this.deleteMessage({ id })
        .then(() => {
          this.$message.success({ message: "删除成功" });
          this.refreshData();
        })
        .catch(err =>
          this.$message.error({ message: err.response.data.msg || err })
        );
    },
    handlePick(row) {
      const id = row.id;
      const picked = !Boolean(row.picked);
      this.updateMessage({ id, picked })
        .then(() => {
          this.$message.success({ message: "设置成功" });
          this.refreshData();
        })
        .catch(err =>
          this.$message.error({ message: err.response.data.msg || err })
        );
    }
  },
  components: {
    opDialog
  }
};
</script>

<style lang="less" scoped>
.tips {
  color: #666;
  font-size: 0.8em;
}
</style>