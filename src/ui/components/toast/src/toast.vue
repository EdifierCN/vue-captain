<template>
  <div class="zmui-toast-container">
    <div class="zmui-mask_transparent" v-show="isShowMask && show"></div>
    <transition :name="currentTransition" @after-leave="afterLeave">
      <div class="zmui-toast" :style="{width: width}" :class="toastClass" v-show="show">
        <i class="zmui-icon-success-no-circle zmui-icon_toast" v-show="type !== 'text'"></i>
        <p class="zmui-toast__content" v-if="text" :style="style" v-html="text"></p>
        <p class="zmui-toast__content" v-else :style="style">
          <slot></slot>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
  import SafariFixIssue from '../../../mixins/safari-fix'

  export default {
    name: 'toast',
    mixins: [SafariFixIssue],
    props: {
      value: Boolean,
      time: {
        type: Number,
        default: 2000
      },
      type: {
        type: String,
        default: 'success'
      },
      transition: String,
      width: {
        type: String,
        default: '7.6em'
      },
      isShowMask: {
        type: Boolean,
        default: false
      },
      text: String,
      position: String
    },
    data () {
      return {
        show: false
      }
    },
    created () {
      if (this.value) {
        this.show = true
      }
    },
    computed: {
      currentTransition () {
        if (this.transition) {
          return this.transition
        }
        if (this.position === 'top') {
          return 'zmui-slide-from-top'
        }
        if (this.position === 'bottom') {
          return 'zmui-slide-from-bottom'
        }
        return 'zmui-fade'
      },
      toastClass () {
        return {
          'zmui-toast_forbidden': this.type === 'warn',
          'zmui-toast_cancel': this.type === 'cancel',
          'zmui-toast_success': this.type === 'success',
          'zmui-toast_text': this.type === 'text',
          'zmui-toast-top': this.position === 'top',
          'zmui-toast-bottom': this.position === 'bottom',
          'zmui-toast-middle': this.position === 'middle'
        }
      },
      style () {
        if (this.type === 'text' && this.width === 'auto') {
          return { padding: '10px' }
        }
      }
    },
    methods:{
      afterLeave(){
        this.$emit('after-leave')
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.$emit('input', true);
          this.$emit('on-show');
          this.fixSafariOverflowScrolling('auto');

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.show = false;
            this.$emit('input', false);
            this.$emit('on-hide');
            this.fixSafariOverflowScrolling('touch')
          }, this.time)
        }
      },
      value (val) {
        this.show = val
      }
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/toast/index";
</style>
