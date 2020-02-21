<template>
  <div class="resume-button-container" ref="resume" >
    <div class="resume-container" :class="{
    animated: true,
    bounceInRight: localVisibile,
    bounceOutRight: !localVisibile
  }" 
    v-show="visible"
  >
        <ReadMoreButton @click="handleClose" class="out-in-button">
          <i class="el-icon-s-unfold"></i>
        </ReadMoreButton>
    </div>
    <div class="button-container" v-if="!visible">
        <ReadMoreButton @click="handleOpen" class="out-in-button">
          <i class="el-icon-s-fold"></i>
        </ReadMoreButton>
    </div>

  </div>
</template>


<script>
import ReadMoreButton from '@/components/Buttons/ReadMoreButton'

export default {
  props:{
    visible:{
      default: true
    }
  },
    data(){
        return {
            localVisibile: true,
        }
    },
    methods:{
      handleClose(){
        this.localVisibile = false
        setTimeout(() => {
          this.$emit("update:visible", false)
        }, 1000);
      },
      handleOpen(){
        this.localVisibile = true
        this.$emit("update:visible", true)
        
      }
    },
    components:{
      ReadMoreButton
    }
}
</script>


<style lang="less">
.resume-container{
  width: 25vw;
  max-width: 500px;
  height: 100vh;
  background-color: rgba(255, 165, 0, 0.3);
}

.out-in-button{
    transition: all 1s;
    margin-top: 20px;
  }
</style>