<template>
  <div class="zmui-cell zmui-cell-form-preview" :class="{'zmui-cell-no-border-intent': !borderIntent}">
    <div class="zmui-form-preview__bd">
      <div class="zmui-form-preview__item" v-for="item in list">
        <label class="zmui-form-preview__label" v-html="item.label"></label>
        <span class="zmui-form-preview__value" v-html="item.value"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell-form-preview',
    props: {
      list: Array,
      borderIntent: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/global';
  @import '../../../styles/widget/cell/form-preview.less';
</style>

