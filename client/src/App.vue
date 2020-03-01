<template>
  <div
    id="app"
    :class="{
    leftRight: navLeftShow,
    rootMobile: isMobile,
    rootPc: !isMobile
  }"
  >
    <nav>
      <navbar id="mynav" v-if="!navTopHide" :nowAt="nowAt"/>
    </nav>
    

    <div class="router-content">
      <router-view class="content" />
    </div>

    <footer v-if="!navLeftShow">
      <MyFooter />
    </footer>

  
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import navbar from "@/components/Nav/navTop";
import navLeft from "@/components/Nav/navLeft/index.vue";
import MyFooter from "@/components/MyFooter";

export default {
  data() {
    return {
      animationShow: false
    };
  },
  mounted() {
    // 根据localStorage的值获取用户信息
    this.initCurrent();
    // 需要在手机端默认x轴禁止滚动，否则页面会左右移动
    if(this.isMobile){
      document.querySelector('html').style.overflowX = 'hidden'
    }
  },
  computed: {
    ...mapGetters(["isMobile"]),
    ...mapGetters("user", ["getUserDialogStatu"]),
    nowAt(){
      switch(this.$route.path){
        case '/':
          return 1
        case '/about':
          return 3
        default:
          return 1
      }
    },
    routeLogin() {
      return this.$route.path.indexOf("login") >= 0;
    },
    routeCategories() {
      return this.$route.path.indexOf("categories") >= 0;
    },
    routeBlogs() {
      return this.$route.path.indexOf("blog") >= 0;
    },
    routeAbout(){
      this.nowAt = 3
      return this.$route.path.indexOf("about") >= 0
    },
    navTopHide() {
      return this.routeLogin || this.routeCategories || this.routeBlogs;
    },
    navLeftShow() {
      return this.routeLogin || this.routeBlogs || this.routeCategories;
    }
  },
  methods: {
    ...mapMutations("user", ["setUserDialog"]),
    ...mapActions("user", ["initCurrent"])
  },
  components: {
    navbar,
    MyFooter
  }
};
</script>

<style lang="less">
// 全局样式

html {
  height: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
}
footer {
  margin: 0;
}
body {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
}
.fade{
  visibility: hidden;
}
</style>




