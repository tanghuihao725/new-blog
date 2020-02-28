<template>
    <div class="login-container">
        <div class="mask"></div>
        <myNav class="my-nav animated fadeInDown" :logoHide="true" :nowAt="5"/>
        <div class="content-wrapper">
            <div class="content-body">
                <div class="body-left animated fadeInLeft" v-if="!isMobile">
                    <p class="sub-title">Welcome to THH's Blog</p>
                    <h2 class="welcome-words">皓月清凉，你是人间曙光。</h2>
                </div>
                <div class="body-right animated fadeInRight" :style="{ width: isMobile ? '100%' : '30%'}">
                    <loginer />
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import myNav from '@/components/Nav/navTop'
import loginer from './Loginer'
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters(['baseInfo']),
        isMobile(){
            return this.baseInfo.isMobile
        }
    },
    components:{
        loginer,myNav
    }
}
</script>

<style lang="less">
.login-container{
    width: 100vw;
    margin: 0 auto;
    height: 100vh;
    background: url(../../assets/img/common/geernika.jpg);
    background-size: 100% 100%;

    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
        z-index: 0;
    }

    .content-wrapper{
        margin: 0 auto;
        width: 80%;
        height: 100%;
        z-index: 1;

        .my-nav{
            animation-delay: 0.5s;
            background-color: transparent;
        }

        .content-body{
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            height: 60%;
            padding: 80px 0;

            .body-left{
                color: #fff;
                align-self: center;
                animation-delay: 0s;
                .sub-title {
                    font-size: 1.2rem;
                    font-weight: 200;
                    animation: my-spark 2s infinite alternate;
                }
                .welcome-words{
                    font-size: 2.5rem;
                    font-weight: 200;
                    animation: my-spark 3.5s infinite alternate;
                }
            }
            .body-right{
                animation-duration: 0.3;
                animation-delay: 0.2s;
            }
        }   
    }
}

.rootMobile{
    .login-container{
        background-size: auto 100%;
        background-position: -30%;
    }
}
</style>