<template>
  <div class="message-pad-wrapper">
    <div class="pad-left">
      <div class="title">
        <h3>Leave A Note</h3>
      </div>
      <div class="message-editor-wrapper message-pad">
        <textArea @success="handleCreateMessageSuccess" />
      </div>
    </div>
    <div class="pad-list-wrapper message-pad">
      <div class="tab-wrapper">
        <span :class="{ active: active===1}" @click="handlePadClick(1)">最新留言</span>
        <span>|</span>
        <span :class="{ active: active===2}" @click="handlePadClick(2)">精选留言</span>
      </div>
      <div class="messages-list-wrapper">
        <p v-if="messagesList.length===0" class="no-data-tip">没有留言 ：（</p>
        <div v-else class="message-list" v-loading="loading">
          <ListItem
            class="list-item animate6 hide"
            v-for="item in messagesList.slice(0,5)"
            :key="item.id"
            :itemData="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import textArea from "./textArea";
import ListItem from "./ListItem";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      active: 1,
      messagesList: [],
      loading: false
    };
  },
  methods: {
    ...mapActions("content/messages", ["fetchMessages"]),
    refreshMessages(type = 1) {
      this.loading = true;
      return this.fetchMessages({ type })
        .then(res => {
          this.loading = false;
          this.messagesList = res.data;
        })
        .then(() => {
          // 加入入场动画
          const eles = document.querySelectorAll(".animate6");
          eles.forEach((ele,index) => {
            ele.classList.remove("hide");
            ele.classList.add("animated", "fadeInRight");
            ele.style.animationDelay = `${index * 0.5}s`
          });
        });
    },
    handlePadClick(type) {
      this.active = type;
      return this.refreshMessages(type);
    },
    handleCreateMessageSuccess() {
      // 新插入的没有入场动画
      this.handlePadClick(1);
    }
  },
  mounted() {
    this.refreshMessages(1);
  },
  components: {
    textArea,
    ListItem
  }
};
</script>

<style lang="less" scoped>
.message-pad-wrapper {
  width: 80%;
  max-width: 1280px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .message-pad {
    background-color: #fff;
    // border: 2px solid #f20;
  }

  .pad-left {
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 1.5em;
      line-height: 1.5em;
      margin: 0.8em 0em 0 0;
      color: #f20;
      text-align: center;
    }

    .message-editor-wrapper {
      height: 75%;
    }
  }
  .pad-list-wrapper {
    width: 40%;
    height: 100%;
    .tab-wrapper {
      font-size: 0.9em;
      color: #666;
      margin-top: 15px;
      span {
        margin-right: 20px;
        padding: 2px 5px;
        cursor: pointer;
      }
      .active {
        color: #f20;
        border-bottom: 2px solid #f20;
      }
    }
    .messages-list-wrapper {
      width: 70%;
      height: 85%;
      margin-top: 3%;

      .message-list {
        height: 100%;
        display: flex;
        flex-direction: column;
        .list-item {
          margin-top: 5px;
        }
      }

      .no-data-tip {
        color: #666;
        margin: 3em 0;
      }
    }
  }
}
</style>