<template>
  <div class="my-footer-container">
    <div class="body-content" v-if="footerData && contactMeData ">
      <div class="body-left">
        <h3>About the Site：</h3>
        <h4>{{footerData.siteDescTitle}}</h4>
        <p v-for="(para,index) in footerData.siteDesc.split('\n')" :key="index">{{para}}</p>
      </div>

      <div class="body-right">
        <h3>Contact Me:</h3>
        <h4 v-for="(item, index) in contactMeData" :key="index">
          <i :class="item.icon"></i>
          <span v-if="item.name">{{item.name}} :</span>
          <span>{{item.content}}</span>
        </h4>
      </div>
    </div>

    <el-divider content-position="right">THH's Blog</el-divider>
    <div class="bottom-wrapper" v-if="getDetails.beian">
      <a class="beian-link" :href="getDetails.beian.path">{{getDetails.beian.content}}</a>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isMobile"]),
    ...mapGetters("user/userManagement", ["getDetails"]),
    footerData() {
      return this.getDetails.homePage;
    },
    contactMeData() {
      return this.getDetails.contactMe;
    }
  }
};
</script>


<style lang="less" scoped>
.my-footer-container {
  width: 100%;
  height: 300px;
  background-color: #0e101a;

  .body-content {
    height: 210px;
    width: 80%;
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    color: #888;

    p {
      margin: 0;
      font-size: 0.9em;
      margin: 0.2em 0;
      text-indent: 2em;
    }
    h3 {
      margin: 0.5em 0;
    }
    h4 {
      margin: 0.3em 0;
    }
    span {
      margin: 0 0.5em;
    }

    .body-left {
      width: 55%;
      margin-top: 15px;
      border-right: 2px solid #666;
    }
    .body-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      margin-left: 50px;
      margin-top: 20px;
    }
  }

  .bottom-wrapper {
    text-align: center;
    a {
      text-decoration: none;
      color: #666;
      font-size: 0.9em;
    }
    a:hover {
      color: blue;
    }
  }
}
</style>

<style lang="less">
.el-divider__text {
  border-radius: 5px;
  color: #f20;
}
</style>

<style lang="less" scoped>
.rootMobile {
  font-size: 12px;
  .my-footer-container {
    height: 100%;
    padding: 1em 0;
    .body-content {
      width: 100%;
      height: 100%;
      flex-direction: column;
      .body-left {
        width: 100%;
        padding-left: 2em;
        border: none;
      }
      .body-right {
        width: 100%;
      }
    }
  }
}
</style>