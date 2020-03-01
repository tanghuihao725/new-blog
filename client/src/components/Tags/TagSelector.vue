<template>
  <div class="label-selector-container">
    <div class="choosed-wrapper">
      <span v-for="tag in choosed" :key="tag.id" @click="handleChoose(tag)">
        <Tag :tagData="tag" :chooseAble="true" />
      </span>
    </div>
    <div class="client-wrapper">
      <span class="tip-text">请选择：</span>
      <span v-for="tag in tags" :key="tag.id" @click="handleChoose(tag)">
        <Tag :tagData="tag" :chooseAble="true" :isChoosen="isChoosen(tag.id)" />
      </span>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    maxNum: {
      default: 5
    }
  },
  data() {
    return {
      choosed: [],
    };
  },
  mounted() {
    this.fetchTags()
      .then(()=>{
          // 至少要提交一次tagIds的值 否则会取null报错
          this.$emit("change", this.tagIds);
      })
      .catch(e => {
        this.$message.error({ message: "获取标签失败" });
      });
  },
  updated() {
    this.$emit("change", this.tagIds);
  },
  computed: {
    ...mapGetters("content/tags", ["tags"]),
    /**
     * 由选中tag的id组成的字符串
     */
    tagIds() {
      return this.choosed.map(tag => tag.id).join(",");
    },
    // 是否达到最大限制
    overflow() {
      return this.choosed.length >= this.maxNum;
    }
  },
  methods: {
    ...mapActions("content/tags", ["fetchTags"]),
    handleChoose(tag) {
      // 如果未被选中 则选中它 否则 在数组中去除它
      if (!this.isChoosen(tag.id)) {
        if (this.overflow) {
          this.$message.error({ message: `最多只能选择${this.maxNum}个标签` });
        } else {
          this.choosed.push(tag);
        }
      } else {
        this.choosed = this.choosed.filter(
          chooseTag => chooseTag.id !== tag.id
        );
      }
    },
    isChoosen(id) {
      return this.choosed.find(item => item.id === id) ? true : false;
    },
    // 可外部调用,更新选中状态
    refreshChoosenListWithIds(ids) {
      const initMap = {};
      this.choosed = []
      if(!ids) return
      this.tags.forEach(tag => {
          initMap[tag.id] = tag
      })
      ids.split(',').forEach(id => {
          if(initMap[id]){
              this.choosed.push(initMap[id])
          }
      })
    }
  },
  components: {
    Tag
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
    border: 0.1em solid #666;
    margin-bottom: 0.18em;
    flex-wrap: wrap;
  }

  .client-wrapper {
    width: 100%;
    display: flex;
    min-height: 3.75em;
    flex-wrap: wrap;

    .tip-text {
      font-size: 1em;
      color: #666;
    }
  }
}
</style>