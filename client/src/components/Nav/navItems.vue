<template>
    <div class="nav-items-wrapper">
        <router-link 
        class="items-wrapper" 
        v-for="item in commonItems" 
        :key="item.id"
        :to="item.router">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
        </router-link>

        <router-link 
        class="items-wrapper" 
        v-for="item in authItems" 
        :key="item.id"
        :to="item.router">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
        </router-link>
    </div>
</template>

<script>
import navItemsList from './navItems.js'
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters('user',['userCurrent']),
        commonItems(){
            return navItemsList.filter(item => item.authority === 1)
        },
        authItems(){
            if(!this.userCurrent || this.userCurrent.authority === 1){
                return []
            }else{
                return navItemsList.filter(item => item.authority > 1)
            }            
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
.nav-items-wrapper{
    display: flex;
    a{
        text-decoration: none;
        color: #666;
        font-size: 0.8rem;
    }

    .items-wrapper{
        display: flex;
        margin: 0 20px;

        i{
            line-height: 1.4rem;
            margin-right: 0.3rem;
        }
    }

    .items-wrapper:hover{
        color: #f40;
    }
}
</style>