<template>
    <div class="post-title">
        <h1><slot/></h1>
      <div class="decoration"></div><div class="decoration"></div><div class="decoration"></div>
    </div>
</template>

<script>
export default {
    props:{
        height: {
            default: '2em'
        }
    }
}
</script>

<style lang="less" scoped>
.post-title{
    font-size: 12px;
    position:relative;
    text-align: center;
    margin: 1em auto;
    color: #f20;
    background-color: orange;
    padding: 0.2em 0;
    text-shadow: 0px 0px 3px orange;
    font-size: 1.5em;
    overflow: hidden;
    h1{
        margin: 0;
        font-size: 1.3em;
    }

    .decoration{
      position: absolute;
      width: 0.4em;
      height: 300%;
      background-color: #fff;
      top: -100%;
      left: 1em;
      transform: rotate(45deg)
    }
    .decoration:nth-child(2){
      left: 2em;
    }
    .decoration:nth-child(3){
      left: 3em;
    }
  }
</style>