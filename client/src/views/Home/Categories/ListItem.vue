<template>
  <div class="list-item-wrapper" @click="handleClick">
    <div class="cover-img-wrapper">
      <img :src="itemData.smallCoverImage" />
    </div>
    <div class="content-wrapper">
      <h3 class="album-name">{{itemData.albumName}}</h3>
      <span class="blog-count">
        <i :class="itemData.icon"></i>
        共收录
        {{itemData.blogCount}}
        篇博客
      </span>
      <p class="album-description">{{itemData.description}}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    itemData: {
      default: () => ({
        albumName: "默认",
        icon: "el-icon-folder",
        blogCount: 0,
        description: "没有内容哦没有内容哦没有内容哦没有内容哦没有内容哦",
        smallCoverImage: "../../assets/img/avatar/avatar_pig_bow_small.jpg"
      })
    }
  },
  methods:{
    handleClick(){
      this.$emit("click")
    }
  }
};
</script>

<style lang="less" scoped>
.list-item-wrapper {
  height: 100px;
  width: 100%;
  display: flex;
  cursor: pointer;
  .cover-img-wrapper {
    min-width: 100px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-wrapper {
    margin-left: 10px;
    overflow: hidden;
    .album-name {
      font-size: 1.2em;
      margin: 0;
    }

    .blog-count {
      font-size: 0.8em;
      color: #fa4b2a;
      font-weight: 700;
    }
    .album-description {
      font-size: 0.8em;
      color: #666;
    }
  }
}
</style>