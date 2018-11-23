<template>
  <div class="zmui-swipeout">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'swipeout'
  }
</script>

<style lang="less">
  @import '../../../styles/utils/1px.less';
  @import '../../../styles/base/fn.less';

  .zmui-swipeout {
    width: 100%;
    overflow: hidden;
  }
  .zmui-swipeout-item {
    position: relative;
  }
  .zmui-swipeout-button-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
    text-align: right;
  }
  .zmui-swipeout-button-box-left {
    text-align: left;
  }
  .zmui-swipeout-button-box > div {
    height: 100%;
  }
  .zmui-swipeout-button {
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: @swipeout-button-font-color;
    border: none;
  }
  .zmui-swipeout-content {
    position: relative;
    background: @swipeout-content-bg-color;
  }
  .zmui-swipeout-content.zmui-swipeout-content-animated {
    transition: transform 0.2s;
  }
  .zmui-swipeout-button-primary {
    background-color: @swipeout-button-primary-bg-color;
  }
  .zmui-swipeout-button-warn {
    background-color: @swipeout-button-warn-bg-color;
  }
  .zmui-swipeout-button-default {
    background-color: @swipeout-button-default-bg-color;
  }
</style>
