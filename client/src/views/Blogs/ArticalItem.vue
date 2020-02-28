<template>
<div class="artical-item-container" @click="handleSelfClicked">
    <li class="first-line">
        <span class="title">{{articalData.title}}</span>
        <span class="date">{{postDate}}</span>
        <span class="top-list tip" v-if="articalData.orderFactor <= 10">
            <span>置</span> 
            <span>顶</span>
        </span>
        <span class="new-post tip" v-if="isNew">
            <span>n</span>
            <span>e</span>
            <span>w</span>
        </span>
    </li>
</div>
</template>


<script>
export default {
    props:{
        articalData:{
            default: ()=>({
                title: "",
                updatedAt: "",
                orderFactor: 50
            })
        }
    },
    computed:{
        postDate(){
            return this.articalData.createdAt.split(' ')[0].replace(/-/g, '/')
        },
        isNew(){
            const time = new Date().getTime()
            const postTime = new Date(this.postDate)
            // return (time - postTime) / 1000 / 3600
            if((time - postTime)/1000 <= 3 * 30 * 24 * 3600){
                return true
            }
            return false
        }
    },
    methods:{
        handleSelfClicked(){
            this.$emit('click')
        }
    }

}
</script>


<style lang="less" scoped>
.artical-item-container{
    width: 100%;
    font-size: 16px;
    margin-bottom: 1.2em;
    padding-left: 1em;
    cursor: pointer;
    color: #ac4142;

    .first-line{
        list-style-type: none;
        .title{
            font-size: 1.3em;
            font-weight: 300;
        }
        .tip{
             line-height: 1.5em;
             margin-left: 1em;
             span{
                display: inline-block;
                // animation: tips-running 2s infinite;
                margin-right: 0.1em;
             }
             span:nth-child(2){
                 animation-delay: 0.5s;
             }
             span:nth-child(3){
                 animation-delay: 1s;
             }
        }
        .top-list{
            color: red;
        }
        .new-post{
            color: #4f0;
        }
        .title::before{
            content:'';
            display: inline-block;
            width: 0.3em;
            height: 0.3em;
            margin-right: 0.5em;
            background-color: #ac4143;
            line-height: 1.5em;
            // border-radius: 50%;
        }
        .date{
            font-size: 1.3em;
            color: #666;
            margin-left: 0.5em;
        }
    }
}
.artical-item-container:hover{
    color: #000;
    .date{
        color: #000
    }
}
</style>


<style lang="less" scoped>
.rootMobile{
    .artical-item-container{
        font-size: 12px;
        margin-bottom: 2em;
    }
}
</style>

<style lang="less">
@keyframes tips-running {
    0%{
        transform: translateY(0em);
    }
    50%{
        transform: translateY(-0.5em) scale(1.2)
    }
    100%{
        transform: translateY(0em);
    }
}

</style>