<template>
  <el-dialog
    title="操作"
    top="10vh"
    @open="handleOpen"
    :width="baseInfo.isMobile? '90%' : '50%'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-slider v-model="form.orderFactor"></el-slider>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    dialogVisible: {
      default: false
    },
    // 是否传数据进来
    defaultData: {
      default: null
    }
  },
  data() {
    return {
      form: {
        title: "",
        views: 0,
        likes: 0,
        orderFactor: 50
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"])
  },
  methods: {
    ...mapActions("content/blogs", ["updateBlog"]),
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleOpen() {
      const {
        title,
        views,
        likes,
        orderFactor,
        id,
        ...others
      } = this.defaultData;
      Object.assign(this.form, { title, views, likes, orderFactor, id });
    },
    onSubmit() {
      /**
       * 预处理：blog名空检查
       */
      if (!this.form.title) {
        this.$message.error({ message: "博客标题不能为空" });
        return;
      }
      this.updateBlog(this.form)
        .then(() => {
          this.$message.success({ message: "操作成功" });
          this.$emit("success");
          this.handleClose();
        })
        .catch(err => this.$message.error({ message: err.msg || err }));
    }
  }
};
</script>