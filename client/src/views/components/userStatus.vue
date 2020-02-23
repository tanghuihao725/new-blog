<template>
  <div>
    <!-- 用户状态显示 未登录：请登陆  已登陆：用户名 权限 -->
    <div class="status-wrapper" >
      <!-- 已登陆 -->
      <div class="is-login" v-if="isLogin" trigger="click">
        <!-- 下拉菜单 -->
        <div class="dropdown-wrapper">
          <el-dropdown size="small" @command="handleCommand">
            <span :class="nicknameConfigs.classes">
              <span class="prefix">{{nicknameConfigs.prefix}}</span>
              {{userCurrent.nickname || userCurrent.telephone}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span style="color:red">注销</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- <el-button type="default" class="not-log-in" @click="handleLoginClick" size="mini" v-if="!isLogin">
        <i class="el-icon-user-solid"></i>Log In
      </el-button> -->
    </div>
    <editDialog :visible.sync="editDialogVisbile" from="selfEditor" :defaultData="userCurrent"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import editDialog from "./editDialog.vue";

export default {
  data() {
    return {
      editDialogVisbile: false
    };
  },
  computed: {
    ...mapGetters("user", ["userCurrent", "isLogin"]),
    nicknameConfigs(){
      const classes = { nickname: true }
      let prefix = "Hello, "
      if(this.isLogin){
        switch(this.userCurrent.authority){
          case 6:
            classes.superManager = true
            prefix += "Super Manager,"
            break;
          case 5:
            classes.manager = true
            prefix += "Manager,"
            break;
        }
      }
      return { classes, prefix } 
    }
  },
  methods: {
    ...mapMutations("user", ["setUserCurrent"]),
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
     * 用户登陆
     */
    handleLoginClick(){
      this.$router.push("/login")
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
    editDialog
  }
};
</script>

<style lang="less" scoped>
.status-wrapper {
    .nickname{
      margin-right: 5px;
      cursor: pointer;
      color: #fff;
    }
    .nickname:hover{
      color: black;
    }
    .superManager {
      color: #fff;
    }
    .manager {
      color: blue;
    }
    .not-log-in{
      transform: scale(0.8);
      // color: #000;

      .el-icon-user-solid{
        margin-right: 5px;
      }
    }
 
}
</style>
