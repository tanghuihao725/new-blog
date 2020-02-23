<template>
    <!-- 登陆/注册 路由 -->
  <el-dialog 
    :visible.sync="visible"
    :width="baseInfo.isMobile? '80%' : '50%'"
    @open="handleOpen"
    :before-close="doCloseDialog"
    >
    <!-- 普通登陆表单 -->
    <myLogin v-if="localType==='login'" @closeDialog="doCloseDialog"/>
    <!-- 普通注册表单 -->
    <myRegister v-if="localType==='register'" @closeDialog="doCloseDialog"/>

    <!-- 提示注册/登陆按钮 -->
    <el-button type="text" v-if="localType!=='register'" @click="localType = 'register'">没有账号？立即注册</el-button>
    <el-button type="text" v-if="localType!=='login'" @click="localType = 'login'">直接登陆</el-button>
  </el-dialog>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
import myLogin from './login.vue'
import myRegister from './register'

export default {
  data(){
      return {
          localType: "",
      }
  },
  props: {
      logintype: {
          type:String,
          default: 'login'
      },
      visible: {
          type: Boolean,
          default: false
      }
  },
  methods:{
      /**
       * dialog打开时 触发事件
       */
      handleOpen(){
        // 画面将展示默认界面(父级传的prop值)
        this.localType = this.logintype 
      },
        // 关闭dialog
      doCloseDialog(){
          this.$emit('update:visible',false)
      }
  },
  computed:{
      ...mapGetters(['baseInfo'])
  },
  watch:{
      visibile(val){
          this.$emit('update:visible',val)
      }
  },
  components:{
      myLogin,myRegister
  }
};
</script>

<style lang="less" scoped>
    .dialog-content{
        position:relative;
    }
</style>


<style lang="less">
    
</style>


