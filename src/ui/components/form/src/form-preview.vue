<template>
  <div class="zmui-form-preview">
    <div class="zmui-form-preview__hd">
      <label class="zmui-form-preview__label" v-html="headerLabel"></label>
      <em class="zmui-form-preview__value" v-html="headerValue || '&nbsp;'"></em>
    </div>
    <div class="zmui-form-preview__bd">
      <div class="zmui-form-preview__item" v-for="item in bodyItems">
        <label class="zmui-form-preview__label">{{ item.label }}</label>
        <span class="zmui-form-preview__value">{{ item.value }}</span>
      </div>
    </div>
    <div class="zmui-form-preview__ft">
      <a class="zmui-form-preview__btn" :class="{'zmui-form-preview__btn_default': button.style==='default', 'zmui-form-preview__btn_primary': button.style === 'primary'}" href="javascript:" v-for="button in footerButtons" @click="onButtonClick(button.onButtonClick, button.link)">{{ button.text }}</a>
    </div>
  </div>
</template>

<script>
  import { go } from '../../../libs/router'

  export default {
    name: 'form-preview',
    props: ['headerLabel', 'headerValue', 'bodyItems', 'footerButtons', 'name'],
    methods: {
      onButtonClick (cb, link) {
        cb && cb(this.name);
        if (link) {
          go(link, this.$router)
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/form/preview.less';
  .zmui-form-preview {
    overflow: hidden;
  }
</style>
