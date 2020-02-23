<template>
    <span :class="{
        tag: true,
        chooseAble,
        isChoosen,
        borderLess
    }"
    :style="{
        color: tagData.color,
        border: `1px solid ${tagData.color}`,
        transform: `scale(${sizeTimes})`
    }"
    @click="handleClick"
    >

        <span class="tag-name">{{tagData.tagName || '默认标签'}}</span>
        <i class="el-icon-close" v-if="withDel" @click="handleDelete"></i>
    </span>
</template>

<script>
export default {
    props:{
        tagData:{
            default: () => ({
                id: 0,
                tagName: '默认标签',
                description: '',
                color: '#666666'
            })
        },
        withDel:{
            default: false
        },
        chooseAble:{
            default: false
        },
        isChoosen:{
            default: false
        },
        borderLess:{
            default: false
        },
        size:{
            default: 'normal'
        }        
    },
    computed:{
        sizeTimes(){
            switch(this.size){
                case 'normal':
                    return 0.9
                case 'small':
                    return 0.8
                case 'mini':
                    return 0.7
            }
        }
    },
    methods:{
        handleClick(){
            this.$emit('clicked', this.tagData)
        },
        handleDelete(){
            this.$emit('deleted')
        }
    }
}
</script>

<style lang="less" scoped>
.tag{
    display: inline-block;
    padding: 0.0625em 0.5em;
    border-radius: 0.625em;
    border: 0.0625em solid #000;
    font-size: 1em;
    font-weight: 350;
    transition: all 0.1s;
    line-height: 1.25em;
    height: 1.375em;
    .el-icon-close{
        margin-left: 0.125em;
        transition: transform 1s;
    }
}
.chooseAble{
    cursor: pointer;
}
.chooseAble:hover{
    border: 1px solid  rgb(32, 207, 32)!important;
    color: rgb(32,207,32)!important;
    // color: yellow!important;
}
.isChoosen{
    color: white!important;
    background-color: rgb(32, 207, 32);
    border: 0.0625em solid  rgb(32, 207, 32)!important;
}
.isChoosen:hover{
    color: yellow!important;
}

.borderLess,
.borderLess:hover{
    border: 1px solid rgba(0,0,0,0)!important
}


.el-icon-close:hover{
    transform: rotate(90deg)
}
</style>