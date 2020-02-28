<template>
  <div class="categories-wrapper">
    <div class="album-lists-wrapper">
      <ListItem
        v-for="item in albumList"
        :key="item.id"
        class="list-item animate3 hide"
        :itemData="{
              id: item.id,
              albumName: item.albumName,
              icon: item.icon,
              blogCount: blogsByAlbum[item.id] ? blogsByAlbum[item.id].total : 0,
              description: item.description,
              smallCoverImage: item.smallCoverImage
          }"
      />
    </div>
    <div class="main-album-wrapper animate4 hide">
      <h3 class="over-all-title">CATEGORIES</h3>

      <div class="main-album-hover-image animate4 hide" @click="handleAlbumClick(mainAlbum.id)">
        <HoverImage
          :imgData="{
            psPic: mainAlbum.coverImage,
            psPicTitle: mainAlbum.albumName,
            psPicWords: mainAlbum.description
        }"
        />
      </div>
    </div>

    <div class="more-button-wrapper animate4 hide">
        <ReadMoreButton @click="handleViewAllClick">View All <i class="el-icon-right"></i></ReadMoreButton>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import ListItem from "./ListItem";
import HoverImage from "@/components/HoverImage";
import ReadMoreButton from "@/components/Buttons/ReadMoreButton"

export default {
  computed: {
    ...mapGetters("content/albums", ["albums"]),
    ...mapGetters("content/blogs", ["blogsByAlbum"]),
    // 主要专辑
    mainAlbum() {
      const withCoverImage = this.albums.filter(album => !!album.coverImage);
      return withCoverImage.length > 0 ? withCoverImage[0] : {};
    },
    // 其他专辑按顺序
    albumList() {
      return this.albums.filter(album => !!album.smallCoverImage).slice(0, 4);
    }
  },
  mounted() {
    const query = { type: 0 };
    this.fetchAlbums(query);
  },
  methods: {
    ...mapActions("content/albums", ["fetchAlbums"]),
    handleAlbumClick(albumId) {
      this.$router.push({
        path: "/categories",
        query: { id: albumId }
      });
    },
    handleViewAllClick(){
        this.$router.push("/categories")
    }
  },
  components: {
    ListItem,
    HoverImage,
    ReadMoreButton
  }
};
</script>


<style lang="less" scoped>
.categories-wrapper {
  width: 80%;
  max-width: 1280px;
  height: 535px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;

  .album-lists-wrapper {
    width: 28%;
    height: 440px;
    display: flex;
    flex-direction: column;
    .list-item {
      margin: 5px 0;
    }
  }
  .main-album-wrapper {
    width: 55%;
    height: 535px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .main-album-hover-image {
      cursor: pointer;
      width: 100%;
      height: 440px;
    }
    .over-all-title {
      margin: 0;
      font-size: 3em;
      color: #fa4b2a;
      text-shadow: 2px 2px 8px orange;
    }
  }

  .more-button-wrapper{
      width: 10%;
      font-size: 0.9em;
  }
}
</style>