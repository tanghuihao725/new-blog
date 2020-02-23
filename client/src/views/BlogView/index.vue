<template>
  <div class="blog-view-container">
    <div class="content-container">
      <div class="cover-image-wrapper" v-if="blogContent.coverImage" v-show="false">
        <img :src="blogContent.coverImage" class="cover-image" />
      </div>

      <div class="title-container">
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
          :value="blogContent.body"
          :boxShadow="false"
          :toolbarsFlag="false"
          :subfield="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Album from "@/components/Album";
import Tag from "@/components/Tags/Tag";

export default {
  data() {
    return {
      blogContent: {}
    };
  },
  computed: {
    albumData() {
      const { albumName, color, icon, notPush, hide } = this.blogContent;
      return { albumName, color, icon, notPush, hide };
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
    ...mapActions("content/blogs", ["getSingleBlog"])
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
  components: {
    Album,
    Tag
  }
};
</script>

<style lang="less" scoped>
.blog-view-container {
  width: 100%;
  background-color: rgb(251, 251, 251);

  .content-container {
    max-width: 1600px;
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 16px;
    .cover-image-wrapper {
      text-align: center;
      .cover-image {
        width: 100%;
      }
    }

    .title-container {
      text-align: center;
      .blog-title {
        font-size: 2em;
      }
      .blog-time {
        color: #666;
        font-size: 0.8em;
        .created-at {
          margin-right: 1em;
        }
      }

      .label-wrapper {
        font-size: 16px;
      }
    }

    .body-container {
      margin-top: 30px;

      .v-note-wrapper {
        border: none;
      }
    }
  }
}
</style>

<style lang="less">
.body-view-container {
  .markdown-body img {
    max-width: 40%;
    background-color: transparent;
  }
}
</style>