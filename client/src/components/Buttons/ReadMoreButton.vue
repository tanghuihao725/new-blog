<template>
  <span class="read-more-button-wrapper" @click="handleClick">
    <slot />
  </span>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less">
.read-more-button-wrapper {
  display: inline-block;
  padding: 0.625em 0.83em;
  color: #fff;
  background-color: #fa4b2a;
  cursor: pointer;
  font-size: 1em;
  line-height: 1em;
}

.read-more-button-wrapper:hover {
  background-color: #000;
}
</style>