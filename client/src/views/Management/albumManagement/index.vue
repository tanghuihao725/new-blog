<template>
  <div class="album-management-container">
     <el-button type="success" size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="albums" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="icon" label="icon" width="100"></el-table-column>
      <el-table-column prop="albumName" label="albumName"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
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
      <el-table-column prop="color" label="颜色">
        <template slot-scope="scope">
          <div
            class="color-squre"
            :style="`width:20px;height:20px;backgroundColor:${scope.row.color}`"
          ></div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <opDialog 
    :dialogVisible.sync="opDialogVisibile"
    :defaultData="opDefaultData"
    @success="refreshData"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import opDialog from './opDialog'

export default {
  data(){
    return {
      loading: false,
      opDialogVisibile: false,
      opDefaultData: null
    }
  },
  computed: {
    ...mapGetters("content/albums", ["albums"])
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    ...mapActions("content/albums", ["fetchAlbums","deleteAlbum"]),
    /**
     * 刷新表格数据
     */
    refreshData() {
      this.loading = true
      this.fetchAlbums()
        .then(()=> this.loading = false)
    },
    /**
     * 删除和修改,新增操作
     */
    handleEdit(row){
      this.opDefaultData = row
      this.opDialogVisibile = true;
    },
    handleDelete(row){
      const id = row.id
      this.deleteAlbum({id})
        .then(() => {
              this.$message.success({ message: "删除成功" });
              this.refreshData();
            })
            .catch(err => this.$message.error({ message: err.response.data.msg || err }));
    },
    handleAdd(){
      this.opDefaultData = null
      this.opDialogVisibile = true;
    }
  },
  components:{
    opDialog
  }
};
</script>

<style lang="less" scoped>
.album-management-container{
  .el-icon-lock{
    color: red;
  }
  .el-icon-close-notification{
    color: orange;
  }
  .el-icon-check{
    color: green;
  }
}
</style>