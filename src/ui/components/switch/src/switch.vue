<template>
  <input type="checkbox"
         class="zmui-switch_inline"
         :true-value="trueValue"
         :false-value="falseValue"
         :disabled="disabled"
         v-model="checked"
         :style="{color: color}"
  />
</template>

<script type="text/babel">
  import {isColor} from '../../../utils/assist';

  /**
   * 不兼容鸟包火狐
   */
  export default {
    name: 'switch-inline',
    data() {
      return {
        checked: this.value
      }
    },
    props: {
      value: [String, Number, Boolean],
      disabled: {
        type: Boolean,
        default: false
      },
      color: {
        validator(value) {
          if(!value) return true;
          return isColor(value);
        },
        default: '#09BB07'
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      }
    },
    watch: {
      checked(val) {
        this.$emit('input', val);
      },
      value(val) {
        this.checked = val;
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/switch/index.less';
</style>
