<template>
  <div class="hover-image-container">
    <img :src="imgData.psPic" />
    <div class="words-wrapper">
      <h3 class="title">{{imgData.psPicTitle}}</h3>
      <p class="body">{{imgData.psPicWords}}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    imgData: {
      default: () => ({
        psPic: "",
        psPicTitle: "",
        psPicWords: ""
      })
    }
  }
};
</script>


<style lang="less" scoped>
.hover-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    transition: all 0.5s;
  }
  .words-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-width: 40%;
    max-height: 80%;
    overflow: hidden;
    transform: translateX(-100%);
    transition: all 0.8s;

    padding: 1.5em 2em;
    background-color: rgba(0, 0, 0, 0.7);
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;

    .title {
      color: #fa4b2a;
      font-size: 1.3em;
      margin: 1em 0;
    }
    .body {
      font-size: 1em;
      color: #888;
      margin: 1em 0;
    }
  }
}

.hover-image-container:hover {
  .words-wrapper {
    transform: translateX(0);
  }
  img {
    transform: scale(1.1);
  }
}
</style>


<style lang="less" scoped>
.rootMobile {
  .hover-image-container {
    font-size: 12px;
    .words-wrapper {
      max-width: 40%;
      max-height: 50%;
      transform: translateX(0);
      .title {
        margin: 0;
      }
    }
  }
}
</style>