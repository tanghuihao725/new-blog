<template>
  <div id="app">
    <nav>
      <navbar id="mynav"/>
    </nav>
    <userDialog/>
    <transition name='nav2'>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userDialog from './views/components/userLogin/index.vue'
import userStatus from './views/components/userStatus.vue'
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
    ...mapGetters('user',['getUserDialogStatu'])
  },
  methods:{
    ...mapMutations('user',['setUserDialog']),
    ...mapActions('user',['initCurrent'])
  },
  components:{
    userDialog,userStatus,navbar
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

<style>
body{
  margin: 0;
  padding: 0;
}
</style>



