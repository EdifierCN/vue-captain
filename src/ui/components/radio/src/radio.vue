<template>
  <label class="zmui-radio">
    <input type="radio" @change="changeHandler" :disabled="disabled" :checked="checked"/>
    <span class="zmui-radio-icon" :style="[{color: radioColor}, styles(1)]"><i :style="styles(2)"></i></span>
    <span class="zmui-radio-text" v-if="!$slots.default">{{val}}</span>
    <span class="zmui-radio-text" v-else><slot></slot></span>
  </label>
</template>

<script type="text/babel">
  import {isColor} from '../../../utils/assist';

  export default {
    name: 'radio',
    data() {
      return {
        checked: false
      }
    },
    computed:{
      radioColor(){
        let colors = '';
        if(this.$parent.$options.name === 'radio-group'){
          colors = this.$parent.color
        }else{
          colors = this.color
        }
        return colors
      }
    },
    props: {
      val: [String, Number],
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        validator(value) {
          if (!value) return true;
          return isColor(value);
        },
        default: '#09BB07'
      }
    },
    methods: {
      changeHandler (event) {
        if (this.disabled) return;

        this.checked = event.target.checked;
        if(this.$parent.$options.name === 'radio-group'){
          this.$parent.change(this.val);
        }
      },
      styles(size) {
        let styles;

        if(this.$parent.$options.name === 'radio-group'){
            styles = {
              width: this.$parent.size / size + 'px',
              height: this.$parent.size / size + 'px'
            }
        }else{
          styles = {
            width: 20 / size + 'px',
            height: 20 / size + 'px'
          }
        }

        return styles;
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/radio/radio.less';
</style>
