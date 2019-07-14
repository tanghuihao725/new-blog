<template>
  <div id="app">
    <div id="nav">
      <userStatus/>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About{{$store.state.isMobile?"Phone":"PC"}}</router-link>|
      <router-link to="/users">用户管理</router-link>
    </div>
    <userDialog/>
    <button @click="setUserDialog(true)">open</button>
    {{$store.state.user.showUserDialog}}
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userDialog from './views/components/userLogin/index.vue'
import userStatus from './views/components/userStatus.vue'
export default {
  mounted(){
    // 根据localStorage的值获取用户信息
    this.initCurrent()
  },
  computed:{
    ...mapGetters('user',['getUserDialogStatu'])
  },
  methods:{
    ...mapMutations('user',['setUserDialog']),
    ...mapActions('user',['initCurrent'])
  },
  components:{
    userDialog,userStatus
  }
}
</script>


<style lang="less">

</style>



