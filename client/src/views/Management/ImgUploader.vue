<template>
  <div class="img-upload">
    <h1>This is an upload Image page</h1>
    <h3>{{imageUrl || '暂无url'}}</h3>
    <ImgUploader :imageUrl.sync="imageUrl" @error="handleError"/>
  </div>
</template>

<script>
  import ImgUploader from '@/components/ImgUploader'

  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    computed:{
      baseUrl(){ return myconfig.baseUrl }
    },
    methods: {
      handleSuccess(res) {
        this.imageUrl = res.url;
      },
      handleError(err) {
        this.$message.error({message:`${err}`})
      }
    },
    components:{
      ImgUploader
    }
  }
</script>



<style lang="less" scoped>
.img-upload{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 600px;
}
</style>