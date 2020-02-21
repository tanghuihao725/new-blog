<template>
  <div class="management-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="博客管理" name="blog" :lazy="true">
        <blogManagement/>
      </el-tab-pane>
      <el-tab-pane label="专辑管理" name="tag" :lazy="true">
        <albumManagement/>
      </el-tab-pane>
      <el-tab-pane label="标签管理" name="album" :lazy="true">
        <tagManagement />
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

export default {
  data() {
    return {
      activeName: "blog"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components:{
      userManagement,
      albumManagement,
      tagManagement,
      blogManagement
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