<template>
  <div :class="{
    navLeftContainer: true
  }">
    <div class="top-nav">
      <span
        class="nav-item"
        v-for="item in topNavItems"
        :key="item.id"
        @click="handleNavClick(item.router)"
      >
        <el-tooltip
          class="item"
          effect="light"
          :content="item.title"
          placement="bottom"
          v-if="!isMobile"
        >
          <i :class="item.icon"></i>
        </el-tooltip>
        <span v-else>
          <i :class="item.icon"></i>
        </span>
      </span>
    </div>
    <div class="nav-body" v-if="getDetails.blogPage">
      <h1>{{navData.title || 'THHsBlog'}}</h1>
      <h2>{{navData.description || getDetails.blogPage.description}}</h2>
      <div class="nav-content-wrapper">
        <slot />
      </div>
    </div>

    <div class="nav-foot" v-if="!isMobile && getDetails.beian">
      <ReadMoreButton style="padding:2em 2em" @click="routeToHome">
        <i class="el-icon-back"></i>
        HOME PAGE
      </ReadMoreButton>
      <p>{{getDetails.beian.content}}</p>
    </div>
  </div>
</template>


<script>
import navItems from "../navItems.js";
import { mapGetters, mapActions } from "vuex";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton"

export default {
  props:{
    navData:{
      default: ()=>({
        title: 'THHsBlog',
        description: '',
        icon: ''
      })
    }
  },
  computed: {
    ...mapGetters(["isMobile"]),
    ...mapGetters("user", ["userCurrent", "isLogin"]),
    ...mapGetters("user/userManagement", ["getDetails"]),
    topNavItems() {
      return navItems.filter(navItem => {
        if(navItem.id===2) return false
        if (this.isLogin && this.userCurrent) {
          // 过滤菜单项
          return (this.userCurrent.authority >= navItem.authority) && navItem.id!==5;
        }
        return navItem.authority <= 1;
      });
    }
  },
  beforeMount() {
    this.fetchManagerDetails()
  },
  methods: {
    ...mapActions("user/userManagement", ["fetchManagerDetails"]),
    handleNavClick(router) {
      this.$router.push(router);
    },
    routeToHome(){
      this.$router.push('/')
    }
  },
  components:{
    ReadMoreButton
  }
};
</script>

<style lang="less" scoped>
.navLeftContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .nav-item {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    text-align: center;
    color: #fff;
    border: 0.1em solid #fff;
    line-height: 1.3em;
    border-radius: 50%;
    margin: 1em 0.5em;
    cursor: pointer;
  }
  .nav-body {
    display: flex;
    color: #fff;
    flex-direction: column;
    justify-content: flex-end;
    height: 70%;
    padding: 0 2em;
    font-family: "Abril Fatface", serif;
    // border: 1px solid green;
    h1 {
      font-size: 4em;
      color: #f20;
      font-weight: 900;
      margin: 0.3em 0;
    }
    h2 {
      // margin: 0 0 3em 0;
      font-weight: 100;
      opacity: 0.7;
    }
    .nav-content-wrapper {
      width: 100%;
      // border: 1px solid red;
    }
  }
  .nav-foot {
    font-size: 0.6em;
    text-align: center;
    color: #666;
  }
}
</style>

<style lang="less" scoped>
.rootPc {
  .navLeftContainer {
    font-size: 1vw;
    min-width: 27%;
    max-width: 27%;
    height: 100vh;
    width: 100%;
    height: 100vh;
    background-color: orange;
    position: fixed;
    .nav-body{
      align-items: flex-start;
    }
  }
  .nav-item:hover {
    color: #ac4142;
    border-color: #ac4142;
  }
}
</style>

<style lang="less" scoped>
.rootMobile {
  .navLeftContainer {
    font-size: 3vw;
    width: 100%;
    height: 18vh;
    background-color: orange;
    
  }
  .nav-body {
    align-items: center;
    h1{
      font-size: 2em;
    }
    h2{
      font-size: 1.2em;
    }
    h1,h2{
      margin: 0;
      padding:0
    }
  }
}
</style>