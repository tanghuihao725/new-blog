<template>
  <div :class="blogContainerClasses">
    <el-card shadow="hover" class="card">
      <div class="img-wrapper" v-if="withCoverImage">
        <img class="cover-image" :src="blogContent.coverImage" />
      </div>
      <div class="content-wrapper">
        <!-- 标题+标签容器 -->
        <div class="title-label-wrapper">
          <span class="blog-title">{{blogContent.title}}</span>

          <span class="label-container" v-if="!isMobile && withCoverImage">
            <Album :albumData="albumData" />
            <span v-if="withCoverImage && blogContent.tagDetails">
              <Tag v-for="tag in blogContent.tagDetails.slice(0,3)" :key="tag.id" :tagData="tag" />
            </span>
          </span>
        </div>

        <p class="blog-time" v-if="withCoverImage">
          <span class="created-at">发布于: {{ createdTime }}</span>
          <span v-if="updatedTime">于{{ updatedTime }} 编辑</span>
        </p>

        <div class="blog-body">
          <div class="blog-description" v-if="blogDescription">
            <p class="desc-para" v-for="(para, index) in blogDescription" :key="index">{{para}}</p>
          </div>
          <div class="body-no-description" v-else>{{blogContent.body || "没有内容"}}</div>
        </div>

        <div class="read-more-wrapper">
          <div class="label-wrapper" v-if="!withCoverImage">
            <Album :albumData="albumData" size="mini" />
          </div>
          <ReadMoreButton class="button" @click="handleClickButton">Read More</ReadMoreButton>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
import Album from "@/components/Album";
import Tag from "@/components/Tags/Tag";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    blogContent: {
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["isMobile"]),
    withCoverImage() {
      return !!this.blogContent.coverImage;
    },
    blogContainerClasses() {
      return {
        blogCardContainer: true,
        mobile: this.isMobile,
        withCoverImage: this.withCoverImage
      };
    },
    createdTime() {
      return this.blogContent.createdAt.split(" ")[0];
    },
    updatedTime() {
      const updated = this.blogContent.updatedAt.split(" ")[0];
      if (updated === this.createdTime) return false;
      return updated;
    },
    albumData() {
      const { albumName, color, icon, notPush, hide } = this.blogContent;
      return { albumName, color, icon, notPush, hide };
    },
    blogDescription() {
      const description = this.blogContent.description;
      if (!description) return false;
      return description.split("\n");
    }
  },
  methods: {
    handleClickButton() {
      this.$router.push({ path: "/blog", query: { id: this.blogContent.id } });
    }
  },
  components: {
    Album,
    Tag,
    ReadMoreButton
  }
};
</script>


<style lang="less">
@title-color: #fa4b2a;

.blogCardContainer {
  width: 30%;
  margin: 0 auto;
  margin-bottom: 30px;
  box-sizing: border-box;
  min-width: 260px;
  font-size: 12px;
  position: relative;
  .card {
    min-height: 260px;
    margin: 0 0.5em;
    .content-wrapper {
      padding: 0 0.31em;
      height: 215px;
      // border: 1px solid green;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title-label-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0.31em 0;
        width: 100%;
        align-items: flex-end;
        .blog-title {
          color: @title-color;
          font-weight: 600;
          font-size: 1.5em;
          line-height: 1.5em;
        }
        .label-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 0.31em;
          align-items: center;
          transform: scale(0.8);
        }
      }

      .blog-time {
        color: #666;
        font-size: 0.8em;
        .created-at {
          margin-right: 1em;
        }
      }
      .blog-body {
        height: 6.5em;
        color: #666;
        font-size: 0.9em;
        line-height: 1.3em;
        font-weight: 200;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6; //想要的行数
        -webkit-box-orient: vertical;
        .desc-para {
          margin: 0em 0;
        }
      }
      .read-more-wrapper {
        display: flex;
        flex-direction: row-reverse;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        // border: 1px solid black;
        
      }
    }
  }
}

.withCoverImage {
  width: 70%;
  font-size: 16px;
  min-width: 780px;
  .card {
    min-height: 700px;
    padding: 0 2em;
    .img-wrapper {
      text-align: center;
      .cover-image {
        width: 100%;
        max-height: 402px;
      }
    }
    .content-wrapper{
      height: 275px;
    }
  }
  .blog-body {
    height: 7.5em !important;
  }
}
.mobile {
  .card {
    width: 100%;
    padding: 0 !important;
    .cover-image {
      width: 80% !important;
      height: 200px !important;
    }
  }
}
</style>