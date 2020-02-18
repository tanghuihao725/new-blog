<template>
    <div class="logo-text-container" @click="handleClick">
        <div class="logo">
            <img class="logo-img" src="../assets/logo.png">
        </div>
        <div class="text">
            <!-- 入场动画 -->
            <transition name="upLine">   
                <span class="up-line" v-show="itemShow"></span>
            </transition>
            <span class="text-content">THH's BLOG</span>
            <!-- 入场动画 -->
            <transition name="bottomLine">
                <span class="bottom-line" v-show="itemShow"></span>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            itemShow: false
        }
    },
    mounted(){
        this.itemShow = true;
    },
    methods:{
        handleClick(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
@baseColor: #000;

.logo-text-container{
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    height: 38px;
    color: @baseColor;

    .logo{
        width: 40px;
        height: 35px;
        .logo-img{
            width: 100%;
            height: 100%;
        }
    }

    .text{
        display: flex;
        flex-direction: column;
        height:35px;
        justify-content: space-between;
        font-size: 1.1rem;

        .up-line, .bottom-line{
            width: 6.4rem;
            border-top: 2px solid @baseColor;
            transition: all 1s;
        }
        .text-content{
            cursor: pointer;
        }
    }  
}

.logo-text-container:hover{
    .up-line{
        transform: translateX(3rem);
        opacity: 0;
    }
    .bottom-line{
        transform: translateX(-3rem);
        opacity: 0;
    }
    .text-content{
        // color: #666;
        font-size: 1.11rem;
    }

}
/*
*动画部分 
*/
.upLine-enter{
    opacity: 0;
    transform: translateX(3rem);
}
.bottomLine-enter{
    opacity: 0;
    transform: translateX(-3rem);
}

</style>