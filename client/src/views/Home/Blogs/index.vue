<template>
  <div class="blogs-container">
    <div class="blogs-wrapper">
      <div class="blogs-with-cover-img">
        <el-carousel
          indicator-position="outside"
          height="710px"
          :autoplay="false"
          :arrow="arrowAppear"
        >
          <el-carousel-item v-for="blog in blogsWithCoverImage" :key="blog.id">
            <BlogCard :blogContent="blog" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div
        class="blogs-without-cover-img animated"
        :style="{ width: resumeOpen ? '' : '260px', transform: resumeOpen ? '' : 'translateX(-10%)'}"
      >
        <BlogCard
          class="blog-card animated hide animate1"
          v-for="blog in blogsWithoutCoverImage"
          :key="blog.id"
          :blogContent="blog"
        />

        <div class="read-all-button hide animated animate1">
          <ReadMoreButton>All Blogs ...</ReadMoreButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogCard from "./BlogCard";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton";

export default {
  props: {
    resumeOpen: {
      default: true
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 20
    };
  },
  computed: {
    ...mapGetters("content/blogs", ["blogs"]),
    blogsWithCoverImage() {
      // 三条图文博客
      return this.blogs.filter(blog => !!blog.coverImage).slice(0, 3);
    },
    blogsWithoutCoverImage() {
      // 三条不带图文博客
      return this.blogs.filter(blog => !blog.coverImage).slice(0, 3);
    },
    // 轮播图的肩头显示与否
    arrowAppear() {
      return this.resumeOpen ? "hover" : "never";
    }
  },
  mounted() {
    this.refreshBlogs().then(() => {

    });
  },
  watch:{
    resumeOpen(val){
      if(val === false){
        document.querySelectorAll('.animate1').forEach(item => {
          item.classList.remove("hide")
          item.classList.add("fadeInRight")
        })
      }
    }
  },
  methods: {
    ...mapActions("content/blogs", ["fetchBlogs"]),
    refreshBlogs() {
      const { pageNum, pageSize } = this;
      return this.fetchBlogs({ type: 0, pageNum, pageSize });
    }
  },
  
  components: {
    BlogCard,
    ReadMoreButton
  }
};
</script>

<style lang="less">
.blogs-container {
  transition: all 3s;
  margin-bottom: 600px;
}

.blogs-wrapper {
  padding: 20px 30px;
  transition: all 3s;
  // width: 100%;
  // 设置响应式字体
  font-size: 16px;
  max-width: 1600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .blogs-with-cover-img {
    width: 1000px;

    .el-carousel__arrow {
      height: 70px;
      width: 70px;
      color: #fa4b2a;
      background-color: transparent;
      font-size: 70px;
      line-height: 70px;
      font-weight: 1000;
      // display: none;
    }
    .el-carousel__indicators--outside button {
      background-color: #fa4b2a;
    }
    .el-carousel__button {
      width: 15px;
      height: 15px;
      margin: 0 30px;
      background-color: #fa4b2a;
    }
    .el-carousel__indicators--outside {
      margin: 30px 0;
    }
  }
  .blogs-without-cover-img {
    display: flex;
    flex-wrap: wrap;
    max-width: 780px;
    justify-content: flex-end;

    .hide {
      display: none;
    }
    .blog-card:nth-child(2) {
      animation-delay: 0.2s;
    }
    .blog-card:nth-child(3) {
      animation-delay: 0.3s;
    }

    .read-all-button {
      font-size: 12px;
      animation-delay: 1s;
    }
  }
}
</style>