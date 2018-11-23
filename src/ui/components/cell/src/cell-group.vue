<template>
  <div>
    <div
      class="zmui-cells__title"
      v-if="title"
      :style="cleanStyle({
      color: titleColor
    })"
      v-html="title"></div>
    <slot name="title"></slot>
    <div
      class="zmui-cells"
      :class="{
      'zmui-no-group-title': !title
    }"
      :style="cleanStyle({
      marginTop: typeof gutter === 'number' ? (gutter + 'px') : gutter
    })">
      <slot name="after-title"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import cleanStyle from '../../../libs/clean-style'

  export default {
    name: 'cell-group',
    methods: {
      cleanStyle
    },
    props: {
      title: String,
      titleColor: String,
      labelWidth: String,
      labelAlign: String,
      labelMarginRight: String,
      gutter: [String, Number]
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/global';
  @import '../../../styles/widget/cell/group';
</style>
