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
            this.$emit('deleted', this.tagData)
        }
    }
}
</script>

<style lang="less" scoped>
.tag{
    display: inline-block;
    padding: 1px 8px;
    border-radius: 10px;
    border: 1px solid #000;
    font-size: 1rem;
    font-weight: 350;
    transition: all 0.1s;
    line-height: 20px;

    .el-icon-close{
        margin-left: 2px;
        transition: transform 1s;
    }
}
.chooseAble{
    cursor: pointer;
}
.chooseAble:hover,
.isChoosen{
    color: rgb(32, 207, 32)!important;
    border: 1px solid  rgb(32, 207, 32)!important;
}

.borderLess,
.borderLess:hover{
    border: 1px solid rgba(0,0,0,0)!important
}


.el-icon-close:hover{
    transform: rotate(90deg)
}
</style>