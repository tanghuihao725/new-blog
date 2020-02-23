<template>
  <div id="app">
    <nav>
      <navbar id="mynav" v-show="true" v-if="!routeLogin"/>
    </nav>
    <transition name='nav2'>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import navbar from '@/components/Nav'
export default {
  data(){
    return {
      animationShow: false
    }
  },
  mounted(){
    // 根据localStorage的值获取用户信息
    this.initCurrent()
    // 开始入场动画
    this.animationShow = true
  },
  computed:{
    ...mapGetters('user',['getUserDialogStatu']),
    routeLogin(){
      return this.$route.path.indexOf('login') >= 0
    }
  },
  methods:{
    ...mapMutations('user',['setUserDialog']),
    ...mapActions('user',['initCurrent'])
  },
  components:{
    navbar
  }
}
</script>


<style lang="less">
.nav-enter,
.nav-leave-to{
  opacity: 0;
  transform: translateX(550px)
}
.nav-enter-active,
.nav-leave-active{
  transition: all 3.8s ease;
}
</style>


<style lang="less">
// 全局样式
body{
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  overflow-x: hidden;

}
/**全局input框 */
// .el-input{
//   border: 1.5px solid #666;
//    border-radius: 0;
//    padding: 0 2px;
// }
// .el-input__inner:hover,
// .el-input.is-active .el-input__inner, 
// .el-input__inner:focus{
//     border: none;
//     outline: none;
// }
// .el-input__inner {
//     border: none!important;
//     height: 38px!important;
//     line-height: 38px!important;
//     width: 99%!important;
//     outline: none!important;
// }

</style>



