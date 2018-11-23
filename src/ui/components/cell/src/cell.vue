<template>
  <div class="zmui-cell"
       :class="{
          'zmui-cell-tap-active': isLink || !!link,
          'zmui-cell_access': isLink || !!link,
          'zmui-cell-no-border-intent': !borderIntent,
          'zmui-cell-disabled': disabled
       }"
       :style="style"
       @click="onClick">

    <div class="zmui-cell__hd">
      <slot name="icon"></slot>
    </div>

    <div class="zmui-cell__bd"
         :class="{
            'zmui-cell-primary': primary === 'title' && valueAlign !== 'left'
         }">
      <p>
        <label class="zmui-cell-label"
               :style="labelStyles"
               :class="labelClass"
               v-if="title || hasTitleSlot">
          <slot name="title">{{ title }}</slot>
        </label>
        <slot name="after-title"></slot>
      </p>
      <span class="zmui-cell-label-desc">{{ inlineDesc }}</span>
    </div>

    <div class="zmui-cell__ft"
         :class="valueClass">
      <slot name="value"></slot>
      <slot>{{ value }}</slot>
      <i class="zmui-loading" v-if="isLoading"></i>
    </div>

    <slot name="child"></slot>

  </div>
</template>

<script>
  import props from './props'
  import { go } from '../../../libs/router'
  import cleanStyle from '../../../libs/clean-style'
  import getParentProp from '../../../libs/get-parent-prop'
  export default{
    name: 'cell',
    props: props(),
    data(){
      return {
        hasTitleSlot: true,
        hasMounted: false
      }
    },
    beforeMount(){
      this.hasTitleSlot = !!this.$slots.title;
    },
    computed:{
      labelStyles(){
        return cleanStyle({
          width: getParentProp(this, 'labelWidth'),
          textAlign: getParentProp(this, 'labelAlign'),
          marginRight: getParentProp(this, 'labelMarginRight')
        })
      },
      valueClass(){
        return {
          'zmui-cell-primary': this.primary === 'content' || this.valueAlign === 'left',
          'zmui-cell-align-left': this.valueAlign === 'left',
          'zmui-cell-arrow-transition': !!this.arrowDirection,
          'zmui-cell-arrow-up': this.arrowDirection === 'up',
          'zmui-cell-arrow-down': this.arrowDirection === 'down'
        }
      },
      labelClass(){
        return {
          'zmui-cell-justify': getParentProp(this, 'justify') === 'justify'
        }
      },
      style(){
        if(this.alignItems){
          return {
            alignItems: this.alignItems
          }
        }
      }
    },
    methods: {
      onClick(){
        !this.disabled && go(this.link, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/default';
  @import '../../../styles/widget/cell/access';
  @import '../../../styles/widget/loading/index';
</style>
