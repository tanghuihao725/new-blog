<template>
    <span :class="{
        album: true,
        chooseAble,
        isChoosen
    }"
    :style="{
        color: albumData.color,
        border: `2px solid ${albumData.color}`,
        transform: `scale(${sizeTimes})`
    }"
    @click="handleClick"
    >
        <i :class="albumData.icon || 'el-icon-folder'"></i>
        <span class="album-name">{{albumData.albumName || '默认专辑'}}</span>
        <i class="el-icon-lock" v-if="albumData.hide"></i>
        <i class="el-icon-close-notification" v-if="!albumData.hide && albumData.notPush"></i>
        <i class="el-icon-close" v-if="withDel" @click="handleDelete"></i>        
    </span>
</template>

<script>
export default {
    props:{
        albumData:{
            default: () => ({
                id: 0,
                albumName: '默认专辑',
                description: '',
                color: '#6f93bd',
                icon: 'el-icon-folder',
                notPush: 0,
                hide: 0,
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
            this.$emit('clicked', this.albumData)
        },
        handleDelete(){
            this.$emit('deleted', this.albumData)
        }
    }
}
</script>

<style lang="less" scoped>
.album{
    display: inline-block;
    padding: 0.063em 0.5em;
    border-radius: 0.625em;
    border: 0.125em solid #000;
    font-size: 1em;
    line-height: 1.25em;
    height: 1.31em;
    font-weight: 350;
    transition: all 0.1s;

    i:first-child{
        margin-right: 0.625em;
    }

    .el-icon-close{
        margin-left: 0.13em;
        transition: transform 1s;
    }
    .el-icon-close-notification{
        color: orange;
        margin: 0 0.32em;
    }
    .el-icon-lock{
        color: #f40;
        margin: 0 0.32em;
    }
}
.chooseAble{
    cursor: pointer;
}
.chooseAble:hover,
.isChoosen{
    color: rgb(32, 207, 32)!important;
    border: 2px solid  rgb(32, 207, 32)!important;
}

.el-icon-close:hover{
    transform: rotate(90deg)
}
</style>