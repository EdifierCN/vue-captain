<template>
  <transition :name="`zmui-popup-animate-${position}`" @afterLeave="afterLeave">
    <div v-show="show && !initialShow" :style="styles" class="zmui-popup-dialog" :class="[`zmui-popup-${position}`, show ? 'zmui-popup-show' : '']">
      <div class="zmui-popup-dialog-inner">
        <div class="zmui-popup-dialog-header" v-if="hasHeaderSlot">
          <slot name="header"></slot>
        </div>
        <div class="zmui-popup-dialog-body">
          <slot></slot>
        </div>
        <div class="zmui-popup-dialog-footer" v-if="hasFooterSlot">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from './popup.js'
  import dom from '../../../libs/dom'

  export default {
    name: 'popup',
    props: {
      value: Boolean,
      height: {
        type: String,
        default: 'auto'
      },
      width: {
        type: String,
        default: 'auto'
      },
      showMask: {
        type: Boolean,
        default: true
      },
      isTransparent: Boolean,
      hideOnBlur: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: 'bottom'
      },
      maxHeight: String,
      popupStyle: Object,
      hideOnDeactivated: {
        type: Boolean,
        default: true
      }
    },
    created () {
      this.hasHeaderSlot = !!this.$slots.header;
      this.hasFooterSlot = !!this.$slots.footer;
      // get global layout config
//      if (this.$zmui && this.$zmui.config && this.$zmui.config.$layout === 'VIEW_BOX') {
//        this.layout = 'VIEW_BOX'
//      }
    },
    mounted () {
      this.$overflowScrollingList = document.querySelectorAll('.zmui-fix-safari-overflow-scrolling');
      this.$nextTick(() => {
        const _this = this;
        this.popup = new Popup({
          showMask: _this.showMask,
          container: _this.$el,
          hideOnBlur: _this.hideOnBlur,
          onOpen () {
            _this.fixSafariOverflowScrolling('auto');
            _this.show = true
          },
          onClose () {
            _this.show = false;
            if (window.__$zmuiPopups && Object.keys(window.__$zmuiPopups).length > 1) return;
            if (document.querySelector('.zmui-popup-dialog.zmui-popup-mask-disabled')) return;
            setTimeout(() => {
              _this.fixSafariOverflowScrolling('touch')
            }, 300)
          }
        });
        if (this.value) {
          this.popup.show()
        }
        this.initialShow = false
      })
    },
    deactivated () {
      if (this.hideOnDeactivated) {
        this.show = false
      }
      this.removeModalClassName()
    },
    methods: {
      fixSafariOverflowScrolling (type) {
        if (!this.$overflowScrollingList.length) return;
        // if (!/iphone/i.test(navigator.userAgent)) return
        for (let i = 0; i < this.$overflowScrollingList.length; i++) {
          this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
        }
      },
      removeModalClassName () {
//        this.layout === 'VIEW_BOX' && dom.removeClass(document.body, 'zmui-modal-open')
      },
      afterLeave(){
        console.log('after-leave')
      }
    },
    data () {
      return {
        layout: '',
        initialShow: true,
        hasFirstShow: false,
        show: this.value,
        hasHeaderSlot: false,
        hasFooterSlot: false
      }
    },
    computed: {
      styles () {
        const styles = {};
        if (!this.position || this.position === 'bottom' || this.position === 'top') {
          styles.height = this.height
        } else {
          styles.width = this.width
        }

        if (this.maxHeight) {
          styles['max-height'] = this.maxHeight
        }

        this.isTransparent && (styles['background'] = 'transparent');
        if (this.popupStyle) {
          for (let i in this.popupStyle) {
            styles[i] = this.popupStyle[i]
          }
        }
        return styles
      }
    },
    watch: {
      value (val) {
        this.show = val
      },
      show (val) {
        this.$emit('input', val);
        if (val) {
          this.popup && this.popup.show();
          this.$emit('on-show');
          this.fixSafariOverflowScrolling('auto');
//          this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'zmui-modal-open');
          if (!this.hasFirstShow) {
            this.$emit('on-first-show');
            this.hasFirstShow = true
          }
        } else {
          this.$emit('on-hide');
          this.show = false;
          this.popup.hide(false);
          setTimeout(() => {
            if (!document.querySelector('.zmui-popup-dialog.zmui-popup-show')) {
              this.fixSafariOverflowScrolling('touch')
            }
            this.removeModalClassName()
          }, 200)
        }
      }
    },
    beforeDestroy () {
      this.popup && this.popup.destroy();
      this.fixSafariOverflowScrolling('touch');
      this.removeModalClassName()
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/popup/index";

  .zmui-popup-dialog-inner{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .zmui-popup-dialog-header{

  }
  .zmui-popup-dialog-body{
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .zmui-cells:first-child{
      margin-top: 5px;
    }
  }
  .zmui-popup-dialog-footer{

  }
</style>
