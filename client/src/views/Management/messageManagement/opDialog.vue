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
      <el-form-item label="留言内容">
        <el-input v-model="form.body" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="用户昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="form.contact"></el-input>
      </el-form-item>

      <el-form-item label="时间">
        <el-input v-model="form.createdAt"></el-input>
      </el-form-item>

      <el-form-item label="控制">
        <el-switch v-model="form.hide" active-color="#13ce66" inactive-color="#666"></el-switch>
        <span style="margin:0 5px">私密</span>
        <el-switch v-model="form.picked" active-color="#13ce66" inactive-color="#666"></el-switch>
        <span style="margin:0 5px">精选</span>
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
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  props: {
    dialogVisible: {
      default: false
    },
    // 数据进来
    defaultData: {
      default: null
    }
  },
  data() {
    return {
      form: {
        id: 0,
        nickname: "",
        body: "",
        contact: "",
        hide: 0,
        picked: 0,
        createdAt: "",
        orderFactor: 50
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"])
  },
  methods: {
    ...mapActions("content/messages", ["updateMessage"]),
    handleClose() {
      this.$emit("update:dialogVisible", false);
    },
    handleOpen() {
      const { updatedAt, fromType, blogId,...others } = this.defaultData;
      others.picked = Boolean(others.picked)
      others.hide = Boolean(others.hide)
      Object.assign(this.form, others);
    },
    onSubmit() {
      /**
       * 预处理：标签名空检查，Boolean值转换为数值
       */
      const { ...others } = this.form;
      if (!others.body) {
        this.$message.error({ message: "留言不能为空" });
        return;
      }
      others.hide = Number(others.hide)
      others.picked = Number(others.picked)
      this.updateMessage(others)
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