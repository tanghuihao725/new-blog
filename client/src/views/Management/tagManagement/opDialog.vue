<template>
  <el-dialog
    title="编辑／新增"
    top="10vh"
    @open="handleOpen"
    :width="baseInfo.isMobile? '90%' : '50%'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标签名称">
        <el-input v-model="form.tagName"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>

      <el-form-item label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

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
        tagName: "",
        description: "",
        color: "#000000"
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    // 是否为编辑状态
    isEdit() {
      return !!this.defaultData;
    }
  },
  methods: {
    ...mapActions("content/tags", ["createTag", "updateTag"]),
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleOpen() {
      if (this.isEdit) {
        const { createdAt, updatedAt, ...others } = this.defaultData
        Object.assign(this.form, others);
      } else {
        // 如果是增加新标签 则初始化表单
        this.form = {
          tagName: "",
          description: "",
          color: "#000000",
        }
      }
    },
    onSubmit() {
      /**
       * 预处理：标签名空检查，Boolean值转换为数值
       */
      const { ...others } = this.form;
      if (!others.tagName) {
        this.$message.error({ message: "标签名不能为空" });
        return;
      }
      
      const f = this.isEdit ? this.updateTag : this.createTag;

      f(others)
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