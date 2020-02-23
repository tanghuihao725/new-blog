<template>
  <div class="img-upload">
    <h1>This is an upload Image page</h1>
    <p>{{imageUrl || '暂无url'}}</p>
    <el-upload
      class="avatar-uploader"
      :action="`${baseUrl}/upload/img/`"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img :src='imageUrl' style="width:200px"/>
  </div>
</template>

<script>
  import myconfig from '@/myconfig'

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
      handleAvatarSuccess(res) {
        this.imageUrl = res.url;
      },
      handleAvatarError(err) {
        this.$message.error({message:`${err}`})
      }
    }
  }
</script>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

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