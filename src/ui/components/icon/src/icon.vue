<template>
  <i :class="[className, isMsg ? 'zmui-icon_msg' : '']"></i>
</template>

<script>
  export default {
    name: 'icon',
    props: {
      type: String,
      isMsg: Boolean
    },
    computed: {
      className () { // compatible with old type param
        return `zmui-icon zmui_icon_${this.type} zmui-icon-${this.type.replace(/_/g, '-')}`
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/icon/index';
</style>
