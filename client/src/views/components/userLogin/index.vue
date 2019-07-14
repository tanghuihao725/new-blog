<template>
  <el-dialog 
    :visible.sync="$store.state.user.showUserDialog"
    :width="baseInfo.isMobile? '95%' : '50%'"
    @open="handleOpen"
    >
    <!-- 登陆表单 -->
    <myLogin v-if="logintype==='login'"/>
  </el-dialog>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
import myLogin from './login.vue'

export default {
  data(){
      return {
      }
  },
  props: {
      logintype:{
          type:String,
          default: 'login'
      }
  },
  methods:{
      ...mapMutations('user',['setUserDialog']),
      handleOpen(){
          
      }
  },
  computed:{
      ...mapGetters(['baseInfo']),
      ...mapGetters('user/userManagement',['getEditorUserInfo'])
  },
  components:{
      myLogin,
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


