<template>
  <div class="nav-items-wrapper">
    <router-link
      :class="itemClasses(item.id)"
      v-for="item in commonItems"
      :key="item.id"
      :to="item.router"
    >
      <span>{{item.title}}</span>
    </router-link>

    <router-link
      :class="itemClasses(item.id)"
      v-for="item in authItems"
      :key="item.id"
      :to="item.router"
    >
      <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<script>
import navItemsList from "../navItems.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["userCurrent", "isLogin"]),
    commonItems() {
      if (this.isLogin) {
        return navItemsList.filter(
          item => item.authority === 1 && item.id !== 5
        );
      }
      return navItemsList.filter(item => item.authority === 1);
    },
    authItems() {
      if (!this.isLogin || this.userCurrent.authority === 1) {
        return [];
      } else {
        return navItemsList.filter(item => item.authority > 1);
      }
    },
    // 获取到现在所在到tab页到id
    activeId() {
      const nowPath = this.$route.path
      if(nowPath === '/') return 1
      let id;
      navItemsList.forEach(navItem => {
        if (nowPath.indexOf(navItem.router) >= 0) {
          id = navItem.id;
        }
      })
      return id || 1;
    }
  },
  methods: {
    itemClasses(id) {
      return {
        items: true,
        active: this.activeId === id
      };
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.nav-items-wrapper {
  box-sizing: border-box;
  display: flex;
  a {
    text-decoration: none;
    color: #666;
    font-size: 0.8rem;
  }

  .items {
    display: inline-block;
    font-size: 1.2rem;
    line-height: 2rem;
    height: 2rem;
    font-weight: lighter;
    padding: 5px 13px;
    cursor: pointer;
    margin: 0 15px;
    border: 1px solid rgba(0, 0, 0, 0);
    color: #fff;
    transition: all 0.5s;
  }
  .items:hover,
  .active {
    border: 1px solid #fff;
    border-radius: 4px;
  }
}
</style>