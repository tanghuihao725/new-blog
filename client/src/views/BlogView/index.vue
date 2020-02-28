<template>
  <div class="blog-nav-view-container">
    <nav v-if="!isMobile">
      <navLeft :navData="navData">
        <div class="label-wrapper">
          <Album :albumData="albumData" size="small" />
          <Tag v-for="tag in blogContent.tagDetails" :key="tag.id" :tagData="tag" size="small" />
        </div>
        <p class="blog-time">
          <span class="created-at">发布于: {{ createdTime }}</span>
          <span v-if="updatedTime">于{{ updatedTime }} 编辑</span>
        </p>
        <div class="tab-bar">
          <h3
            class="tabItem"
            @click="routerTo(`/blogs?albumId=${blogContent.album}`)"
          >更多{{blogContent.albumName}}分类</h3>
          <h3 class="tabItem" @click="routerTo('/blogs')">All Artials</h3>
          <h3 class="tabItem" @click="routerTo('/categories')">Categories</h3>
        </div>
      </navLeft>
    </nav>
    <div class="blog-view-container">
      <div class="content-container">
        <ReadMoreButton v-if="isMobile" @click="handleGoBack" style="fontSize:0.8em;marginBottom:2em;">返回</ReadMoreButton>
        <div class="cover-image-wrapper" v-if="blogContent.coverImage">
          <img :src="blogContent.coverImage" class="cover-image" />
        </div>

        <div class="title-container" v-if="isMobile">
          <p class="blog-title">{{blogContent.title}}</p>
          <p class="blog-time">
            <span class="created-at">发布于: {{ createdTime }}</span>
            <span v-if="updatedTime">于{{ updatedTime }} 编辑</span>
          </p>
          <div class="label-wrapper">
            <Album :albumData="albumData" size="small" />
            <Tag v-for="tag in blogContent.tagDetails" :key="tag.id" :tagData="tag" size="small" />
          </div>
        </div>

        <div class="body-container">
          <mavon-editor
            class="mavon-wrapper"
            defaultOpen="preview"
            :value="blogContent.body || ''"
            :boxShadow="false"
            :toolbarsFlag="false"
            :subfield="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Album from "@/components/Album";
import Tag from "@/components/Tags/Tag";
import navLeft from "@/components/Nav/navLeft";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton";

export default {
  data() {
    return {
      blogContent: {}
    };
  },
  computed: {
    ...mapGetters(["isMobile"]),
    albumData() {
      const { albumName, color, icon, notPush, hide } = this.blogContent;
      return { albumName, color, icon, notPush, hide };
    },
    navData() {
      return {
        title: this.blogContent.title,
        description: this.blogContent.description
          ? this.blogContent.description.substring(0, 30)
          : " "
      };
    },
    createdTime() {
      return (
        this.blogContent.createdAt && this.blogContent.createdAt.split(" ")[0]
      );
    },
    updatedTime() {
      const updated =
        this.blogContent.updatedAt && this.blogContent.updatedAt.split(" ")[0];
      if (updated === this.createdTime) return false;
      return updated;
    }
  },
  methods: {
    ...mapActions("content/blogs", ["getSingleBlog"]),
    routerTo(path) {
      this.$router.push(path);
    },
    handleGoBack() {
      this.$router.back(-1);
    }
  },
  mounted() {
    if (!this.$route.query.id) {
      this.$router.push("/");
    }
    this.getSingleBlog({
      type: 4,
      id: this.$route.query.id
    })
      .then(res => {
        this.blogContent = res.data.data[0];
      })
      .catch(() => {
        this.$message.error({ message: "获取博客失败" });
      });
  },
  updated() {
    document.querySelectorAll("img").forEach(img => {
      img.style.maxWidth = "80%";
      img.style.maxHeight = "400px";
      if(!this.isMobile) img.style.margin = "1.5em 0 1.5em 5em";
    });
    document.querySelector(".v-show-content").style.backgroundColor = "#fff";
    document.querySelectorAll("p").forEach(p => {
      p.style.textIndent = "2em";
      p.style.fontSize = "1em";
    });
  },
  components: {
    Album,
    Tag,
    navLeft,
    ReadMoreButton
  }
};
</script>

<style lang="less" scoped>
.blog-nav-view-container {
  width: 100%;
  display: flex;
  font-size: 2em;
  flex-direction: column;
  .tabItem::before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0 1em;
    background-color: #fff;
  }
  .tabItem {
    font-size: 1.3em;
    font-weight: 100;
    cursor: pointer;
  }
  .tabItem:hover {
    color: #ac4143;
    .tabItem::before {
      background-color: #ac4143;
    }
  }
}

.blog-view-container {
  height: 100%;
  min-height: 80vh;
  background-color: rgb(255, 255, 255);

  .content-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 30px 1em;
    font-size: 16px;

    .cover-image-wrapper {
      text-align: center;
      .cover-image {
        width: 80%;
      }
    }

    .title-container {
      text-align: center;
      .blog-title {
        font-size: 2em;
      }
      .label-wrapper {
        font-size: 16px;
      }
    }

    .v-note-wrapper {
      border: none;
    }
  }
}
.body-container {
  p {
    text-indent: 2em;
  }
}
.markdown-body img {
  max-width: 30% !important;
  box-sizing: content-box;
  background-color: rgb(255, 255, 255);
}

.blog-time {
  color: #666;
  font-size: 1em;
  .created-at {
    margin-right: 1em;
  }
}
</style>

<style lang="less">
.rootPc {
  .blog-view-container {
    margin-left: 27%;
    width: 60%;
    max-width: 1000px;
  }
}
</style>