<template>
  <div class="zmui-confirm">
    <x-dialog
      v-model="showValue"
      :dialog-class="theme === 'android' ? 'zmui-dialog zmui-skin_android' : 'zmui-dialog'"
      :mask-transition="maskTransition"
      :dialog-transition="theme === 'android' ? 'zmui-fade' : dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      @after-leave="afterLeave"
      @on-hide="$emit('on-hide')">
      <div class="zmui-dialog__hd" v-if="!!title" :class="{'with-no-content': !showContent}">
        <strong class="zmui-dialog__title">{{ title }}</strong>
      </div>
      <template v-if="showContent">
        <div class="zmui-dialog__bd" v-if="!showInput">
          <slot><div v-html="content"></div></slot>
        </div>
        <div @touchstart.prevent="setInputFocus" class="zmui-prompt"  v-else>
          <input class="zmui-prompt-msgbox" v-bind="inputAttrs" v-model="msg" :placeholder="placeholder" ref="input">
        </div>
      </template>
      <div class="zmui-dialog__ft">
        <a href="javascript:;" class="zmui-dialog__btn zmui-dialog__btn_default" @click="_onCancel">{{cancelText || '取消'}}</a>
        <a href="javascript:;" class="zmui-dialog__btn" :class="`zmui-dialog__btn_${confirmType}`" @click="_onConfirm">{{confirmText || '确定'}}</a>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import { default as XDialog } from './dialog.vue'

  export default {
    name: 'confirm',
    components: {
      XDialog
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      showInput: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      theme: {
        type: String,
        default: 'ios'
      },
      hideOnBlur: {
        type: Boolean,
        default: false
      },
      title: String,
      confirmText: String,
      cancelText: String,
      maskTransition: {
        type: String,
        default: 'zmui-fade'
      },
      maskZIndex: [Number, String],
      dialogTransition: {
        type: String,
        default: 'zmui-dialog'
      },
      content: String,
      closeOnConfirm: {
        type: Boolean,
        default: true
      },
      inputAttrs: {   // 使用v-bind 绑定必须,不能直接 inputAttrs: Boolean，报错
        type: Object,
        default(){
          return {}
        }
      },
      showContent: {
        type: Boolean,
        default: true
      },
      confirmType: {
        type: String,
        default: 'primary'
      }
    },
    created () {
      this.showValue = this.show;
      if (this.value) {
        this.showValue = this.value
      }
    },
    watch: {
      value (val) {
        this.showValue = val
      },
      showValue (val) {
        this.$emit('input', val);
        if (val) {
          if (this.showInput) {
            this.msg = '';
            setTimeout(() => {
              if (this.$refs.input) {
                this.setInputFocus()
              }
            }, 300)
          }
          this.$emit('on-show') // emit just after msg is cleared
        }
      }
    },
    data () {
      return {
        msg: '',
        showValue: false
      }
    },
    methods: {
      afterLeave(){
        this.$emit('after-leave')
      },
      setInputValue (val) {
        this.msg = val
      },
      setInputFocus () {
        this.$refs.input.focus()
      },
      _onConfirm () {
        if (!this.showValue) {
          return
        }
        if (this.closeOnConfirm) {
          this.showValue = false
        }
        this.$emit('on-confirm', this.msg)
      },
      _onCancel () {
        if (!this.showValue) {
          return
        }
        this.showValue = false;
        this.$emit('on-cancel')
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/utils/transition.less';
  @import '../../../styles/utils/mask.less';

  .zmui-prompt {
    padding-bottom: 1.6em;
  }

  .zmui-prompt-msgbox {
    width: 80%;
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 4px 5px;
    appearance: none;
    outline: none;
    font-size: 16px;
  }
</style>
