<template>
    <img class="zmui-emotion" :src="require('./face/'+ index +'.png')" :alt="`[em_${index}]`" width="23px" height="23px" style="margin: 0 3px;">
</template>

<script>
  export default{
    name: 'emotion'
  }
</script>

<style lang="less">
  .zmui-emotion{
    vertical-align: -3px;
  }
</style>
