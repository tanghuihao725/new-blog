<template>
  <div class="categories-layout-container">
    <nav>
      <navLeft>
        <div class="tab-bar">
          <h3 class="tabItem" @click="routerToBlog">All Artials</h3>
          <h3 class="tabItem active">Categories</h3>
        </div>
      </navLeft>
    </nav>
    <div class="categories-content">
      <h1 class="all-title">Categories</h1>
      <div class="album-content-wrapper">
        <div class="album-item-wrapper animated zoomIn" v-for="album in albums" :key="album.id">
          <CategoriesItem
            :itemData="Object.assign(album, { 
            blogCount: doBlogCount(album.id)
          })"
            @click="handleBlogClick(blog.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import navLeft from "@/components/Nav/navLeft";
import { mapActions, mapGetters } from "vuex";
import CategoriesItem from "@/views/Home/Categories/ListItem";

export default {
  data() {
    return {
      active: 0
    };
  },
  computed: {
    ...mapGetters("user", ["userCurrent"]),
    ...mapGetters("content/blogs", ["blogsByAlbum"]),
    ...mapGetters("content/albums", ["albums"])
  },
  mounted() {
    this.active = this.$route.query.type ? Number(this.$route.query.type) : 0;
    this.freshBlogsByAlbum();
    this.freshAlbums();
    const elements = document.querySelectorAll('.album-item-wrapper')
    elements.forEach((ele,index)=>{
      ele.style.animationDelay = `${index*0.15}s`
    })
  },
  watch: {},
  methods: {
    ...mapActions("content/blogs", ["fetchBlogsByAlbum"]),
    ...mapActions("content/albums", ["fetchAlbums"]),
    freshBlogsByAlbum() {
      const type = this.userCurrent && this.userCurrent.authority >= 6 ? 1 : 0;
      this.fetchBlogsByAlbum({ type });
    },
    freshAlbums() {
      const param = {};
      console.log(this.userCurrent)
      if (!this.userCurrent.authority || this.userCurrent.authority < 5) {
        param.type = 1;
      }
      this.fetchAlbums(param);
    },
    routerToBlog() {
      this.$router.push("/blogs");
    },
    doBlogCount(id) {
      if (this.blogsByAlbum && this.blogsByAlbum[id]) {
        return this.blogsByAlbum[id].total;
      }
      return 0;
    }
  },
  components: {
    navLeft,
    CategoriesItem
  }
};
</script>


<style lang="less" scoped>
.categories-layout-container {
  width: 100%;
  height: 50px;
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
  .active {
    color: #ac4142;
  }
  .active::before {
    background-color: #ac4142;
  }
  .categories-content {
    font-size: 1em;
    .all-title {
      font-size: 1.3em;
      color: #f20;
      margin-left: 0em;
    }
  }

  .album-content-wrapper {
    display: flex;
    width: 100%;
    max-width: 1500px;
    flex-wrap: wrap;
    font-size: 16px;
    .album-item-wrapper {
      width: 27%;
      margin: 1em 2%;
    }
  }
}
.rootPc {
  .categories-layout-container {
    .categories-content {
      margin-left: 27%;
      padding: 2em 2em;
    }
  }
}

.rootMobile {
  .categories-layout-container {
    .all-title {
      font-size: 1em;
    }
    .tab-bar {
      display: flex;
      justify-content: space-around;
    }

    .categories-content {
      margin-top: 0vh;
      padding: 1em 1em;
      .articals-wrapper,
      .albums-wrapper {
        .all-title {
          font-size: 1em;
        }
      }
    }

    .album-content-wrapper {
      .album-item-wrapper {
        width: 100%;
        margin: 1em 2%;
      }
    }
  }
}
</style>