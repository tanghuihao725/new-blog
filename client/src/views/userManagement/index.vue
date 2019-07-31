<template>
  <!-- 用户管理系统主界面 -->
  <div class="all-user-container">
    <h5>
      用户信息({{getAllUsers.length}})条
      <el-button type="text" :loading="loading" @click="showAll=!showAll">显示{{showAll?'正常':'全部'}}</el-button>
    </h5>
    <!-- PC版 Table -->
    <el-table
      :data="getAllUsers.data"
      stripe
      border
      style="width: 90%"
      ref="allUserTable"
      highlight-current-row
      v-loading="loading"
      empty_text="暂时没有用户信息"
    >
      <el-table-column prop="id" label="id" width="60" align="center"></el-table-column>

      <el-table-column prop="avator" label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-avatar size="small" shape="square" :src="getAvatar(scope)" />
        </template>
      </el-table-column>

      <el-table-column prop="sex" label="性别" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sex===1"><i class="el-icon-male" style="color:skyblue;font-size:1.2em"></i></span>
          <span v-else style="color:red"><i class="el-icon-female" style="color:pink;font-size:1.2em"></i></span>
        </template>
      </el-table-column>
      <el-table-column prop="telephone" label="手机号" width="180" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
      <el-table-column label="权限" align="center">
        <template slot-scope="scope">
          <!-- 显示权限徽章 -->
          <authBadage :authority="scope.row.authority" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>

      <el-table-column prop="isDelete" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isDelete===0">正常</span>
          <span v-else style="color:red">已删除</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="注册时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isDelete===0">
            <el-button icon="el-icon-edit" circle @click="handleEditUser(scope)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDeleteUser(scope)" circle></el-button>
          </div>
          <el-button
            v-else
            type="success"
            icon="el-icon-refresh-left"
            @click="handleRefreshUser(scope)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 用户编辑表单 dialog -->
    <editDialog from="manage" @update="updateData()" :defaultData="editShowData" :visible.sync="editDialogVisible" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { authorityName, avatarDefault } from "../../utils/common/user";
import authBadage from "../common/authBadage.vue";
import editDialog from "../components/editDialog";

export default {
  data() {
    return {
      // 显示全部/部分 flag
      showAll: false,
      // 页面加载 flag
      loading: false,
      
      // 用户编辑器弹窗是否打开 flag  &  用户编辑器默认的资料 
      editDialogVisible: false,
      editShowData:{}
    };
  },
  mounted() {
    // 刷新页面
    this.updateData(0);
  },
  computed: {
    ...mapGetters("user/userManagement", ["getAllUsers"]),
    // 获取设备类型
    isMobile: () => this.$store.state.isMobile
  },
  methods: {
      ...mapActions("user/userManagement", ["fetchAllUsers", "deleteUser","updateUser"]),
    /**
     * 获取用户头像信息
     */
    getAvatar(scope){
      if(scope.row.avator.length) return scope.row.avator
      return avatarDefault(scope.row.sex)
    },
    /**
     * 点击编辑用户事件
     */
    handleEditUser(scope) {
      this.editDialogVisible = true
      this.editShowData = scope.row
    },
    // 删除用户
    handleDeleteUser(scope) {
      this.$confirm("是否确认删除?", "删除用户", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消"
      })
        .then(() => {
          // 调用删除用户接口
          this.deleteUser({ id: scope.row.id })
            .then(() => {
              this.$message.success({ message: "操作成功" });
              this.updateData();
            })
            .catch(err => this.$message.error({ message: err.response.data.msg || err }));
        })
        .catch(() => {});
    },
    // 恢复用户
    handleRefreshUser(scope){
      this.$confirm("确认要恢复该用户吗?", "恢复用户", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type:'success'
      })
        .then(() => {
          const params = { id: scope.row.id }, data = {isDelete: 0}
          // 调用删除用户接口
          this.updateUser({ params, data })
            .then(() => {
              this.$message.success({ message: "操作成功" });
              this.updateData();
            })
            .catch(err => this.$message.error({ message: err.response.data.msg }));
        })
        .catch(() => {});
    },
    //更新数据
    updateData(type) {
      this.loading = true;
      this.fetchAllUsers({ type: type?type: this.showAll?1:0})
        .then(() => (this.loading = false))
        .catch(() => (this.loading = false));
    }
  },
  watch: {
    /**
     *  监听showAll变化是否决定如何展示数据信息
     */
    showAll(val) {
      this.updateData(val ? 1 : 0);
    }
  },
  components: {
    authBadage,
    editDialog
  }
};
</script>

<style lang="less" scoped>
.all-user-container{
  text-align: center;
}
</style>

