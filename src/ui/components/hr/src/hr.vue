<template>
  <p class="zmui-hr"></p>
</template>

<script>
  export default {
    name: 'hr-line'
  }
</script>

<style lang="less">
  @import '../../../styles/base/fn';

  .zmui-hr {
    padding-top: 15px;
    margin-bottom: 15px;
    position: relative;
    &:before {
      .setBottomLine()
    }
  }
</style>
