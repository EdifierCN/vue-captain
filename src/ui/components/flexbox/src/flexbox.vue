<template>
  <div class="zmui-flexbox"
       :class="{'zmui-flex-col': orient === 'vertical',
        'zmui-flex-row': orient === 'horizontal'}"
       :style="styles">

    <slot></slot>
  </div>
</template>

<script>
    export default{
        name: 'flexbox',
        props: {
          gutter: {
              type: Number,
              default: 8
          },
          orient: {
              type: String,
              default: 'horizontal'
          },
          justify: String,
          align: String,
          wrap: String,
          direction: String
        },
        computed: {
          styles () {
            return {
              'justify-content': this.justify,
              '-webkit-justify-content': this.justify,
              'align-items': this.align,
              '-webkit-align-items': this.align,
              'flex-wrap': this.wrap,
              '-webkit-flex-wrap': this.wrap,
              'flex-direction': this.direction,
              '-webkit-flex-direction': this.direction
            }
          }
        }
    }
</script>

<style lang="less">
  @import '../../../styles/widget/flexbox/index.less';
</style>
