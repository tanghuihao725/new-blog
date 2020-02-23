<template>
    <div :class="myclass">
        <i :class="getIcon"></i> <span v-if="!short">{{getName}}</span>
    </div>
</template>

<script>
import { authorityName } from '../../utils/common/user'

export default {
    data(){
        return {
        }
    },
    props:{
        authority:{
            type:Number,
            required: true
        },
        short:{
            type: Boolean,
            default: false
        }
    },
    computed: {
      getName(){
          return authorityName(this.authority).name
      },
      getIcon(){
          return authorityName(this.authority).icon
      },
      myclass(){
          return {
              badageWrapper:true,
              short: this.short,
              superManager: this.authority===6,
              manager:this.authority===5,
              user:this.authority ===1,
          }
      }
    }
}
</script>

<style lang="less" scoped>
.badageWrapper{
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    height: 2.2rem;
    line-height: 2.2rem;
    border-radius: 4px;
    font-size: 0.9rem;
    padding: 0 0.5rem;
    i{
      padding: 0.2rem;
      font-size: 1rem;
    }
}

.user{
    background:blue;
    color: #fff;
    
    i{
        color: yellow;
        font-weight: bolder;
    }   
}
.superManager{
    background:#000;
    color:#fff;
    i{
        color: gold;   
    }
}
.manager{
    background: red;
    color: #fff;
    i{
        color:#fff;
    }
}

.short{
    i{
        transform: scale(1.7)
    }
}
</style>


