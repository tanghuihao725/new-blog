<template>
    <div class="nav-container">
        <div class="logo-text">
            <logoText />
        </div>
        
        
        <div class="nav-items" v-if="!baseInfo.isMobile">
            <navItems />
        </div>

        <div class="user-status">
            <userStatus :simplify="baseInfo.isMobile"/>
        </div>
    </div>
</template>

<script>
import logoText from '@/components/LogoText'
import userStatus from '@/views/components/userStatus.vue'
import navItems from './navItems.vue'
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters(['baseInfo'])
    },
    components:{
        logoText, userStatus, navItems
    }
    
}
</script>

<style lang="less" scoped>
.nav-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #eee;

    width: 100%;
    height: 95px;

    .logo-text{
        margin-left: 3%;
    }
    .user-status{
        margin-right: 3%;
    }

}
</style>