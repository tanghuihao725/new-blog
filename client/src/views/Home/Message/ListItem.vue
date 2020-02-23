<template>
  <div class="list-item-container">
    <div class="body-wrapper">
        <p class="body" v-for="(para,index) in messageBody" :key="index">{{para}}</p>
    </div>
    
     <div class="name-and-time">
      <div class="created-at">{{createdAt}}</div>
      <div class="nick-name">{{itemData.nickname || '不愿透露姓名的游客'}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      default: () => ({
        nickname: "",
        createdAt: "",
        body: ""
      })
    }
  },
  computed: {
    createdAt() {
        const timeArr = this.itemData.createdAt.split(":")
        return timeArr.slice(0, timeArr.length-1).join(":")
    },
    messageBody() {
      return this.itemData.body.split("\n");
    }
  }
};
</script>

<style lang="less" scoped>
.list-item-container {
  width: 100%;
  height: 65px;
//   box-shadow: 0px 0px 2px #666;
  background-color: #f20;
  border-radius: 8px;
  color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  padding: 3px 15px;
  display: flex;
  justify-content: space-between;

  .body-wrapper{
      width: 60%;
      overflow: hidden;
  }

  .name-and-time{
      text-align: right;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
  }
  
  .nick-name {
    color: #fff;
    font-size: 0.8em;
    margin-bottom: 0.2em;
  }
  .created-at {
    color: #ccc;
    font-weight: 150;
    font-size: 0.5em;
    margin-left: 1em;
    margin-top: 0.2em;
  }
  .body {
    font-size: 0.8em;
    font-weight: 150;
  }

  h3,
  p {
    margin: 0;
  }
}
</style>