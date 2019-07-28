<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-upload
      class="avatar-uploader"
      action="/api/upload/img/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      drag
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img src="http://localhost:5000/serverImage/avatar_pig_bow_small.jpg" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res) {
        // console.log(res)
        this.imageUrl = res.url;
      },
      handleAvatarError(err) {
        console.log(err)
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
