<template>
  <div
    class="zmui-cell-box zmui-cell"
    :class="className"
    :style="style"
    @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  import { go } from '../../../libs/router'

  export default {
    name: 'cell-box',
    props: {
      isLink: Boolean,
      link: [String, Object],
      borderIntent: {
        type: Boolean,
        default: true
      },
      noFlex: Boolean,
      alignItems: String
    },
    computed: {
      style () {
        if (this.alignItems) {
          return {
            'align-items': this.alignItems
          }
        }
      },
      className () {
        return {
          'zmui-cell-tap-active': this.isLink || !!this.link,
          'zmui-cell_access': this.isLink || !!this.link,
          'zmui-cell-no-border-intent': !this.borderIntent
        }
      }
    },
    methods: {
      onClick () {
        this.link && go(this.link, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/global';
  @import '../../../styles/widget/cell/box';
</style>
