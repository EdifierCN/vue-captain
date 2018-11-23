<template>
  <div
    class="zmui-dialog-container">
    <transition :name="maskTransition">
      <div class="zmui-mask" @click="hide" v-show="show" :style="maskStyle"></div>
    </transition>
    <transition :name="dialogTransition" @after-leave="afterLeave" >
      <div :class="dialogClass" v-show="show" :style="dialogStyle">
        <slot>
          <div v-html="content"></div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import preventBodyScrollMixin from '../../../mixins/prevent-body-scroll'

  export default {
    mixins: [preventBodyScrollMixin],
    name: 'x-dialog',
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      maskTransition: {
        type: String,
        default: 'zmui-mask'
      },
      maskZIndex: [String, Number],
      dialogTransition: {
        type: String,
        default: 'zmui-dialog'
      },
      dialogClass: {
        type: String,
        default: 'zmui-dialog'
      },
      hideOnBlur: Boolean,
      dialogStyle: Object,
      scroll: {
        type: Boolean,
        default: true
      },
      content: String
    },
    computed: {
      maskStyle () {
        if (typeof this.maskZIndex !== 'undefined') {
          return {
            zIndex: this.maskZIndex
          }
        }
      }
    },
    watch: {
      show (val) {
        this.$emit('update:show', val);
        this.$emit(val ? 'on-show' : 'on-hide');
        if (val) {
          this.addModalClassName()
        } else {
          this.removeModalClassName()
        }
      }
    },
    methods: {
      afterLeave(){
        this.$emit('after-leave')
      },
      shouldPreventScroll () {
        // hard to get focus on iOS device with fixed position, so just ignore it
        const iOS = /iPad|iPhone|iPod/i.test(window.navigator.userAgent);
        const hasInput = this.$el.querySelector('input') || this.$el.querySelector('textarea');
        if (iOS && hasInput) {
          return true
        }
      },
      hide () {
        if (this.hideOnBlur) {
          this.$emit('update:show', false);
          this.$emit('change', false);
          this.$emit('on-click-mask')
        }
      }
    },
    data () {
      return {
        layout: ''
      }
    }
  }
</script>

<style lang="less">

  @import '../../../styles/utils/mask';
  @import '../../../styles/widget/dialog/index';

  //  transition
  .zmui-dialog-enter-active, .zmui-dialog-leave-active {
    opacity: 1;
    transition-duration: 400ms;
    transform: translate(-50%, -50%) scale(1)!important;
    transition-property: transform, opacity!important;
  }
  .zmui-dialog-leave-active {
    transition-duration: 300ms;
  }
  .zmui-dialog-enter {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.185)!important;
  }
  .zmui-dialog-leave-active {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85)!important;
  }

  .zmui-mask-enter, .zmui-mask-leave-active {
    opacity: 0;
  }
  .zmui-mask-leave-active, .zmui-mask-enter-active {
    transition: opacity 300ms;
  }

  // body
  .zmui-modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
  }
  .zmui-modal-open-for-container {
    overflow: hidden!important;
  }

  // position
  .zmui-dialog-container-absolute .zmui-dialog {
    position: absolute
  }

</style>
