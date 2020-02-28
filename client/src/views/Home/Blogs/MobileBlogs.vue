<template>
  <div class="mobile-blogs-itemList-wrapper">
    <div class="blog-item-list animated fadeInRight" v-for="blog in blogs" :key="blog.id">
      <div class="blog-content">
        <div class="content-text">
          <h1 class="blog-title" @click="routerTo(blog)">
            {{blog.title}}
            <span v-if="blog.orderFactor <= 10" style="fontSize:0.8em;color:red;">top!</span>
          </h1>
          <p class="blog-body">{{blogBodyParse(blog)}}</p>
        </div>
        <img class="cover-image" v-if="blog.coverImage" :src="blog.coverImage" />
      </div>
      <span class="blog-foot">
        <span>
          <span class="label-wrapper">
            <Album :albumData="albumData(blog)" size="mini"/>
          </span>
          <span class="date">{{dateParse(blog.createdAt)}}</span>
        </span>
        <ReadMoreButton @click="routerTo(blog)">More</ReadMoreButton>
      </span>
      <p class="division-line"></p>
    </div>

    <router-link class="all-articals" to="/blogs">View All</router-link>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton";
import Album from "@/components/Album";
import Tag from "@/components/Tags/Tag";

export default {
  computed: {
    ...mapGetters("content/blogs", ["blogs"])
  },
  methods: {
    ...mapActions("content/blogs", ["fetchBlogs"]),
    refreshBlogs() {
      return this.fetchBlogs({ type: 0, pageNum: 1, pageSize: 5 });
    },
    blogBodyParse(blog) {
      let content = blog.description || blog.body;
      return content ? content.substring(0, 40) : "没有内容";
    },
    dateParse(time) {
      const showTimeArr = time.split(" ")[0].split("-");
      return `${showTimeArr[1]}/${showTimeArr[2]}`;
    },
    albumData(blog) {
      const { albumName, color, icon, notPush, hide } = blog;
      return { albumName, color, icon, notPush, hide };
    },
    routerTo(blog){
        this.$router.push({
            path: '/blog',
            query: { id: blog.id }
        })
    }
  },
  mounted() {
    this.refreshBlogs();
  },
  components: {
    ReadMoreButton,
    Album,
    Tag
  }
};
</script>


<style lang="less" scoped>
.mobile-blogs-itemList-wrapper {
  width: 100%;
  
  .blog-item-list {
    padding: 1em 1em;
    .blog-content {
      display: flex;
      align-items: center;
      .content-text {
        width: 60%;
        .blog-title {
          font-size: 1.1em;
          margin: 0;
        }
        .blog-body {
          font-size: 0.8em;
          color: #666;
        }
      }
      .cover-image {
        width: 30%;
        margin: 0 2%;
        height: 100%;
      }
    }

    .blog-foot {
      font-size: 0.7em;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: #666;
      .date{
          margin-left: 1em;
      }
    }
    .division-line{
        width: 90%;
        display: block;
        text-align: center;
        margin: 2em auto;
        // border: 0.5px solid rgba(255 , 255, 255, 0.7);
        border-top: 1px solid #999;
    }
  }
  .all-articals{
      display: block;
      text-align: center;
      color: #f20;
      text-decoration: underline;
  }
}
</style>