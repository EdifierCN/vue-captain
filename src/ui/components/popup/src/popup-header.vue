<template>
  <div class="zmui-popup-header" :class="showBottomBorder ? 'zmui-1px-b' : ''">
    <div class="zmui-popup-header-left" @click="$emit('on-click-left')">
      <slot name="left-text">{{ leftText || '取消' }}</slot>
    </div>
    <div class="zmui-popup-header-title">
      <slot name="title">{{ title || '' }}</slot>
    </div>
    <div class="zmui-popup-header-right" @click="$emit('on-click-right')">
      <slot name="right-text">{{ rightText || '确定' }}</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'popup-header',
    props: {
      leftText: String,
      rightText: String,
      title: String,
      showBottomBorder: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/popup/header";
</style>
