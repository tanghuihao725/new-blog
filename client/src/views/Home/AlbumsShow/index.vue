<template>
  <div class="albums-show-container">
    <div class="title" v-if="isMobile">
      <HeadLine>Know Me</HeadLine>
    </div>
    <div class="hover-image-wrapper">
      <hoverImage class="hover-image" :imgData="imgData" />
    </div>
    <div class="ps-description">
      <h3 class="title animate2 hide">{{psData.psTitle}}</h3>
      <h4 class="sub-title animate2 hide">{{psData.psSubTitle}}</h4>
      <p class="body animate2 hide" v-for="(para,index) in psDescription" :key="index">{{para}}</p>
    </div>
  </div>
</template>


<script>
import hoverImage from "@/components/HoverImage";
import HeadLine from "@/components/HeadLine";
import { mapGetters } from "vuex";

export default {
  props: {
    psData: {
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['isMobile']),
    imgData() {
      const { psPic, psPicTitle, psPicWords } = this.psData;
      return { psPic, psPicTitle, psPicWords };
    },
    psDescription() {
      return this.psData.psDescription
        ? this.psData.psDescription.split("\n")
        : [];
    }
  },
  components: {
    hoverImage,
    HeadLine
  }
};
</script>


<style lang="less" scoped>
.albums-show-container {
  width: 80%;
  height: 415px;
  background-color: white;
  z-index: 5;
  display: flex;
  box-sizing: border-box;

  .hover-image-wrapper {
    width: 50%;
    height: 100%;
  }
  .ps-description {
    width: 50%;
    // max-height: 100%;
    overflow: hidden;
    padding: 3em 4em;

    .title {
      font-size: 1.5em;
      color: #fa4b2a;
    }
    .sub-title {
      font-size: 1em;
      color: #333;
      // font-weight: 300;
    }
    .body {
      font-size: 0.9em;
      color: #666;
    }
  }
}
</style>

<style lang="less" scoped>
.rootMobile {
  .hide {
    visibility: visible;
  }
  .albums-show-container {
    width: 100%;
    height: auto;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 14px;
    // background-color: #ac4143;
    border: 5px dotted #ac4143;

    .hover-image-wrapper {
      width: 100%;
    }
    .ps-description {
      width: 90%;
      padding: 3em 5% 5em 5%;
    }
  }
}
</style>