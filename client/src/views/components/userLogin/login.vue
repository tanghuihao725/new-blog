<template>
<!-- 登陆表单 -->
  <div :class="loginWrapperClass">
    <h1>登陆 Login</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
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
          show-password
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
import mixin from './mixin'

export default {
  /**
   * 混入方法 封装了注册和登陆都会用到的 login
   */
  mixins:[mixin],
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
    /**
     * 触发登陆
     */
    handleLogin(formName) {
      // 合法性验证
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        this.mixinLogin(this.ruleForm).then(()=>this.$emit('closeDialog'))
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


