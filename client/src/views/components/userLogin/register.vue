<template>
  <!-- 注册表单 -->
  <div :class="registerWrapperClass">
    <h1>注册</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" placeholder="telephone number" clearable></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="password"
          @keydown.native.enter="handleRegister('ruleForm')"
          clearable
        ></el-input>
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

      <el-form-item>
        <p style="color:#bbb;font-size:0.8em;margin-left:0em;">- 注册完成后可在个人信息处维护头像,邮箱等信息</p>
      </el-form-item>

      <el-form-item>
        <el-button type="success" style="width:100%;" @click="handleRegister('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import constant from "../../../utils/constant";
import mixin from "./mixin";

export default {
  mixins: [mixin],
  data() {
    return {
      ruleForm: {
        telephone: "",
        password: "",
        sex: 1
      },
      rules: {
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
          { min: 3, max: 20, message: "密码必须在3-20位之间", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["baseInfo"]),
    registerWrapperClass() {
      return {
        registerWrapper: true,
        mobile: this.baseInfo.isMobile,
        pc: !this.baseInfo.isMobile
      };
    }
  },
  methods: {
    ...mapActions("user/userManagement", ["register"]),
    /**
     * 触发注册
     *  */
    handleRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        this.register({ data: this.ruleForm })
          .then(res => {
            // 注册成功后 弹窗恭喜注册成功
            this.$notify.success({
              title: "注册成功",
              message: `非常感谢加入THHSBLOG`,
              duration: 2000
            });
            // 自动登陆 调用mixin中的登陆接口 登陆成功后触发关闭Dialog
            this.mixinLogin({
                telephone: this.ruleForm.telephone,
                password: this.ruleForm.password
            }).then(()=>this.$emit('closeDialog'))
          })
          .catch(e =>
            this.$notify.error({
              title: "注册失败",
              message: `原因${e.response.data.msg}`
            })
          );
      });
    }
  }
};
</script>

<style lang="less" scoped>
.registerWrapper {
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


