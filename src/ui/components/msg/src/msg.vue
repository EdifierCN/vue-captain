<template>
  <div class="zmui-msg">
    <div class="zmui-msg__icon-area"><i class="zmui-icon_msg" :class="`zmui-icon-${icon || 'success'}`"></i></div>
    <div class="zmui-msg__text-area">
      <h2 class="zmui-msg__title" v-html="title"></h2>
      <p class="zmui-msg__desc">
        <slot name="description"></slot>
      </p>
      <p class="zmui-msg__desc" v-if="description" v-html="description"></p>
    </div>
    <div class="zmui-msg__opr-area">
      <p class="zmui-btn-area">
        <slot name="buttons"></slot>
        <a v-for="button in buttons" href="javascript:;" class="zmui-btn" :class="`zmui-btn_${button.type}`" @click="onClick(button.onClick, button.link)">{{button.text}}</a>
      </p>
    </div>
  </div>
</template>

<script>
  import { go } from '../../../libs/router'

  export default {
    name: 'msg',
    props: ['icon', 'title', 'description', 'buttons'],
    methods: {
      onClick (handler, link) {
        typeof handler === 'function' && handler();
        link && go(link, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import "../../../styles/base/fn";
  @import '../../../styles/icon/icon_font.less';
  @import '../../../styles/widget/button/index.less';

  .zmui-msg {
    padding-top: @zmuiMsgPaddingTop;
    text-align: center;
  }
  .zmui-msg__icon-area {
    margin-bottom: @zmuiMsgIconGap;
  }
  .zmui-msg__text-area {
    margin-bottom: @zmuiMsgTextGap;
    padding:0 20px;
  }
  .zmui-msg__text-area a{
    color:@zmuiLinkColorDefault;
  }
  .zmui-msg__title {
    margin-bottom: @zmuiMsgTitleGap;
    font-weight: 400;
    font-size: 20px;
  }
  .zmui-msg__desc {
    font-size: 14px;
    color: @zmuiTextColorGray;
  }
  .zmui-msg__opr-area {
    margin-bottom: @zmuiMsgOprGap;
  }
  .zmui-msg__extra-area {
    margin-bottom: @zmuiMsgExtraAreaGap;
    font-size: 14px;
    color: @zmuiTextColorGray;
    a{color: @zmuiLinkColorDefault;}
  }

  @media screen and (min-height: @zmuiMsgExtraAreaOfMinHeight) {
    .zmui-msg__extra-area {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
    }
  }

</style>
