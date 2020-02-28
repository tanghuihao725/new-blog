<template>
  <div class="loginer-container">
    <el-card class="login-card">
      <div class="tab-wrapper">
        <div :class="{ tab: true, active: tab === 0 }" @click="tab=0">Sign Up</div>
        <div :class="{ tab: true, active: tab === 1 }" @click="tab=1">Login</div>
      </div>
      <div class="form-wrapper">
        <form class="form" v-if="tab===0">
          <div class="form-item">
            <span>Telephone Number:</span>
            <input v-model="registerForm.telephone" type="number" autocomplete="off" autofocus/>
          </div>
          <div class="form-item">
            <span>Password:</span>
            <input v-model="registerForm.password" type="password" autocomplete="off" />
          </div>
          <div class="form-item">
            <span>Repeat Password:</span>
            <input
              v-model="registerForm.repeatPassword"
              type="password"
              autocomplete="off"
              @keydown.enter="handleSignUp"
            />
          </div>
          <div class="form-item">
            <LoginButton style="marginTop: 20px;" @click="handleSignUp">Sign Up</LoginButton>
          </div>
        </form>

        <form v-else>
          <div class="form-item">
            <span>Telephone Number:</span>
            <input v-model="loginForm.telephone" type="number" autofocus/>
          </div>
          <div class="form-item">
            <span>Password:</span>
            <input v-model="loginForm.password" type="password" @keydown.enter="handleLogin" />
          </div>
          <div class="form-item">
            <LoginButton style="marginTop: 20px;" @click="handleLogin">Login</LoginButton>
          </div>
        </form>
      </div>
    </el-card>
  </div>
</template>

<script>
import LoginButton from "@/components/Buttons/LoginButton.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        telephone: "",
        password: ""
      },
      registerForm: {
        telephone: "",
        password: "",
        repeatPassword: ""
      },
      tab: 0
    };
  },
  methods: {
    ...mapActions("user/userManagement", ["login", "register"]),
    ...mapMutations("user", ["setUserCurrent"]),
    handleSignUp() {
      const { telephone, password, repeatPassword } = this.registerForm;
      const result = this.formValidTest(telephone, password, repeatPassword);
      if (!result.success) {
        // 不合法
        this.$notify.error({ title: "Waring", message: result.message });
      } else {
        this.register({ data: { telephone, password } })
          .then(res => {
            this.handleLogin(telephone, password);
          })
          .catch(e =>
            this.$notify.error({
              title: "Failed",
              message: `${e.response.data.msg}`
            })
          );
      }
    },
    handleLogin(tel, pass) {
      let telephone = tel,
        password = pass;
      // 如果注册后调用，直接通过传参形式登陆
      // 如果登陆调用，则从loginForm中获取登陆信息
      if (!telephone || !password) {
        telephone = this.loginForm.telephone;
        password = this.loginForm.password;
      }
      // 检验表单是否合法
      const result = this.formValidTest(telephone, password);
      if (!result.success) {
        // 不合法
        this.$notify.error({ title: "Waring", message: result.message });
      } else {
        // 发布表单
        this.login({ data: { telephone, password } })
          .then(res => {
            const user = res.data.data; //用户信息
            localStorage.blogToken = res.data.token;
            this.setUserCurrent(user);
            // this.$notify.success({
            //   title: "Success",
            //   message: `Welcome back, ${user.nickname || user.telephone}`
            // });
            this.$router.push("/");
          })
          .catch(err => {
            this.$notify.error({
              title: "Waring",
              message: err.response.data.msg
            });
          });
      }
    },
    formValidTest(phone, password, repeatPassword) {
      const reg = /^1\d{10}$/;
      if (!reg.test(phone)) return { message: "Incoerrct Phone Number" };
      if (!password) return { message: "Empty Password" };
      if (repeatPassword !== undefined && repeatPassword !== password)
        return { message: "Two passwords are not match" };
      return { success: true };
    }
  },
  components: {
    LoginButton
  }
};
</script>


<style lang="less">
@base-theme: #f40;

.loginer-container {
  box-sizing: border-box;
  .login-card {
    .tab-wrapper {
      display: flex;

      .tab {
        width: 50%;
        height: 50px;
        text-align: center;
        background-color: #999;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        cursor: pointer;
      }

      .active {
        background-color: #fff;
        color: @base-theme;
      }
    }

    .form-wrapper {
      display: flex;
      flex-direction: column;
      padding: 10px 0;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      margin: 15px 0;

      span {
        font-size: 1rem;
        color: #aaa;
        margin-bottom: 10px;
      }

      input {
        outline: none;
        font-size: 1rem;
        line-height: 2rem;
        height: 2.5rem;
        padding: 0 8px;
        border-radius: 5px;
        border: 2px solid #aaa;
        transition: border 0.5s;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      input:focus {
        border: 2px solid #f40;
      }
    }
  }
  .el-card {
    border: none;
    border-radius: 10px;
  }
  .el-card__body {
    padding: 0 0 10px 0;
    border-radius: 4px;
  }
}
</style>