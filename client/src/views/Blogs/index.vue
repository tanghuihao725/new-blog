<template>
  <div class="categories-blogs-layout-container">
    <nav>
      <navLeft :navData="navData">
        <div class="tab-bar">
          <h3 :class="{ tabItem:true, active:active===0 }" @click="handleAllArticalsClicked">ALL Artials</h3>
          <h3 class="tabItem" @click="routeToCategories">Categories</h3>
        </div>
      </navLeft>
    </nav>
    <div class="categories-blogs-content">
      <div class="articals-wrapper">
        <h1 class="all-title animated bounce"  v-if="active===0">All Articals</h1>
        <AticalItem
          :class="`artical-item animated fadeInRight`"
          v-for="blog in blogs"
          :articalData="blog"
          :key="blog.id"
          @click="handleBlogClick(blog.id)"
        />
        <div class="paginaion">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            :hide-on-single-page="true"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import navLeft from "@/components/Nav/navLeft";
import { mapActions, mapGetters } from "vuex";
import AticalItem from "./ArticalItem";
import CategoriesItem from "@/views/Home/Categories/ListItem";

export default {
  data() {
    return {
      active: 0,
      pageNum: 1,
      pageSize: 20,
      albumInfo: null
    };
  },
  computed: {
    ...mapGetters("user", ["userCurrent"]),
    ...mapGetters("content/blogs", ["blogs", "total"]),
    ...mapGetters("content/albums", ["albums"]),
    queryType() {
      if (this.userCurrent.authority >= 5) {
        return 3;
      }
      return 2;
    },
    navData(){
      if(this.active === 0 || !this.albumInfo){
        // 所有博客页，为默认标题 和 描述
        return {}
      }else {
        return {
          title: this.albumInfo.albumName,
          description: this.albumInfo.description,
          icon: this.albumInfo.icon
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.albumId !== undefined) {
      this.active = 1;
      const albumId = this.$route.query.albumId
      this.freshBlogs(albumId);
      this.fetchAlbums({albumsIds:albumId})
      .then(res => {
        this.albumInfo = res.data.data[0]
      })
    }else{
      this.freshBlogs();
    }
    // 给博客增加出场动画
    const articalItems = document.querySelectorAll('.artical-item')
    articalItems.forEach((item,index)=> {
      //item.classList.remove('hide')
      //item.classList.add('animated','fadeInRight')
      item.style.animationDelay = `${index * 0.03}s`
    })
  },
  watch: {},
  methods: {
    ...mapActions("content/blogs", ["fetchBlogs"]),
    ...mapActions("content/albums", ["fetchAlbums"]),
    /**
     * 获取博客
     */
    freshBlogs(albumId) {
      const param = {
        type: this.queryType,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if(albumId!==undefined) param.albumId = albumId
      this.fetchBlogs(param);
    },
    /**
     * 给文章增加入场动画
     */
    /**
     * 选择为所有文章
     */
    handleAllArticalsClicked(){
      if(this.active===0) return
      this.pageNum = 1
      this.active = 0;
      this.freshBlogs()
    },
    handleBlogClick(id) {
      this.$router.push({ path: "/blog", query: { id } });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.freshBlogs();
    },
    routeToCategories() {
      this.$router.push("/categories");
    }
  },
  components: {
    navLeft,
    AticalItem,
    CategoriesItem
  }
};
</script>


<style lang="less" scoped>
.categories-blogs-layout-container {
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
  .active:before {
    background-color: #ac4142;
  }
  .categories-blogs-content {
    font-size: 1em;
    .articals-wrapper,
    .albums-wrapper {
      // border: 1px solid green;
      display: flex;
      flex-direction: column;
      .all-title {
        font-size: 1.3em;
        color: #f20;
        margin-left: 0em;
      }
    }
  }
  .albums-wrapper {
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
  .paginaion {
    margin-top: 2em;
    color: #ac4142 !important;
  }
}
.rootPc {
  .categories-blogs-layout-container {
    .categories-blogs-content {
      margin-left: 27%;
      padding: 2em 0;
      .articals-wrapper,
      .albums-wrapper {
        padding: 0 2em;
      }
    }
  }
}

.rootMobile {
  .categories-blogs-layout-container {
    .all-title {
      font-size: 1em;
    }
    .tab-bar {
      display: flex;
      justify-content: space-around;
    }

    .categories-blogs-content {
      margin-top: 0vh;
      padding: 1em 1em;
      .articals-wrapper,
      .albums-wrapper {
        .all-title {
          font-size: 1em;
        }
      }
    }
  }
}
</style>