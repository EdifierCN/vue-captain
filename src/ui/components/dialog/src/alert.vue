<template>
  <div class="zmui-alert">
    <x-dialog
    v-model="showValue"
    :mask-transition="maskTransition"
    :dialog-transition="dialogTransition"
    :hide-on-blur="hideOnBlur"
    :mask-z-index="maskZIndex"
    @after-leave="afterLeave"
    @on-hide="$emit('on-hide')"
    @on-show="$emit('on-show')">
      <div class="zmui-dialog__hd">
        <strong class="zmui-dialog__title">{{title}}</strong>
      </div>
      <div class="zmui-dialog__bd">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
      <div class="zmui-dialog__ft">
        <a href="javascript:;"
        class="zmui-dialog__btn zmui-dialog__btn_primary"
        @click="handleConfirm">{{buttonText || '确定'}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { default as XDialog } from './dialog.vue'

export default {
  name: 'alert',
  components: {
    XDialog
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  props: {
    value: Boolean,
    title: String,
    content: String,
    buttonText: String,
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'zmui-mask'
    },
    dialogTransition: {
      type: String,
      default: 'zmui-dialog'
    },
    maskZIndex: [Number, String]
  },
  data () {
    return {
      showValue: false
    }
  },
  methods: {
    afterLeave(){
      this.$emit('after-leave');
    },
    handleConfirm () {
      this.showValue = false;
    },
  },
  watch: {
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">

</style>
