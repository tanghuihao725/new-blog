<template>
  <div class="logo-text-container" @click="handleClick">
    <div class="logo">
      <img class="logo-img" src="../assets/logo.png" />
    </div>
    <div class="text" v-if="!isMobile">
      <!-- 入场动画 -->
      <span class="up-line animated fadeInRight" v-show="itemShow"></span>
      <span class="text-content animated tada delay-1s">THH's BLOG</span>
      <!-- 入场动画 -->
      <span class="bottom-line animated fadeInLeft" v-show="itemShow"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      itemShow: false
    }
  },
  computed:{
      ...mapGetters(['isMobile'])
  },
  mounted() {
    this.itemShow = true;
  },
  methods: {
    handleClick() {
      if(this.$route.path != '/')
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
@baseColor: #000;

.logo-text-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: @baseColor;

  .logo {
    width: 40px;
    height: 35px;
    .logo-img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    height: 2em;
    justify-content: space-between;
    font-size: 1.1rem;

    .up-line,
    .bottom-line {
      width: 6.4rem;
      border-top: 2px solid @baseColor;
    }
    .text-content {
      cursor: pointer;
    }
  }
}
</style>