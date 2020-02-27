<template>
    <div class="nav-container">
        <div class="logo-text">
            <logoText v-if="!logoHide"/>
            <div class="new-login-entrance">
                <userStatus v-if="!logoHide"/>
            </div>
        </div>
        <div class="nav-items" v-if="!baseInfo.isMobile">
            <navItems class="animated fadeInDown delay-1s"/>
        </div>
    </div>
</template>

<script>
import logoText from '@/components/LogoText'
import userStatus from '@/views/components/userStatus.vue'
import navItems from './navItems.vue'
import { mapGetters } from 'vuex'

export default {
    props:{
        logoHide:{
            default: false
        }
    },
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
    background-color: orange;

    width: 100%;
    height: 95px;

    .logo-text{
        margin-left: 3%;
        display: flex;
        align-items: flex-end;

        .new-login-entrance{
            margin-left: 15px;
        }
    }
    .user-status{
        margin-right: 3%;
    }

}
</style>