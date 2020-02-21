<template>
    <div class="login-button-wrapper" @click="handleClick">
            <slot/>
    </div>
</template>

<script>
export default {
    methods:{
        handleClick(){
            this.$emit('click')
        }
    }
        
}
</script>

<style lang="less">
.login-button-wrapper{
    display: inline-block;
    padding: 3px 18px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #f40;
    border-radius: 4px;
    cursor: pointer;
}
.login-button-wrapper:hover{
    background-color: rgba(255, 64, 0, 0.5)
}
</style>

