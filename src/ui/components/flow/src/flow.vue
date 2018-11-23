<template>
  <div class="zmui-flow" :class="{'zmui-flow_vertical': orientation ===
  'vertical'}">
    <div class="zmui-flow__bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flow',
    props: {
      orientation: {
        type: String,
        default: 'horizontal'
      }
    }
  }
</script>

<style lang="less">
  @bubbleCorlor:#ff8a00;
  .setBubbleCommon(@height,@backgroundColor,@fontSize,@color,@borderRadius) {
    height: @height;
    line-height: @height;
    background-color: @backgroundColor;
    font-size: @fontSize;
    color: @color;
    white-space: nowrap;
    padding: 0 6px;
    position: relative;
    border-radius: @borderRadius;
    &:after{
      content: '';
      display:inline-block;
      width:0;
      height:0;
      overflow:hidden;
      font-size:0;
      position: absolute;
    }
  }
  .setBubblePrivate(@direction, @backgroundColor) when (@direction = top) {
    &:after{
      border-color:@backgroundColor transparent transparent transparent;
      border-style:solid;
      border-width:5px 3px;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: -10px;
    }
  }
  .setBubblePrivate(@direction, @backgroundColor) when (@direction = bottom) {
    &:after{
      border-color: transparent transparent @backgroundColor transparent;
      border-style: dashed dashed solid dashed;
      border-width:5px 3px;
      left: 50%;
      transform: translate(-50%, 0);
      top: -10px;
    }
  }
  .setBubblePrivate(@direction, @backgroundColor) when (@direction = left) {
    &:after{
      border-color: transparent transparent transparent  @backgroundColor;
      border-style:solid;
      border-width: 3px 5px;
      top: 50%;
      transform: translate(0, -50%);
      right: -10px;
    }
  }
  .setBubblePrivate(@direction, @backgroundColor) when (@direction = right) {
    &:after{
      border-color: transparent @backgroundColor transparent transparent;
      border-style:solid;
      border-width: 3px 5px;
      top: 50%;
      transform: translate(0, -50%);
      left: -10px;
    }
  }
  .zmui-flow,
  .zmui-flow-auto{
    padding: 40px;
  }
  .zmui-flow__bd{
    display: flex;
    justify-content:space-between;
    align-items:center;
  }
  .zmui-flow__li{
    width: 14px;
    height: 14px;
    position: relative;
    z-index: 1;
    .zmui-flow__state{
      position: absolute;
      left: 0;
      top: 0;
      width: 14px;
      height: 14px;
      font-size: 10px;
      line-height: 14px;
      text-align: center;
      color: #FFF;
      border-radius: 7px;
      box-sizing: border-box;
    }
  }
  .zmui-flow__state{
    background-color: #E2E2E2;
    .zmui-flow__li_done &{
      background-color: #09bb07;
    }
  }
  [class^="zmui-flow__title-"],[class*=" zmui-flow__title-"]{
    position: absolute;
    color: #999999;
    font-size: 14px;
    font-weight: normal;
    white-space: nowrap;
    text-align: center;
  }
  .zmui-flow__title-top{
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    .zmui-flow__li_done &{
      color: #333;
    }
  }
  .zmui-flow__title-bottom{
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    .zmui-flow__li_done &{
      color: #333;
    }
  }
  .zmui-flow__title-left{
    right: 30px;
    top: 50%;
    transform: translate(0, -50%);
    .zmui-flow__li_done &{
      color: #333;
    }
    text-align: right;
  }
  .zmui-flow__title-right{
    left: 30px;
    top: 50%;
    transform: translate(0, -50%);
    text-align: left;
    .zmui-flow__li_done &{
      color: #333;
    }
  }
  [class^="zmui-flow__intro-"],[class*=" zmui-flow__intro-"]{
    .setBubbleCommon(20px,@bubbleCorlor,10px,#FFF,4px);
  }
  .zmui-flow__intro-top{
    bottom: 25px;
    left: 50%;
    transform: translate(-50%, 0);
    .setBubblePrivate(top,@bubbleCorlor);
    position: absolute;
  }
  .zmui-flow__intro-bottom{
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0);
    .setBubblePrivate(bottom,@bubbleCorlor);
    position: absolute;
  }
  .zmui-flow__intro-right{
    left: 36px;
    top: 50%;
    transform: translate(0, -50%);
    .setBubblePrivate(right,@bubbleCorlor);
    position: absolute;
  }
  .zmui-flow__intro-left{
    right: 36px;
    top: 50%;
    transform: translate(0, -50%);
    .setBubblePrivate(left,@bubbleCorlor);
    position: absolute;
  }

  [class^="zmui-flow__info-"]{
    .setBubbleCommon(14px,#09bb07,10px,#FFF,2px);
    position: absolute;
    .zmui-flow__line_ing &{
      display: block;
    }
  }
  .zmui-flow__info-top{
    display: none;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 11px;
    .zmui-flow__line_ing &{
      display: block;
    }
    .setBubblePrivate(top,#09bb07);
  }
  .zmui-flow__info-bottom{
    display: none;
    left: 50%;
    transform: translate(-50%, 0);
    top: 11px;
    .zmui-flow__line_ing &{
      display: block;
    }
    .setBubblePrivate(bottom,#09bb07);
  }
  .zmui-flow__info-left{
    display: none;
    top: 50%;
    transform: translate(0, -50%);
    right: 12px;
    .zmui-flow__line_ing &{
      display: block;
    }
    .setBubblePrivate(left,#09bb07);
  }
  .zmui-flow__info-right{
    display: none;
    top: 50%;
    transform: translate(0, -50%);
    left: 12px;
    .zmui-flow__line_ing &{
      display: block;
    }
    .setBubblePrivate(right,#09bb07);
  }
  .zmui-flow__line{
    flex:1;
    background-color: #E2E2E2;
    height: 3px;
    position: relative;
  }
  .zmui-flow__title{
    color: #999999;
    font-size: 14px;
    font-weight: normal;
  }
  .zmui-flow__info{
    color: #999999;
    font-size: 12px;
  }
  .zmui-flow__process{
    display: none;
    background-color: #09bb07;
    height: 3px;
    position: relative;
    .zmui-flow__line_ing &{
      display: block;
      width: 50%;
    }
    .zmui-flow__line_done &{
      display: block;
    }
  }
  .zmui-flow_custom{
    .zmui-flow__bd{
      justify-content:flex-start;
    }
    .zmui-flow__line{
      flex:none;
      width: 100px;
    }
  }
  .zmui-flow_vertical{
    .zmui-flow__bd{
      flex-direction:column;
      height: 100%;
      box-sizing: border-box;
    }
    .zmui-flow__line{
      height: auto;
      width: 3px;
    }
    .zmui-flow__line_ing{
      .zmui-flow__process{
        height: 50%;
      }
    }
    .zmui-flow__process{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
    }
    .zmui-flow__line_done{
      .zmui-flow__process{
        height: 100%;
      }
    }
  }

  .zmui-flow_vertical-custom{
    .zmui-flow__bd{
      flex-direction:column;
      height: 100%;
      box-sizing: border-box;
    }
    .zmui-flow__line{
      width: 3px;
      flex:none;
    }
    .zmui-flow__line_ing{
      .zmui-flow__process{
        height: 50%;
      }
    }
    .zmui-flow__process{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
    }
    .zmui-flow__line_done{
      .zmui-flow__process{
        height: 100%;
      }
    }
  }
  .zmui-flow-auto{
    position: relative;
  }
  .zmui-flow-auto__bd{
    position: relative;
  }
  .zmui-flow-auto__state{
    position: absolute;
    left: 0;
    top: 4px;
    width: 14px;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #FFF;
    border-radius: 7px;
    background-color: #E2E2E2;
    z-index: 2;
  }
  .zmui-flow-auto__state_on{
    background-color: #09bb07;
  }
  .zmui-flow-auto__line{
    position: absolute;
    z-index: 1;
    width: 2px;
    background-color: #dddddd;
    top: 10px;
    bottom: -4px;
    left: 6px;
    z-index: 1;
  }
  .zmui-flow-auto__line_on{
    background-color: #09bb07;
  }
  .zmui-flow-auto__li{
    position: relative;
    padding-bottom: 20px;
    padding-left: 30px;
  }
  .zmui-flow-auto__title{
    color: #999999;
    font-size: 14px;
    font-weight: normal;
  }
  .zmui-flow-auto__info{
    color: #999999;
    font-size: 12px;
  }
</style>
