<template>
  <div class="home">
    <!-- {{resumeShow}} -->
    <div class="blogs-and-resume-wrapper">
      <div class="outer-blog-wrapper">
        <Blogs :resumeOpen="resumeShow"/>
      </div>
      
      <div class="resume-wrapper" v-show="!isMobile">
        <Resume :visible.sync="resumeShow"/>
      </div>
      
    </div>
  </div>
</template>

<script>
import Resume from "@/components/Resume";
import Blogs from "./Blogs/index.vue"
import { mapGetters } from 'vuex';
import scorllListener from './scrollListener'

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
    isMobile(){
      return this.baseInfo.isMobile
    }
  },
  mounted(){
    scorllListener()
  },
  methods:{
   
  },
  components: {
    Resume, Blogs
  }
};
</script>

<style lang="less" scoped>
.home{
  .blogs-and-resume-wrapper{
    display: flex;
    width: 100%;

    .outer-blog-wrapper{
       width: 100%;
       display: flex;
       margin: 0 auto;
       justify-content: center;
    }
  }
}
</style>
