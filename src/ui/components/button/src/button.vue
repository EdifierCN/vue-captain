<template>
  <button
    :style="buttonStyle"
    class="zmui-btn"
    :class="classes"
    :disabled="disabled"
    :type="actionType"
    @click="onClick">
    <i class="zmui-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  import { go } from '../../../libs/router'

  export default {
    name: 'button-cell',
    props: {
      type: {
        default: 'default'
      },
      disabled: Boolean,
      mini: Boolean,
      plain: Boolean,
      text: String,
      actionType: String,
      showLoading: Boolean,
      link: [String, Object],
      gradients: {
        type: Array,
        validator: function (val) {
          return val.length === 2
        }
      }
    },
    methods: {
      onClick () {
        !this.disabled && go(this.link, this.$router)
      }
    },
    computed: {
      noBorder () {
        return Array.isArray(this.gradients)
      },
      buttonStyle () {
        if (this.gradients) {
          return {
            background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
            color: '#FFFFFF'
          }
        }
      },
      classes () {
        return [
          {
            'zmui-btn_disabled': !this.plain && this.disabled,
            'zmui-btn_plain-disabled': this.plain && this.disabled,
            'zmui-btn_mini': this.mini,
            'zmui-btn_no-border': this.noBorder
          },
          !this.plain ? `zmui-btn_${this.type}` : '',
          this.plain ? `zmui-btn_plain-${this.type}` : '',
          this.showLoading ? `zmui-btn_loading` : ''
        ]
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/button/index.less';
  @import '../../../styles/widget/loading/index.less';
</style>
