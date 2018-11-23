<template>
    <span class="zmui-badge" :class="typesClass" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </span>
</template>

<script type="text/babel">
  import {isColor} from '../../../utils/assist';

  export default {
    name: 'zmui-badge',
    props: {
      type: {
        validator(value) {
          return ['primary', 'success', 'warning', 'danger', 'royal'].indexOf(value) > -1;
        }
      },
      shape: {
        validator(value) {
          return ['circle', 'square'].indexOf(value) > -1;
        }
      },
      background: {
       type: Boolean,
        default: true
      },
      color: {
        validator(value) {
          if(!value) return true;
          return isColor(value);
        }
      },
      bgcolor: {
        validator(value) {
          if(!value) return true;
          return isColor(value);
        }
      }
    },
    computed: {
      typesClass() {
        let classes = '';

        if( !this.background ){
          classes += (this.type ? 'zmui-badge-' + this.type : '') + ' zmui-badge-inverted'
        }else{
          if(this.bgcolor){
            classes += (this.shape == 'square' ? 'zmui-badge-radius' : '')
          }else{
            classes += (this.type ? 'zmui-badge-' + this.type : '') + (this.shape == 'square' ? ' zmui-badge-radius' : '');
          }

          if(typeof this.$slots.default === 'undefined'){
            classes += ' zmui-badge-dot'
          }
        }

        return classes
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/badge/index';
</style>
