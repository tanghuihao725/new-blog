<template>
  <div class="home">
      <Tag /> <Album />
  </div>
</template>

<script>
import Tag from '@/components/Tags/Tag'
import Album from '@/components/Album'

export default {
  name: 'home',
  components: {
    Tag,Album
  }
}
</script>

<style lang="less" scoped>
.home{
  width: 80%;
  margin: 0 auto;
}
</style>
