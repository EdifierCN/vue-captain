<template>
  <div class="zmui-loadmore zmui-loadmore" :class="{'zmui-loadmore_line':!showLoading, 'zmui-loadmore_dot': !showLoading && !tip}">
    <i class="zmui-loading" v-if="showLoading"></i>
    <span class="zmui-loadmore__tips" v-show="tip || !showLoading">{{tip}}</span>
  </div>
</template>

<script>
  export default {
    name: 'load-more',
    props: {
      showLoading: {
        type: Boolean,
        default: true
      },
      tip: String
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/loading/index.less';
  @import '../../../styles/widget/loadmore/index.less';

  .zmui-loadmore{

    &.zmui-loadmore_line{
      display: flex;
      border-top: 0;

      &:before, &:after{
        position: relative;
        top: -1px;
        flex: 1;
        content: '';
        border-top: 1px solid @zmuiLineColorLight;
      }

    }
  }
</style>
