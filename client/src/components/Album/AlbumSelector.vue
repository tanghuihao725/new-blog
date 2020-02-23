<template>
  <div class="label-selector-container">
    <div class="choosed-wrapper">
      <span v-for="album in choosed" :key="album.id" @click="handleChoose(album)">
        <Album :albumData="album" :chooseAble="true" />
      </span>
    </div>
    <div class="client-wrapper">
      <span class="tip-text">请选择：</span>
      <span v-for="album in albums" :key="album.id" @click="handleChoose(album)">
        <Album :albumData="album" :chooseAble="true" :isChoosen="isChoosen(album.id)" />
      </span>
    </div>
  </div>
</template>

<script>
import Album from "./index.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    maxNum: {
      default: 1
    },
  },
  data() {
    return {
      choosed: [],
    };
  },
  mounted() {
    this.fetchAlbums()
      .then(()=>{
          
      })
      .catch(e => {
        this.$message.error({ message: "获取专辑失败" });
      });
  },
  updated() {
    this.$emit("change", this.albumIds);
  },
  computed: {
    ...mapGetters("content/albums", ["albums"]),
    /**
     * 由选中album的id组成的字符串
     */
    albumIds() {
      return this.choosed.map(album => album.id).join(",") || "0";
    },
    // 是否达到最大限制
    overflow() {
      return this.choosed.length >= this.maxNum;
    }
  },
  methods: {
    ...mapActions("content/albums", ["fetchAlbums"]),
    handleChoose(album) {
      // 如果未被选中 则选中它 否则 在数组中去除它
      if (!this.isChoosen(album.id)) {
        if (this.overflow) {
          this.$message.error({ message: `最多只能选择${this.maxNum}个专辑` });
        } else {
          this.choosed.push(album);
        }
      } else {
        this.choosed = this.choosed.filter(
          chooseAlbum => chooseAlbum.id !== album.id
        );
      }
    },
    isChoosen(id) {
      return this.choosed.find(item => item.id === id) ? true : false;
    },
    // 可外部调用,更新选中状态
    refreshChoosenListWithIds(ids) {
      if(!ids) return
      const initMap = {};
      this.choosed = []
      this.albums.forEach(album => {
          initMap[album.id] = album
      })
      ids.split(',').forEach(id => {
          if(initMap[id]){
              this.choosed.push(initMap[id])
          }
      })
    }
  },
  components: {
    Album
  }
};
</script>


<style lang="less" scoped>
.label-selector-container {
  // border: 1px solid red;
  width: 100%;
  box-sizing: border-box;

  .choosed-wrapper {
    width: 100%;
    min-height: 2.5em;
    display: flex;
    align-items: center;
    border: 0.1em solid #6f93bd;
    margin-bottom: 0.2em;
    flex-wrap: wrap;
  }

  .client-wrapper {
    width: 100%;
    display: flex;
    min-height: 3.75em;
    flex-wrap: wrap;

    .tip-text {
      font-size: 1em;
      color: #6f93bd;
    }
  }
}
</style>