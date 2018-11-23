<template>
  <div class="zmui-masker-box">
    <slot></slot>
    <div class="zmui-masker" :class="{'zmui-masker-fullscreen': fullscreen}" :style="style">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import { toRGB } from './converter'

  export default {
    name: 'masker',
    props: {
      color: {
        type: String,
        default: '0, 0, 0'
      },
      opacity: {
        type: Number,
        default: 0.5
      },
      fullscreen: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      style () {
        let color = /,/.test(this.color) ? this.color : toRGB(this.color.replace('#', '')).join(',');
        return {
          backgroundColor: `rgba(${color},${this.opacity})`
        }
      }
    }
  }
</script>

<style>
  .zmui-masker-box {
    position: relative;
  }
  .zmui-masker {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: inherit;
  }
  .zmui-masker-fullscreen {
    position: fixed;
    z-index: 10001;
  }
</style>
