<template>
  <div :class="loginWrapperClass">
    <h1>登陆 Login</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      hide-required-asterisk
    >
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" placeholder="telephone number" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="password"
          @keydown.native.enter="handleLogin('ruleForm')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width:100%;" @click="handleLogin('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import constant from '../../../utils/constant'

export default {
  data() {
    return {
      ruleForm: {
        telephone: "",
        password: ""
      },
      rules: {
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    loginWrapperClass() {
      return {
        loginWrapper: true,
        mobile: this.baseInfo.isMobile,
        pc: !this.baseInfo.isMobile
      };
    }
  },
  methods: {
    ...mapActions("user/userManagement", ["login"]),
    ...mapMutations("user", ["setUserDialog", "setUserCurrent"]),
    handleLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        this.ruleForm.uploadConfig = constant.uploadConfig
        this.login({ data: this.ruleForm })
          .then(res => {
            const user = res.data.data;
            localStorage.blogToken = res.data.token;
            localStorage.uploadToken = res.data.uploadToken;
            this.setUserDialog(false);
            this.setUserCurrent(user);
            this.$notify.success({
              title: "登陆成功",
              message: `欢迎回来,${user.nickname || user.telephone}`
            });
          })
          .catch(err =>
            this.$notify.error({
              title: "登录失败",
              message: `原因:${err.response.data.msg}`
            })
          );
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginWrapper {
  //   border: 1px solid yellow;
  margin: 0 auto;
}

.pc {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 30px;
}
.mobile {
}
</style>


