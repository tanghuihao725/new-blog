<template>
  <div class="management-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="博客管理" name="blog" :lazy="true">
        <blogManagement/>
      </el-tab-pane>
      <el-tab-pane label="专辑管理" name="tag" :lazy="true">
        <albumManagement/>
      </el-tab-pane>
      <el-tab-pane label="留言管理" name="message" :lazy="true">
        <messageManagement />
      </el-tab-pane>
      <el-tab-pane label="云控管理" name="cloud" :lazy="true">
        <cloudConfig/>
      </el-tab-pane>
      <el-tab-pane label="标签管理" name="album" :lazy="true">
        <tagManagement />
      </el-tab-pane>
      <el-tab-pane label="图片快速上传" name="imgUpload" :lazy="true">
        <ImgUploader />
      </el-tab-pane>
      <el-tab-pane label="用户管理" name="user" :lazy="true">  
          <div class="user-management-wrapper">
              <userManagement/>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userManagement from './userManagement'
import albumManagement from './albumManagement'
import tagManagement from './tagManagement'
import blogManagement from './blogManagement'
import cloudConfig from './CloudConfig'
import messageManagement from './messageManagement'
import ImgUploader from './ImgUploader'

export default {
  data() {
    return {
      activeName: "blog"
    };
  },
  methods: {
  },
  components:{
      userManagement,
      albumManagement,
      tagManagement,
      blogManagement,
      cloudConfig,
      messageManagement,
      ImgUploader
  }
};
</script>

<style lang="less" scoped>
.management-container{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 100px;

    .user-management-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;

    }
}
</style>