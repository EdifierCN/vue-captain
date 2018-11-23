<template>
  <div class="zmui-button-tab" :class="{'zmui-button-tab--animate': animate}">
    <slot></slot>
    <div ref="bar" class="zmui-button-tab-bar" :style="barStyle"></div>
  </div>
</template>

<script>
  import { parentMixin } from '../../../mixins/multi-items'

  export default {
    name: 'button-tab',
    mixins: [parentMixin],
    props: {
      animate: Boolean,
      height: Number,
      label: {
        type: String,
        default: 'label'
      }
    },
    data(){
      return {
        barStyle: {}
      }
    },
    watch:{
      currentIndex(val){
        const bar = this.$refs.bar;
        const curTab = this.$children[val].$el;
        bar.innerText = curTab.getAttribute(this.label);
        this.barStyle = {
          width: (curTab.offsetWidth || 0) + 'px',
          left: (curTab.offsetLeft || 0) + 'px',
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/base/fn';
  @import '../../../styles/utils/reddot.less';
  @import '../../../styles/utils/1px.less';

  .setLineWithoutRight(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 1px;
    border-left: 1px solid @c;
    border-top: 1px solid @c;
    border-bottom: 1px solid @c;
    color: @c;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
    z-index: 1;
  }

  .setLineWithoutLeft(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 1px;
    border-right: 1px solid @c;
    border-top: 1px solid @c;
    border-bottom: 1px solid @c;
    border-left: none;
    color: @c;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
    /* #2322 */
    z-index: 1;
  }

  .setLineMiddle(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 1px;
    border-right: 1px solid @c;
    border-top: 1px solid @c;
    border-bottom: 1px solid @c;
    border-left: none;
    color: @c;
    height: 200%;
    transform-origin: left top;
    transform: scale(0.5);
    z-index: 1;
  }

  .zmui-button-tab {
    -webkit-touch-callout: none;
    position: relative;
    & {
      display: flex;
    }

    & > a.zmui-button-tab-item-last {
      border-top-right-radius: @button-tab-border-radius * 2;
      border-bottom-right-radius: @button-tab-border-radius * 2;
      &:after {
        .setLineWithoutLeft(@button-tab-default-border-color);
        border-top-right-radius: @button-tab-border-radius * 2;
        border-bottom-right-radius: @button-tab-border-radius * 2;
      }
    }

    & > a.zmui-button-tab-item-first {
      border-top-left-radius: @button-tab-border-radius * 2;
      border-bottom-left-radius: @button-tab-border-radius * 2;
      &:after {
        .setLine(@button-tab-default-border-color);
        border-top-left-radius: @button-tab-border-radius * 2;
        border-bottom-left-radius: @button-tab-border-radius * 2;
      }
    }

    & > a.zmui-button-tab-item-middle {
      &:after {
        .setLineWithoutLeft(@button-tab-default-border-color);
      }
    }

    & > a  {
      &:after {
        background-clip: padding-box;
        box-sizing: border-box;
      }
      display: block;
      position: relative;
      flex: 1;
      width: 100%;
      height: @button-tab-height;
      padding: 0;
      font-size: 14px;
      line-height: @button-tab-line-height;
      text-align: center;
      color: @button-tab-default-text-color;
      white-space: nowrap;
      background: @button-tab-default-background-color;
      -webkit-tap-highlight-color: rgba(255,0,0,0);
    }

    & > a.zmui-button-tab-current {
      color: @button-tab-active-text-color;
      background: @button-tab-active-background-color;
    }

    & > a.zmui-button-tab-current:disabled,
    & > a:disabled {
      border-color: #CDCDCD;
      background: #e5e5e5;
      box-shadow: 0 1px 0 rgba(255,255,255,.6);
      text-shadow: 0 1px 0 rgba(255,255,255,.8);
      color: #aaa
    }

    &-bar{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #aaaaaa;
      color: #FFFFFF;
      border-radius: @button-tab-border-radius * 2;
      transition: all 0.08s;
      z-index: 1;
    }

    &--animate{
      & > a.zmui-button-tab-current{
        background: none;
      }
      & > a.zmui-button-tab-item-first {
        &:after {
          border-top: 1px #aaaaaa solid;
          border-bottom: 1px #aaaaaa solid;
          border-left: 1px #aaaaaa solid;
          border-right: none;
          border-top-left-radius: @button-tab-border-radius * 2;
          border-bottom-left-radius: @button-tab-border-radius * 2;
        }
      }
      & > a.zmui-button-tab-item-middle {
        &:after {
          border-top: 1px #aaaaaa solid;
          border-bottom: 1px #aaaaaa solid;
          border-left: none;
          border-right: none;
        }
      }
      & > a.zmui-button-tab-item-last {
        border-top-right-radius: @button-tab-border-radius * 2;
        border-bottom-right-radius: @button-tab-border-radius * 2;
        &:after {
          border-top: 1px #aaaaaa solid;
          border-bottom: 1px #aaaaaa solid;
          border-left: none;
          border-right: 1px #aaaaaa solid;
          border-top-right-radius: @button-tab-border-radius * 2;
          border-bottom-right-radius: @button-tab-border-radius * 2;
        }
      }
    }
  }

</style>
