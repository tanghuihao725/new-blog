<template>
  <div class="status-wrapper">
    <!-- <p>{{userCurrent}}</p> -->
    <div class="is-login" v-if="isLogin" trigger="click">
      <div class="avatar-wrapper">
        <el-avatar size="small" shape="square" :src="userCurrent.avator" />
      </div>
      <p class="nickname">{{userCurrent.nickname||userCurrent.telephone}}</p>
      <div class="badage-wrapper" v-if="userCurrent.authority!==1">
        <authBadage :authority="userCurrent.authority" short />
      </div>

        <!-- 下拉菜单 -->
      <div class="dropdown-wrapper">
        <el-dropdown size="small" placement="bottom-start">
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided>
              <span style="color:red" @click="handleLogOut">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>


    </div>
    <el-button type="text" class="not-login" v-else @click="handleLogin">请登陆</el-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import authBadage from "../common/authBadage.vue";

export default {
  computed: {
    ...mapGetters("user", ["userCurrent", "isLogin"])
  },
  methods:{
      ...mapMutations('user',['setUserCurrent','setUserDialog']),
      // 登出
      handleLogOut(){
          this.setUserCurrent({})
          if(localStorage && localStorage.blogToken)
            delete localStorage.blogToken
      },
      // 登陆
      handleLogin(){
          this.setUserDialog(true)
      }
  },
  components: {
    authBadage
  }
};
</script>

<style lang="less" scoped>
.status-wrapper {
  position: relative;
  display: inline-block;
  font-size: 0.6rem;
  // border: 1px solid red;
  .avatar-wrapper {
    display: inline-block;
    transform: translateY(12px);
  }
  .nickname {
    margin-left: 5px;
    display: inline-block;
    transform: translateY(7px);
  }
  .badage-wrapper {
    margin-left: 0px;
    display: inline-block;
    transform: scale(0.55) translateY(0.3rem);
  }
  .dropdown-wrapper{
      display: inline-block;
      transform: translate(-0.5rem,0.3rem)
  }
}
</style>
