<template>
  <div class="zmui-tabbar">
    <slot></slot>
  </div>
</template>

<script>
  import { parentMixin } from '../../../mixins/multi-items'

  export default {
    mounted () {
      if (process.env.NODE_ENV === 'development') {
        this.$nextTick(() => {
          const $el = this.$el
          const position = window.getComputedStyle($el).position;
          if (position === 'fixed') {
            return
          } else if (position === 'absolute') {
            if (document.documentElement.offsetHeight !== window.innerHeight) {

            }
          }
        })
      }
    },
    name: 'tabbar',
    mixins: [parentMixin],
    props: {
      iconClass: String
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/tabbar/index.less';
  @import '../../../styles/utils/reddot.less';

  .zmui-tabbar__icon {
    position: relative;
  }
  .zmui-tabbar__icon > sup {
    position: absolute;
    top: -8px;
    left: 100%;
    transform: translateX(-50%);
    z-index: 101;
  }
  .zmui-tabbar__item.vux-tabbar-simple {
    padding: 0;
    height: 50px;
    line-height: 50px;
  }
  .zmui-tabbar-simple .zmui-tabbar__label {
    font-size: 14px;
    line-height: 50px;
  }
</style>
