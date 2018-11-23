<template>
  <div class="zmui-switch-cell zmui-cell zmui-cell_switch">
    <div class="zmui-cell__bd">
      <label class="zmui-label" :style="labelStyle" :class="labelClass" v-html="title"></label>
      <span class="zmui-cell-label-desc" v-if="inlineDesc">{{ inlineDesc }}</span>
    </div>
    <div class="zmui-cell__ft">
      <input class="zmui-switch" type="checkbox" :disabled="disabled" v-model="currentValue" />
      <div v-if="preventDefault" class="zmui-switch-overlay" @click="onClick"></div>
    </div>
  </div>
</template>

<script>
  import cleanStyle from '../../../libs/clean-style'

  export default {
    name: 'switch-cell',
    computed: {
      labelStyle () {
        let isHTML = /<\/?[^>]*>/.test(this.title);
        let width = Math.min(isHTML ? 5 : (this.title.length + 1), 14) + 'em';
        return cleanStyle({
          display: 'block',
          width: this.$parent.labelWidth || width,
          textAlign: this.$parent.labelAlign
        })
      },
      labelClass () {
        return {
          'zmui-cell-justify': this.$parent && this.$parent.labelAlign === 'justify'
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('on-click', !this.currentValue, this.currentValue)
      },
      toBoolean (val) {
        if (!this.valueMap) {
          return val
        } else {
          const index = this.valueMap.indexOf(val);
          return index === 1
        }
      },
      toRaw (val) {
        if (!this.valueMap) {
          return val
        } else {
          return this.valueMap[val ? 1 : 0]
        }
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      disabled: Boolean,
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      inlineDesc: [String, Boolean, Number],
      preventDefault: Boolean,
      valueMap: {
        type: Array,
        default: () => ([false, true])
      }
    },
    data () {
      return {
        currentValue: this.toBoolean(this.value)
      }
    },
    watch: {
      currentValue (val) {
        const rawValue = this.toRaw(val);
        this.$emit('input', rawValue);
        this.$emit('on-change', rawValue)
      },
      value (val) {
        this.currentValue = this.toBoolean(val)
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/form/common';
  @import '../../../styles/widget/cell/switch';

  .zmui-cell_switch .zmui-cell__ft {
    font-size: 0;
    position: relative;
  }

  input.zmui-switch[disabled] {
    opacity: @switch-disabled-opacity;
  }

  .zmui-switch-cell.zmui-cell_switch {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .zmui-switch-overlay {
    width: 60px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>

