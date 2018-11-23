<template>
  <div class="zmui-checkicon" @click="updateValue">
    <icon type="success" v-show="type === 'default' && value"></icon>
    <icon type="success_circle" v-show="type === 'plain' && value"></icon>
    <icon type="circle" v-show="!value"></icon>
    <span><slot></slot></span>
  </div>
</template>

<script>
  import { Icon } from '../../icon'

  export default {
    name: 'checkicon',
    components: {
      Icon
    },
    methods: {
      updateValue () {
        this.$emit('update:value', !this.value)
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/checkbox/checkicon";
</style>
