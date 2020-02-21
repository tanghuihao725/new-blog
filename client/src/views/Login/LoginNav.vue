<template>
    <nav class="login-nav-container">
        <span class="nav-right">
            <span class="item home" @click="pagePush('/')">Home</span>
            <span class="item" @click="pagePush('/catagroies')">Catagroies</span>
            <span class="item" @click="pagePush('/about')" >About</span>
        </span>
    </nav>
</template>

<script>
export default {
    methods:{
        pagePush(url){
            this.$router.push(url)
        }
    }
}
</script>


<style lang="less">
.login-nav-container{
    display: flex;
    color: #fff;
    width: 100%;
    justify-content: flex-end;
    padding: 20px 0;

    .nav-right{
        .item{
            display: inline-block;
            font-size: 1.2rem;
            line-height: 2rem;
            height: 2rem;
            font-weight: lighter;
            padding: 0px 8px;
            cursor: pointer;
            margin: 0 15px;
            border: 1px solid rgba(0,0,0,0);
        }

        .home,
        .item:hover {
            border: 1px solid #fff;
            border-radius: 3px;
        }
    }

}
</style>