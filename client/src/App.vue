<template>
  <div id="app">
    <nav>
      <navbar id="mynav" v-show="true" v-if="!routeLogin" />
    </nav>

    <router-view />

    <footer>
      <MyFooter/>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import navbar from "@/components/Nav";
import MyFooter from "@/components/MyFooter"

export default {
  data() {
    return {
      animationShow: false
    };
  },
  mounted() {
    // 根据localStorage的值获取用户信息
    this.initCurrent();
    // 开始入场动画
    this.animationShow = true;
  },
  computed: {
    ...mapGetters("user", ["getUserDialogStatu"]),
    routeLogin() {
      return this.$route.path.indexOf("login") >= 0;
    }
  },
  methods: {
    ...mapMutations("user", ["setUserDialog"]),
    ...mapActions("user", ["initCurrent"])
  },
  components: {
    navbar, MyFooter
  }
};
</script>


<style lang="less">

</style>


<style lang="less">
// 全局样式

html{
  height: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
}
footer{
  margin: 0;
}
body {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  overflow-x: hidden;
  height: 100%;
}
</style>



