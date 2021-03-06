<template>
  <!-- 用户编辑的弹窗 -->
  <el-dialog
    title="用户信息"
    :visible.sync="visible"
    @open="handleOpen"
    :before-close="handleClose"
    top="10vh"
    :width="baseInfo.isMobile? '90%' : '50%'"
  >
    <div class="avarar-wrapper">
      <el-upload
        class="avatar-uploader"
        :action="`${baseUrl}/upload/img/`"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
      >
        <img v-if="getAvatar" :src="getAvatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <div class="form-container">
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-width="isMobile?'0px':'100px'"
        :label-position="baseInfo.isMobile?'none':'left'"
      >
        <el-form-item :label="getLabel('手机号')" prop="name">
          <el-input v-model="ruleForm.telephone" disabled></el-input>
        </el-form-item>

        <el-form-item :label="getLabel('密码')" prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码:不填默认不修改"></el-input>
        </el-form-item>

        <el-form-item :label="getLabel('昵称')" prop="nickname">
          <el-input v-model="ruleForm.nickname" placeholder="昵称"></el-input>
        </el-form-item>

        <el-form-item :label="getLabel('邮箱')" prop="email">
          <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
        </el-form-item>

        <!-- 性别勾选器 -->
        <el-form-item>
          <el-radio v-model="ruleForm.sex" :label="1" border>
            <i class="el-icon-male" style="color:skyblue;font-size:1.2em"></i>
          </el-radio>
          <el-radio v-model="ruleForm.sex" :label="0" border>
            <i class="el-icon-female" style="color:pink;font-size:1.2em"></i>
          </el-radio>
        </el-form-item>

        <el-form-item label="权限操作" prop="auth" v-if="from==='manage'">
          <el-select v-model="ruleForm.authority">
            <el-option label="超级管理员 6" :value="6"></el-option>
            <el-option label="管理员 5" :value="5"></el-option>
            <el-option label="普通用户 1" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="text-align:center">
          <el-button type="success" @click="submitForm" style="padding:12px 60px;">修改</el-button>
          <el-button type="danger" @click="handleClose" style="padding:12px 60px;">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { avatarDefault } from "../../utils/common/user";
import config from "@/myconfig";

export default {
  data() {
    return {
      // 表单信息
      ruleForm: {
        telephone: "",
        password: "",
        email: "",
        nickname: "",
        authority: 1,
        avator: "",
        sex: ""
      },
      rules: {
        email: []
      },
      avatarUrl: ""
    };
  },
  props: {
    from: {
      // manage || selfEditor
      type: String,
      default: "selfEditor"
    },
    defaultData: {
      /**
       *  Object 显示默认的数据
       */
      type: Object,
      default: () => {}
    },
    visible: {
      /**
       * dialog显示状态
       */
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    baseUrl() {
      return config.baseUrl;
    },
    isMobile() {
      return this.baseInfo.isMobile;
    },
    /**
     * 用户是否有头像，如果没有传入默认头像，返回值默认头像的静态地址
     */
    getAvatar() {
      if (this.ruleForm.avator.length) return this.ruleForm.avator;
      return avatarDefault(this.ruleForm.sex);
    }
  },
  methods: {
    ...mapActions("user", ["initCurrent"]),
    ...mapActions("user/userManagement", ["updateUser"]),
    getLabel(label) {
      if (this.isMobile) return "";
      return label;
    },
    /**
     * 提交表单
     */
    submitForm() {
      this.updateUser({
        params: { id: this.defaultData.id },
        data: this.ruleForm
      })
        .then(res => {
          this.$message.success({ message: "更新成功" });
          // 触发更新事件 在用户管理系统提醒刷新all users
          this.$emit("update");
          // 关闭dialog
          this.$emit("update:visible", false);
          // 根据token重新更新用户状态
          this.initCurrent();
        })
        .catch(err => this.$message.error({ message: err.msg || err }));
    },
    handleAvatarSuccess(res) {
      this.ruleForm.avator = res.url;
    },
    handleAvatarError(err) {
      this.$message.error({ message: err.msg || err });
    },
    /**
     * dialog打开触发事件
     */
    handleOpen() {
      const { createdAt, updatedAt, password, details, ...others } = this.defaultData;
      this.ruleForm = others;
    },
    /**
     * 关闭dialog
     */
    handleClose() {
      this.$emit("update:visible", false);
    }
  }
};
</script>


<style lang="less" scoped>
.form-container {
  padding: 0 50px;
  text-align: left;
}
.avatar-uploader{
  text-align: center;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<style lang="less">
.el-dialog {
    border: 3px solid black;
    border-radius: 0;
}
</style>

