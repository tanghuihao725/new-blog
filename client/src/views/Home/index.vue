<template>
  <div class="home">
    <div class="blogs-and-resume-wrapper" v-if="!isMobile">
      <Blogs :resumeOpen="resumeShow"/>
      <div class="resume-wrapper">
        <Resume :visible.sync="resumeShow"/>
      </div>
    </div>
    <!-- 移动端博客页 -->
    <div class="mobile-blogs-wrapper" v-else>
      <MobileBlogs/>
    </div>

    <div class="albums-introduction-wrapper">
      <img :src="homePageDetails.picWallBg" class="album-introduction-bg">
      <div class="bg-mask"></div>
      <AlbumsShow :psData="homePageDetails"/>
    </div>

    <div class="categories-container">
      <Categories/>
    </div>

    <div class="message-pad-container">
      <MessagePad/>
    </div>
  </div>
</template>

<script>
import Resume from "@/components/Resume";
import Blogs from "./Blogs/index.vue"
import MobileBlogs from './Blogs/MobileBlogs'
import Categories from "./Categories/index.vue"
import AlbumsShow from "./AlbumsShow/index.vue"
import { mapGetters } from 'vuex';
import scorllListener from './scrollListener'
import MessagePad from './Message'


export default {
  name: "home",
  data(){
    return {
      val: "",
      resumeShow: true
    }
  },
  computed: {
    ...mapGetters(['baseInfo']),
    ...mapGetters('user/userManagement',['getDetails']),
    isMobile(){
      return this.baseInfo.isMobile
    },
    homePageDetails(){
      return this.getDetails.homePage || {}
    }
  },
  mounted(){
    scorllListener()
  },
  destroyed(){
    // 如果离开组件，那么将滚轮监听事件给取消
    window.onscroll = null
  },
  methods:{
   
  },
  components: {
    Resume, Blogs, MobileBlogs, AlbumsShow, Categories, MessagePad
  }
};
</script>

<style lang="less" scoped>
.home{
  background-color: #eee;
  .blogs-and-resume-wrapper{
    display: flex;
    width: 100%;
  }

  .albums-introduction-wrapper{
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    box-sizing: border-box;
    // margin-top: 80px;
    border-top: 80px solid #eee;
    // border-bottom: 20px solid rgba(0,0,0,0.7);
    height: 656px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .album-introduction-bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 0;
    }
    .bg-mask{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      z-index: 0;
    }
  }

  .categories-container,
  .message-pad-container {
    width: 100%;
    height: 680px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message-pad-container{
    background-color:orange;
  }
}
</style>

<style lang="less">
// Home 全局
.hide{
  visibility: hidden;
}
</style>
