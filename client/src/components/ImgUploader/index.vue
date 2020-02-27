<template>
  <div class="img-uploader-container">
    <el-upload
      class="avatar-uploader"
      :action="`${baseURL}/upload/img/`"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <img v-else-if="defaultImage" :src="defaultImage" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="button-wrapper">
        <el-button type="danger" v-if="imageUrl" @click="handleImgDelete">删除</el-button>
    </div>
  </div>
</template>


<script>
// 配置文件
const env = process.env.NODE_ENV || "dev";
const config = require("../../../../myconfig.js")[env];

export default {
    props:{
        // 双向绑定 imageUrl
        imageUrl:{
            default: ""
        },
        defaultImage:{
            default: ""
        }
    },
    data(){
        return {
        }
    },
    computed:{
        baseURL(){
            return config.API_BASE_URL
        }
    },
    methods:{
        handleSuccess(res){
            this.$emit('update:imageUrl', res.url)
            this.$emit('success')
        },
        handleError(err){
            this.$emit('error')
        },
        handleImgDelete(){
            // 远程删除 暂不支持
            this.$emit('update:imageUrl', '')
            this.$emit('delete')
        }
    }
};
</script>


<style lang="less" scoped>
.img-uploader-container{
    display: flex;
    .button-wrapper{
        height: 2em;
        align-self: center;
        margin-left: 2em;
    }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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