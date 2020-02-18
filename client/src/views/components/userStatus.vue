<template>
  <div>
    <!-- 用户状态显示 未登录：请登陆  已登陆：用户名 权限 -->
    <div class="status-wrapper" >
      <!-- <p>{{userCurrent}}</p> -->

      <!-- 已登陆 -->
      <div class="is-login" v-if="isLogin" trigger="click">
        <!-- 头像显示 -->
        <div class="avatar-wrapper" @click="editDialogVisbile=true">
          <!-- <el-avatar size="small" shape="square" :src="getAvatar" /> -->
          <el-avatar size="medium" shape="square" :src="getAvatar" />
        </div>
        <!-- 用户名 -->
        <p class="nickname" v-if="!simplify">{{userCurrent.nickname||userCurrent.telephone}}</p>
        <!-- 权限徽章 small -->
        <div class="badage-wrapper" v-if="userCurrent.authority!==1 && !simplify">
          <authBadage :authority="userCurrent.authority" short />
        </div>

        <!-- 下拉菜单 -->
        <div class="dropdown-wrapper">
          <el-dropdown size="small" placement="bottom-start" @command="handleCommand">
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span style="color:red">注销</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-button type="text" class="not-login" v-else @click="loginPanelVisible=true">请登陆LogIn</el-button>
    </div>

    <loginPanel :visible.sync="loginPanelVisible" loginType="login" />
    <editDialog :visible.sync="editDialogVisbile" from="selfEditor" :defaultData="userCurrent"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import authBadage from "../common/authBadage.vue";
import loginPanel from "./userLogin/index.vue";
import editDialog from "./editDialog.vue";
import { avatarDefault } from '../../utils/common/user'

export default {
  props:{
    // 是否简化，只显示头像和菜单
    simplify:{
      default: false
    }
  },
  data() {
    return {
      loginPanelVisible: false,
      editDialogVisbile: false
    };
  },
  computed: {
    ...mapGetters("user", ["userCurrent", "isLogin"]),
    /**
     * 用户是否有头像，如果没有传入默认头像，返回值默认头像的静态地址
     */
    getAvatar(){
      if(Object.keys(this.userCurrent).length===0) return avatarDefault(2)
      if(this.userCurrent.avator.length>0){
        return this.userCurrent.avator
      }else{
        return avatarDefault(this.userCurrent.sex)
      }
    }
  },
  methods: {
    ...mapMutations("user", ["setUserCurrent", "setUserDialog"]),
    /**
     * 用户登出操作
     */
    handleLogOut() {
      // 将store里的current信息删除
      this.setUserCurrent({});
      // 删除 blogToken
      if (localStorage && localStorage.blogToken) delete localStorage.blogToken;
    },
    /**
     * 对下拉菜单的各个选项进行switch操作
     */
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.handleLogOut();
          break;
        case "info":
          this.editDialogVisbile = true;
          break;
      }
    }
  },
  components: {
    authBadage,
    loginPanel,
    editDialog
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
  .dropdown-wrapper {
    display: inline-block;
    transform: translate(0rem, 0.3rem);
  }
}
</style>
