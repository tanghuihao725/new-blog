<template>
  <div class="text-area-contianer">
    <textarea type="textarea" v-model="form.body" placeholder="对网站有什么建议或者有什么想和我说的，给我留个言吧... :)"></textarea>
    <div class="button-group">
      <input class="nick-name" type="text" v-model="form.nickname" placeholder="您的称呼" />
      <input
        class="contact-me"
        type="text"
        v-model="form.contact"
        placeholder="如果您想留下联系方式"
        @keydown.enter="handleSubmit"
      />

      <div class="switch-wrapper">
        <el-switch v-model="form.hide" active-color="#f20" inactive-color="#666"></el-switch>
        <span class="tip">私密</span>
      </div>
      <div class="send-button">
        <LoginButton @click="handleSubmit">SEND</LoginButton>
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from "@/components/Buttons/LoginButton";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        body: "",
        nickname: "",
        contact: "",
        hide: false
      }
    };
  },
  computed: {
    ...mapGetters("user", ["userCurrent", "isLogin"])
  },
  mounted() {
    if (this.isLogin) {
      this.form.nickname = this.userCurrent.nickname;
    } else {
      if (localStorage.tempNickname)
        this.form.nickname = localStorage.tempNickname;
      if (localStorage.tempContact)
        this.form.contact = localStorage.tempContact;
    }
  },
  methods: {
    ...mapActions("content/messages", ["createMessage"]),
    formClear() {
      Object.assign(this.form, {
        body: "",
        hide: false
      });
    },
    handleSubmit() {
      const { ...data } = this.form;
      if (!data.body) return;
      // 缓存数据
      if (!this.isLogin) {
        if (this.form.nickname)
          localStorage.tempNickname = this.form.nickname;
        if (this.form.contact)
          localStorage.tempContact = this.form.contact;
      }
      data.hide = Boolean(data.hide);
      this.createMessage(data)
        .then(() => {
          this.formClear();
          this.$emit("success");
        })
        .catch(err => {
          this.$message.error({ message: err.msg || err });
        });
    }
  },
  components: {
    LoginButton
  }
};
</script>

<style lang="less" scoped>
.text-area-contianer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //   justify-content: space-around;
  align-items: center;
  color: #666;
  box-sizing: border-box;

  input,
  textarea {
    outline: none;
    border-radius: 5px;
    border: 0.125em solid #aaa;
    transition: border 0.5s;
    color: #666;
    font-weight: 200;
  }
  input {
    padding: 0 0.5em;
    font-size: 1em;
    line-height: 1.5em;
    height: 2.5em;
  }
  textarea {
    padding: 5px 1em;
    width: 80%;
    resize: none;
    line-height: 1.5em;
    height: 170px;
    font-size: 1.1em;
    margin-bottom: 20px;
  }

  input:focus,
  textarea:focus {
    border: 0.125em solid #f40;
  }

  .button-group {
    width: 86%;
    height: 50px;
    display: flex;
    justify-content: space-between;

    .nick-name {
      width: 7em;
    }
    .contact-me {
      width: 12em;
    }
    .switch-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      .tip {
        font-size: 0.8em;
        margin: 0 2px;
      }
    }
    .send-button {
      height: 80%;
    }
  }
}
</style>