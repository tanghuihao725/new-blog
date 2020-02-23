<template>
  <div class="resume-button-container" ref="resume">
    <div
      class="resume-container"
      :class="{
    animated: true,
    bounceInRight: localVisibile,
    bounceOutRight: !localVisibile
  }"
      v-show="visible"
    >
      <ReadMoreButton @click="handleClose" class="out-in-button">
        <i class="el-icon-s-unfold"></i>
      </ReadMoreButton>

      <div class="content-container animated">
        <div class="avatar-relative-wrapper">
          <div class="avatar-wrapper">
            <img class="avatar" :src="selfInfo.avator" />
          </div>
        </div>

        <h3 class="nick-name">{{selfInfo.nickname || '暂无数据' }}</h3>

        <div class="school-company" v-if="details">
          <div v-if="details.school && details.controller.school">
            <i class="el-icon-school"></i>
            <span>{{details.school}}</span>
          </div>
          <div v-if="details.company && details.controller.company">
            <i class="el-icon-office-building"></i>
            <span>{{details.company}}</span>
          </div>
          <div v-if="details.controller.telephone">
            <i class="el-icon-mobile-phone"></i>
            <span>{{selfInfo.telephone}}</span>
          </div>

          <div v-if="details.controller.email">
            <i class="el-icon-message"></i>
            <span>{{selfInfo.email}}</span>
          </div>
        </div>

        <div class="self-description">
          <p v-for="(desc, index) in description" :key="index">{{desc}}</p>
        </div>
        <div class="button-wrapper" @click="handleMoreClick('/about')">
          <ReadMoreButton>
            More About Me
            <i class="el-icon-right"></i>
          </ReadMoreButton>
        </div>

        <div class="outer-link" v-if="details">
          <p class="outer-link-tip">外部链接：</p>
          <ReadMoreButton
            class="outer-link-button"
            v-for="link in details.outerLink"
            :key="link.title"
            @click="toLink(link.path)"
          >
            <i class="el-icon-link"></i>
            {{link.title}}
          </ReadMoreButton>
        </div>

        <div class="outer-link" v-if="details">
          <p class="outer-link-tip">友情链接：</p>
          <ReadMoreButton
            class="outer-link-button"
            v-for="link in details.friendLink"
            :key="link.title"
            @click="toLink(link.path)"
          >
            <i class="el-icon-link"></i>
            {{link.title}}
          </ReadMoreButton>
        </div>
      </div>
    </div>
    <div class="button-container" v-if="!visible">
      <ReadMoreButton @click="handleOpen" class="out-in-button">
        <i class="el-icon-s-fold"></i>
      </ReadMoreButton>
    </div>
  </div>
</template>


<script>
import ReadMoreButton from "@/components/Buttons/ReadMoreButton";
import { mapActions } from "vuex";

export default {
  props: {
    visible: {
      default: true
    }
  },
  data() {
    return {
      localVisibile: true,
      selfInfo: {}
    };
  },
  computed: {
    details() {
      if (!this.selfInfo.details) return null;
      return JSON.parse(this.selfInfo.details);
    },
    description() {
      if (this.details && this.details.description) {
        return this.details.description.split("\n");
      }
    }
  },
  mounted() {
    this.fetchManagerDetails().then(res => (this.selfInfo = res.data.data[0]));
  },
  methods: {
    ...mapActions("user/userManagement", ["fetchManagerDetails"]),
    handleClose() {
      this.localVisibile = false;
      setTimeout(() => {
        this.$emit("update:visible", false);
      }, 1000);
    },
    handleOpen() {
      this.localVisibile = true;
      this.$emit("update:visible", true);
    },
    handleMoreClick(path) {
      this.handleClose();
      setTimeout(() => {
        this.$router.push(path);
      }, 900);
    },
    toLink(url) {
      window.open(url,"_blank")
    }
  },
  components: {
    ReadMoreButton
  }
};
</script>


<style lang="less">
.resume-container:after {
  content: "";
  display: block;
  background: url(../../assets/img/info-bg.jpg);
  background-color: orange;
  background-size: 100% 100%;
  width: 110%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // opacity: 0.4;
  z-index: -1;
}
.resume-container {
  width: 25vw;
  max-width: 500px;
  height: 100vh;
  font-size: 16px;
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar-relative-wrapper:hover {
      .avatar-wrapper:after {
        transform: rotate(1800deg);
        // visibility: visible;
        opacity: 1;
        animation: my-rotate 5s linear infinite;
      }
      .avatar-wrapper {
        .avatar {
          width: 8.3em;
          height: 8.3em;
        }
      }
    }
    .avatar-wrapper {
      width: 13em;
      height: 13em;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      position: relative;
      .avatar {
        width: 8em;
        height: 8em;
        border-radius: 50%;
        transition: all 0.3s;
      }
    }
    .avatar-wrapper:after {
      content: "";
      background: url(../../assets/img/avatar-bg.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0px;
      left: 0;
      animation: my-rotate 10s linear infinite;
      transform: opacity 2s;
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }
    .nick-name {
      text-align: center;
      font-weight: 400;
      margin: 0.8em 0;
      color: #000;
    }
    .school-company {
      text-align: center;
      span,
      i {
        margin-right: 5px;
        font-size: 0.8em;
        color: #333;
      }
    }
    .self-description {
      margin: 10px 20%;
      font-size: 0.9em;
      text-align: center;
      color: #333;
      p {
        text-indent: 2em;
        margin: 0.1em 0;
        color: #444;
      }
    }
    .button-wrapper {
      text-align: right;
      font-size: 0.8em;
    }
    .outer-link {
      text-align: center;
      font-size: 0.8em;
      color: #333;

      .outer-link-button {
        margin: 0 2px;
        border-radius: 10px;
      }
    }
  }
}

.out-in-button {
  transition: all 1s;
  margin-top: 20px;
}

@keyframes my-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>