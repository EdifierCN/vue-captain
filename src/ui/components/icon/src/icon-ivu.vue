<template>
  <i :class="classes" :style="styles"></i>
</template>
<script>
  const prefixCls = 'ivu-icon';

  export default {
    name: 'icon-ivu',
    props: {
      type: String,
      size: [Number, String],
      color: String
    },
    computed: {
      classes () {
        return `${prefixCls} ${prefixCls}-${this.type}`;
      },
      styles () {
        let style = {};

        if (this.size) {
          style['font-size'] = `${this.size}px`;
        }

        if (this.color) {
          style.color = this.color;
        }

        return style;
      }
    }
  };
</script>

<style lang="less">
  @import '../../../styles/iconfont/ionicons.less';
</style>
