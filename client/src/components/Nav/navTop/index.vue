<template>
  <div class="nav-outer-wrapper">
    <!-- 导航横条部分 -->
    <div class="nav-container" :style="{
        backgroundColor: logoHide ? '' : 'orange'
    }">
      <div class="logo-text">
        <logoText v-if="!logoHide" />
        <div class="new-login-entrance">
          <userStatus v-if="!logoHide" />
        </div>
      </div>
      <div class="nav-items" v-if="!isMobile">
        <navItems class="animated fadeInDown delay-1s" />
      </div>
      <div class="mobile-nav animated fadeIn" v-else>
        <span :class="{menuButton:true, buttonActive:active}" @click="handleMobileButtonClick">
          <i class="el-icon-menu"></i>
        </span>
      </div>
    </div>

    <!-- 下滑菜单 -->
    <div
      :class="{tabMenuContents: true, active }"
      v-if="isMobile"
      :style="`backgroundColor: ${logoHide ? '' : '#ac4143'}`"
    >
      <div
        class="tab-item"
        v-for="item in navItemsInNav"
        :key="item.id"
        @click="routerTo(item.router)"
      >
        <i :class="item.icon"></i>
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
import logoText from "@/components/LogoText";
import userStatus from "@/views/components/userStatus.vue";
import navItems from "./navItems.vue";
import { mapGetters } from "vuex";
import navItemsList from "../navItems.js";

export default {
  props: {
    logoHide: {
      default: false
    },
    nowAt: {
      // 现在所在的navId
      default: 1
    }
  },
  data() {
    return {
      active: false
    };
  },
  computed: {
    ...mapGetters(["isMobile"]),
    ...mapGetters("user", ["isLogin", "userCurrent"]),
    navItemsInNav() {
      return navItemsList.filter(navItem => {
        // 已经在首页就隐藏首页
        if (navItem.id === this.nowAt) return false;
        // 如果已登陆 隐藏登陆入口
        if (this.isLogin && navItem.id === 5) return false;
        if (this.isLogin) {
          return this.userCurrent.authority >= navItem.authority;
        }
        return navItem.authority <= 1;
      });
    }
  },
  methods: {
    routerTo(path) {
      this.active = false;
      this.$router.push(path);
    },
    handleMobileButtonClick() {
      this.active = !this.active;
    }
  },
  components: {
    logoText,
    userStatus,
    navItems
  }
};
</script>

<style lang="less" scoped>
.nav-outer-wrapper {
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 95px;

    .logo-text {
      margin-left: 3%;
      display: flex;
      align-items: flex-end;

      .new-login-entrance {
        margin-left: 15px;
      }
    }
    .user-status {
      margin-right: 3%;
    }
  }
}

.rootMobile {
  .nav-outer-wrapper {
    .nav-container {
      height: 4em;

      .menuButton {
        padding: 0.3em;
        color: #fff;
        font-size: 1.8em;
      }
      .buttonActive {
        color: #ac4143;
      }
    }
    .tabMenuContents {
      display: none;
      z-index: -10;
      .tab-item {
        height: 4em;
        line-height: 4em;
        padding: 0 2em;
        // background-color: #ac4143;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        color: #fff;
        i {
          margin-right: 2em;
        }
      }
    }
    .active {
      display: block;
    }
  }
}
</style>