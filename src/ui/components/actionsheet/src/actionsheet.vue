<template>

  <div class="zmui-actionsheet-container">

    <transition name="zmui-actionsheet-mask">
      <div class="zmui-mask zmui-mask_transparent"
           @click="onClickingMask"
           v-show="show">
      </div>
    </transition>

    <transition :name="`zmui-${theme}-actionsheet`" @after-leave="afterLeave" >

      <!-- android theme -->
      <div v-if="theme === 'android'"
           v-show="show"
           :class="`zmui-actionsheet zmui-actionsheet-skin_${theme}`"
           :key="theme">
        <div class="zmui-actionsheet__menu">
          <div class="zmui-actionsheet__cell"
               v-for="(text, key) in menus"
               @click="onMenuClick(text, key)"
               v-html="(text.label || text)">
          </div>
        </div>
      </div>

      <!-- ios theme (default) -->
      <div v-else
           v-show="show"
           :class="['zmui-actionsheet', `zmui-actionsheet-skin_${theme}`, {'zmui-actionsheet_transparent': transparent}]"
           :key="theme">

        <div class="zmui-actionsheet__menu">
          <div class="zmui-actionsheet__cell" v-if="hasHeaderSlot || title">
            <slot name="header">{{ title }}</slot>
          </div>

          <div class="zmui-actionsheet__cell"
               v-for="(text, key) in menus"
               @click="onMenuClick(text, key)"
               :class="`zmui-actionsheet-menu-${text.type || 'default'}`"
               v-html="(text.label || text)">
          </div>
        </div>

        <div class="zmui-actionsheet__action"
             @click="emitEvent('on-click-menu', 'cancel')"
             v-if="showCancel">
          <div class="zmui-actionsheet__cell">
            {{cancelText || '取消'}}
          </div>
        </div>
      </div>

    </transition>

  </div>

</template>

<script>
    export default{
      name: 'actionsheet',
      props:{
        title: String,
        value: Boolean,
        showCancel: {
          type: Boolean,
          default: true
        },
        cancelText: String,
        theme:{
          type: String,
          default: 'ios'
        },
        transparent: {
          type: Boolean,
          default: true
        },
        menus:{
          type: [Object, Array],
          default: () => ({})
        },
        closeOnClickingMask:{
          type: Boolean,
          default: true
        },
        closeOnClickingMenu:{
          type: Boolean,
          default: true
        }
      },
      data(){
          return {
            keepAlive: true,
            hasHeaderSlot: false,
            show: false
          }
      },
      mounted(){
        this.hasHeaderSlot = !!this.$slots.header;
        this.$nextTick(() => {
          this.$tabbar = document.querySelector('.zmui-tabbar')
        })
      },
      methods: {
        afterLeave(){

        },
        onMenuClick (text, key) {
          if (typeof text === 'string') {
            this.emitEvent('on-click-menu', key, text)
          } else {
            if (text.type !== 'disabled' && text.type !== 'info') {
              if (text.label || text.label === 0) {
                this.emitEvent('on-click-menu', text.label, text)
              } else {
                this.emitEvent('on-click-menu', '', text);
                this.show = false
              }
            }
          }
        },
        onClickingMask () {
          this.$emit('on-click-mask');
          this.closeOnClickingMask && (this.show = false)
        },
        emitEvent (event, menu, item) {
          if (event === 'on-click-menu' && !/.noop/.test(menu)) {
            let _item = item;
            if (typeof _item === 'object') {
              _item = JSON.parse(JSON.stringify(_item))
            }

            this.$emit(event, menu, _item);
            this.$emit(`${event}-${menu}`);
            this.closeOnClickingMenu && (this.show = false);
          }
        },
        fixIos (zIndex) {
          if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
            return
          }
          if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
            this.$tabbar.style.zIndex = zIndex
          }
        }
      },
      watch: {
        show (val) {
          this.$emit('input', val);
          if (val) {
            this.fixIos(-1)
          } else {
            setTimeout(() => {
              this.fixIos(100)
            }, 200)
          }
        },
        value: {
          handler: function (val) {
            this.show = val
          },
          immediate: true
        }
      },
      beforeDestroy () {
        this.fixIos(100)
      }
    }
</script>

<style lang="less">
  @import '../../../styles/utils/mask.less';
  @import '../../../styles/widget/actionsheet/index.less';
</style>
