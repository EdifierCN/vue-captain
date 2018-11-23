<template>
  <div class="zmui-cells_radio" :class="disabled ? 'zmui-radio-disabled' : ''">
    <label class="zmui-cell zmui-cell_radio zmui-check__label" :for="`radio_${uuid}_${index}`" v-for="(one, index) in options">
      <div class="zmui-cell__bd">
        <slot name="each-item" :icon="one.icon" :label="getValue(one)" :index="index" :selected="currentValue === getKey(one)">
          <p>
            <img class="zmui-radio-icon" :src="one.icon" v-show="one && one.icon">
            <span class="zmui-radio-label" :style="currentValue === getKey(one) ? (selectedLabelStyle || '') : ''">{{ one | getValue }}</span>
          </p>
        </slot>
      </div>
      <div class="zmui-cell__ft">
        <input type="radio" class="zmui-check" v-model="currentValue" :id="disabled ? '' : `radio_${uuid}_${index}`" :value="getKey(one)">
        <span class="zmui-icon-checked"></span>
      </div>
    </label>
    <div class="zmui-cell" v-show="fillMode">
      <div class="zmui-cell__hd"><label for="" class="zmui-label">{{ fillLabel }}</label></div>
      <div class="zmui-cell__bd">
        <input class="zmui-input needsclick" type="text" v-model="fillValue" :placeholder="fillPlaceholder" @blur="isFocus=false" @focus="onFocus()">
      </div>
      <div class="zmui-cell__ft" v-show="value==='' && !isFocus">
        <i class="zmui-icon-warn"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import Base from '../../../libs/base'
  import { getValue, getKey, getLabel } from '../../../libs/object-filter'
  import props from './props'

  export default {
    name: 'radio-list',
    mixins: [Base],
    filters: {
      getValue,
      getKey
    },
    props: props(),
    created () {
      this.handleChangeEvent = true
    },
    methods: {
      getValue,
      getKey,
      onFocus () {
        this.currentValue = this.fillValue || '';
        this.isFocus = true
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (newVal) {
        const isOption = contains(this.options, newVal);
        if (newVal !== '' && isOption) {
          this.fillValue = ''
        }
        this.$emit('on-change', newVal, getLabel(this.options, newVal));
        this.$emit('input', newVal)
      },
      fillValue (newVal) {
        if (this.fillMode && this.isFocus) {
          this.currentValue = newVal
        }
      }
    },
    data () {
      return {
        fillValue: '',
        isFocus: false,
        currentValue: this.value
      }
    }
  }

  function contains (a, obj) {
    let i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true
      }
    }
    return false
  }
</script>

<style lang="less">
  @import "../../../styles/widget/radio/radio-list";
</style>
